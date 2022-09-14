import * as Joi from 'joi';
import { Offer } from '../entities';

export const SecondOfferSchema = Joi.object({
  data: Joi.object().pattern(Joi.string(), {
    Offer: Joi.object({
      campaign_id: Joi.number().required(),
      icon: Joi.string().uri().required(),
      name: Joi.string().required(),
      tracking_url: Joi.string().uri().required(),
      instructions: Joi.string().default(''),
      description: Joi.string().default(''),
    }),
    OS: Joi.object({
      android: Joi.boolean().required(),
      ios: Joi.boolean().required(),
      web: Joi.boolean().required(),
    }),
  }).required(),
});

export const extractDataFromSecondOffer = (
  payload: Record<string, unknown>,
): Offer[] => {
  const { data } = payload;
  return Object.keys(data).map((offerId: string) => {
    const offerInstance = new Offer();
    offerInstance.slug = `offer2_${data[offerId].Offer.campaign_id}`;
    offerInstance.name = data[offerId].Offer.name;
    offerInstance.description = data[offerId].Offer.description;
    offerInstance.requirements = data[offerId].Offer.instructions;
    offerInstance.thumbnail = data[offerId].Offer.icon;
    offerInstance.boxSize = 'small';
    offerInstance.isDesktop = Number(data[offerId].OS.web);
    offerInstance.isAndroid = Number(data[offerId].OS.android);
    offerInstance.isIos = Number(data[offerId].OS.ios);
    offerInstance.offerUrlTemplate = data[offerId].Offer.tracking_url;
    offerInstance.providerName = 'offer2';
    offerInstance.externalOfferId = data[offerId].Offer.campaign_id.toString();
    return offerInstance;
  });
};
