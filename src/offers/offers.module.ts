import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities';
import { OffersController } from './offers.controllers';
import { OffersService } from './offers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  providers: [OffersService],
  controllers: [OffersController],
})
export class OffersModule {}
