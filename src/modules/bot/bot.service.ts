import { Injectable } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class BotService {
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Hi!!!!!!!!!');
  }
}
