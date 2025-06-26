import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import * as Joi from 'joi';

export const DATA_FOLDER_PATH = path.resolve(__dirname, '../../data');

export const isDevMode = (configService: ConfigService) =>
  configService.getOrThrow('NODE_ENV') === 'development';

const durationPattern = /^\d+(\s?[a-zA-Z]+)?$/;
export const envValidationShema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  BOT_API_KEY: Joi.string().required(),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['file', 'postgres', 'mysql'] })
    .required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_TOKEN_TTL: Joi.string()
    .pattern(durationPattern)
    .required()
    .messages({
      'string.pattern.base':
        'JWT_ACCESS_TOKEN_TTL must match StringValue type format (e.g. 15m, 1 hour, 7 Days, 300)',
    }),
  JWT_REFRESH_TOKEN_TTL: Joi.string()
    .pattern(durationPattern)
    .required()
    .messages({
      'string.pattern.base':
        'JWT_REFRESH_TOKEN_TTL must match StringValue type format (e.g. 7d, 1 week, 300)',
    }),
  COOKIE_DOMAIN: Joi.string().hostname().required(),
});
