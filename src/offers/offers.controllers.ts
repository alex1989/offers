import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { Offer } from './entities';
import { OffersService } from './offers.service';
import { OfferValidatorPipe } from './pipes/offer.pipe';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new OfferValidatorPipe())
  async createOffers(@Body() offers: Offer[]) {
    console.log('offers', offers);
    await this.offersService.bulkInsert(offers);
  }
}
