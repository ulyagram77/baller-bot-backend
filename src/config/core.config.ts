import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';

export const isDevMode = (configService: ConfigService) =>
  configService.getOrThrow('NODE_ENV') === 'development';

export const DATA_FOLDER_PATH = path.resolve(__dirname, '../../data');
