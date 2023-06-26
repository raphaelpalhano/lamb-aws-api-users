import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import {
  BAD_REQUEST,
  FORBIDDEN,
  SECRET,
  UNAUTHORIZED,
} from '../../core/domain/constants';
import { HttpStatus } from '../../core/domain/enums';
import { ROLES_PERMISSIONS } from '../../core/domain/constants/roles-permission';
import { verify } from 'jsonwebtoken';
import { UserJWT } from '../../core/domain/interfaces';
import { errorHandler } from '../../common/errors/error-handler.error';
import { UsersValidator } from './validators';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dtos';
import { sqs } from '../../core/config';
import { BadRequestError } from '../../common/errors/bad-request.error';
import { UnauthorizedError } from '../../common/errors/unauthorized-request.error';
import { ForbiddenError } from '../../common/errors/forbbiden-request';

export const usersHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  try {
    let payloadToken: UserJWT;
    let permission: boolean;

    const { body, headers, path } = event;

    if (!body) {
      throw new BadRequestError({
        error: BAD_REQUEST.error,
        typeError: 'Bad_Request_Error',
      });
    }

    if (!headers.Authorization) {
      throw new UnauthorizedError({
        error: UNAUTHORIZED.error,
        typeError: 'Unathorized',
      });
    }

    const token = headers.Authorization.split(' ')[1];

    try {
      const decodedToken: any = verify(token, SECRET);
      payloadToken = {
        email: decodedToken.email,
        sub: decodedToken.sub,
        role: decodedToken.role,
      };
    } catch (error) {
      throw new UnauthorizedError({
        error: UNAUTHORIZED.error,
        typeError: 'Unathorized',
      });
    }

    if (payloadToken.role === 'user') {
      permission = ROLES_PERMISSIONS.user.includes(path);

      if (!permission) {
        throw new ForbiddenError({
          error: FORBIDDEN.error,
          typeError: 'Forbidden',
        });
      }
    }

    const user = plainToInstance(CreateUserDto, JSON.parse(body));
    const usersValidator = new UsersValidator(user);

    await usersValidator.validPayload();

    sqs.sendMessage({
      MessageBody: JSON.stringify({
        ip: headers['X-Forwarded-For'],
        payload: user,
        userId: user.id,
      }),
      QueueUrl: process.env.AWS_SQS_URL_READY_CREATED_USER || '',
    });

    return {
      statusCode: HttpStatus.CREATED,
      body: '',
    };
  } catch (error) {
    return errorHandler(error);
  }
};
