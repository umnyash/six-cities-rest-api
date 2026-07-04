import { CityName } from './city-name.enum.js';
import { HousingType } from './housing-type.enum.js';
import { OfferFeature } from './offer-feature.enum.js';

type MockCity = {
  name: CityName;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type MockServerData = {
  cities: MockCity[];
  titles: string[];
  housingTypes: HousingType[];
  descriptions: string[];
  features: OfferFeature[];
  names: string[];
}
