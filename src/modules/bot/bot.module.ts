import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { BotService } from './bot.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_API_KEY!,
      middlewares: [session()],
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
