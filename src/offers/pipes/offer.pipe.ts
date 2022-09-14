import { BadRequestException, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';
import { Offer } from '../entities';
import {
  FirstOffer,
  extractDataFromFirstOffer,
  extractDataFromSecondOffer,
  FirstOfferSchema,
  SecondOfferSchema,
} from '../schemas';

export class OfferValidatorPipe
  implements PipeTransform<Record<string, unknown>>
{
  private validate(
    schema: Joi.ObjectSchema,
    value: Record<string, unknown>,
  ): Record<string, unknown> {
    const result = schema.validate(value, { allowUnknown: true });
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }

  public transform(value: Record<string, unknown>): Offer[] {
    const props = new Set(Object.keys(value));
    switch (true) {
      case props.has('query') && props.has('response') && props.size === 2:
        return extractDataFromFirstOffer(
          this.validate(FirstOfferSchema, value) as FirstOffer,
        );
      case props.has('data') && props.has('status') && props.size == 2:
        return extractDataFromSecondOffer(
          this.validate(SecondOfferSchema, value),
        );
      default:
        throw new BadRequestException('Unrecognised request');
    }
  }
}
