import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { FeaturesModule } from './modules/features/features.module';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './modules/bot/bot.module';
import { AuthModule } from './modules/auth/auth.module';
import { envValidationShema } from './config/core.config';
import { StatsModule } from './modules/stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envValidationShema,
    }),
    DatabaseModule,
    FeaturesModule,
    BotModule,
    AuthModule,
    StatsModule,
  ],
})
export class AppModule {}
