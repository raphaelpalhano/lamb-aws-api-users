import { InternalServerError } from './internal-server.error';

export const errorHandler = (error: any) => {
  if (
    error.type === 'Bad_Request_Error' ||
    error.type === 'Unathorized' ||
    error.type === 'Forbidden'
  ) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        description: error.description,
        notifications: error.error,
        type: error.type,
      }),
    };
  }

  const internalError = new InternalServerError({
    statusCode: 500,
    typeError: 'Internal_Server_Error',
    error: JSON.stringify(error),
  });

  return {
    statusCode: internalError.statusCode,
    body: JSON.stringify({
      statusCode: internalError.statusCode,
      type: internalError.typeError,
      error: internalError.error,
    }),
  };
};
