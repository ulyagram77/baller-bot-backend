import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { FeaturesModule } from './modules/features/features.module';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './modules/bot/bot.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FeaturesModule,
    BotModule,
    AuthModule,
  ],
})
export class AppModule {}
