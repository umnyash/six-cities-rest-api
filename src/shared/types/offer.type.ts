import { CityName } from './city-name.enum.js';
import { Coordinates } from './coordinates.type.js';
import { HousingType } from './housing-type.enum.js';
import { OfferFeature } from './offer-feature.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  housingType: HousingType;
  previewPhotoUrl: string;
  rating: number;
  isPremium: boolean;
  price: number;
  roomsCount: number;
  capacity: number;
  features: OfferFeature[];
  photoUrls: string[];
  description: string;
  cityName: CityName;
  coordinates: Coordinates;
  author: User;
  publicationDate: Date;
}
