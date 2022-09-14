import * as Joi from 'joi';
import { Offer } from '../entities';

interface FirstOfferResponseOffer {
  platform: string;
  device: string;
  offer_name: string;
  offer_desc: string;
  call_to_action: string;
  image_url: string;
  offer_url: string;
  offer_id: string;
}

interface FirstOfferResponse {
  offers: Array<FirstOfferResponseOffer>;
}

export interface FirstOffer extends Record<string, unknown> {
  response: FirstOfferResponse;
}

export const FirstOfferSchema = Joi.object({
  response: Joi.object({
    offers: Joi.array().items(
      Joi.object({
        offer_id: Joi.number().required(),
        image_url: Joi.string().uri().required(),
        offer_name: Joi.string().required(),
        offer_url: Joi.string().uri().required(),
        call_to_action: Joi.string().default(''),
        offer_desc: Joi.string().default(''),
        platform: Joi.string().valid('mobile', 'desktop').required(),
        device: Joi.string().required(),
      }),
    ).required(),
  }).required(),
});

export const extractDataFromFirstOffer = (payload: FirstOffer): Offer[] => {
  const {
    response: { offers },
  } = payload;
  const isDesktop = (offer) => {
    if (offer.platform === 'desktop') {
      return 1;
    }
    return 0;
  };

  const isIos = (offer) => {
    if (offer.platform === 'mobile') {
      return Number(
        offer.device.indexOf('iphone') !== -1 ||
          offer.device.indexOf('ipad') !== -1 ||
          offer.device.indexOf('ios') !== -1,
      );
    }
    return 0;
  };

  const isAndroid = (offer) => {
    if (offer.platform === 'mobile') {
      return Number(offer.device.indexOf('android') !== -1);
    }
    return 0;
  };
  return offers.map((offer) => {
    const offerInstance = new Offer();
    offerInstance.slug = `offer1_${offer.offer_id}`;
    offerInstance.name = offer.offer_name;
    offerInstance.description = offer.offer_desc;
    offerInstance.requirements = offer.call_to_action;
    offerInstance.thumbnail = offer.image_url;
    offerInstance.boxSize = 'large';
    offerInstance.isDesktop = isDesktop(offer);
    offerInstance.isAndroid = isAndroid(offer);
    offerInstance.isIos = isIos(offer);
    offerInstance.offerUrlTemplate = offer.offer_url;
    offerInstance.providerName = 'offer1';
    offerInstance.externalOfferId = offer.offer_id;
    return offerInstance;
  });
};
