import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { Component } from '../../types/index.js';
import { OfferEntity, OfferModel } from './offer.entity.js';

export function createOfferContainer() {
  const container = new Container();

  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return container;
}
