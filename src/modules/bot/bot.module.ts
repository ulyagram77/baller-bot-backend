import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { botConfig } from 'src/config/bot.config';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: botConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
