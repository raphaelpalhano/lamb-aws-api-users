import { ValidationError, validate } from 'class-validator';
import { BAD_REQUEST } from '../../../core/domain/constants';
import { userAge } from '../../../core/helper/user-age.helper';
import { CreateUserDto } from '../dtos';
import { BadRequestError } from '../../../common/errors';

export class UsersValidator {
  private readonly user: CreateUserDto;
  private validationErrors: string[] = [];

  constructor(usersDto: CreateUserDto) {
    if (userAge(usersDto.birthDate) < 18) {
      throw new BadRequestError({
        error: BAD_REQUEST.error,
        typeError: 'Bad_Request_Error',
      });
    }
    this.user = usersDto;
  }

  public async validPayload() {
    const errors = await this.validatePayload();
    this.validationErrors = this.parseConstraintsFromErrors(errors);

    if (this.validationErrors.length === 0) {
      this.validateUser();
    }

    if (this.validationErrors.length > 0) {
      throw new BadRequestError({
        error: BAD_REQUEST.error,
        typeError: 'Bad_Request_Error',
      });
    }
  }

  private async validatePayload() {
    return validate(this.user, {
      validationError: { target: false, value: false },
    });
  }

  private validateUser() {
    if (this.user.id.length < 36) {
      this.validationErrors.push('id: deve ser conter 36 caracteres');
    }
  }

  private parseConstraintsFromErrors(errors: ValidationError[]) {
    return errors.flatMap(
      (error) =>
        error.children?.flatMap(
          (childError) =>
            childError.children?.flatMap((object) =>
              Object.values(object?.constraints || []),
            ) || [],
        ) || [],
    );
  }
}
