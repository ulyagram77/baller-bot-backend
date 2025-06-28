import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse as ApiBadRequestResponseNest,
  ApiNotFoundResponse as ApiNotFoundResponseNest,
  ApiConflictResponse as ApiConflictResponseNest,
  ApiUnauthorizedResponse as ApiUnauthorizedResponseNest,
} from '@nestjs/swagger';

export const ApiBadRequestResponse = (description = 'Validation failed') => {
  return applyDecorators(
    ApiBadRequestResponseNest({
      description,
      schema: {
        example: {
          statusCode: 400,
          message: description,
          error: 'Bad Request',
        },
      },
    }),
  );
};

export const ApiNotFoundResponse = (description = 'Resource not found') => {
  return applyDecorators(
    ApiNotFoundResponseNest({
      description,
      schema: {
        example: {
          statusCode: 404,
          message: description,
          error: 'Not Found',
        },
      },
    }),
  );
};

export const ApiConflictResponse = (
  description = 'Resource already exists',
) => {
  return applyDecorators(
    ApiConflictResponseNest({
      description,
      schema: {
        example: {
          statusCode: 409,
          message: description,
          error: 'Conflict',
        },
      },
    }),
  );
};

export const ApiUnauthorizedResponse = (description = 'Unauthorized') => {
  return applyDecorators(
    ApiUnauthorizedResponseNest({
      description,
      schema: {
        example: {
          statusCode: 401,
          message: description,
          error: 'Unauthorized',
        },
      },
    }),
  );
};
