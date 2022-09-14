import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [CoreModule, OffersModule],
})
export class AppModule {}
