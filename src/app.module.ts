import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { FeaturesModule } from './modules/features/features.module';

@Module({ imports: [DatabaseModule, FeaturesModule] })
export class AppModule {}
