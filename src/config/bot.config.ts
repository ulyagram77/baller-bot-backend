import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';
import { session } from 'telegraf';

export function botConfig(configService: ConfigService): TelegrafModuleOptions {
  return {
    token: configService.get<string>('BOT_API_KEY', ''),
    middlewares: [session()],
  };
}
