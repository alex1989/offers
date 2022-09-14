import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly repository: Repository<Offer>,
  ) {}

  async bulkInsert(offers: Offer[]) {
    return await this.repository.save(offers);
  }
}
