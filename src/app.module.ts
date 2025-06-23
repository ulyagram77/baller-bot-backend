import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { FeaturesModule } from './modules/features/features.module';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './modules/bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FeaturesModule,
    BotModule,
  ],
})
export class AppModule {}
