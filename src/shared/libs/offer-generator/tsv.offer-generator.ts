import dayjs from 'dayjs';

import {
  COORDINATE_FRACTION_DIGITS,
  OFFER_PHOTOS_COUNT,
  RATING_FRACTION_DIGITS,
  Capacity,
  Price,
  RatingValue,
  RoomsCount,
  UserPasswordLength,
} from '../../constants.js';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';

import {
  generateRandomBoolean,
  generateRandomNumber,
  getRandomItem,
  getRandomItems
} from '../../utils/index.js';

const MAX_COORDINATE_SHIFT = 0.025;
const MAX_DAYS_AGO = 30;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const housingType = getRandomItem(this.mockData.housingTypes);
    const previewPhotoUrl = `${housingType}-0.jpg`;
    const rating = generateRandomNumber(RatingValue.Min, RatingValue.Max, RATING_FRACTION_DIGITS);
    const isPremium = generateRandomBoolean();
    const price = generateRandomNumber(Price.Min, Price.Max);
    const roomsCount = generateRandomNumber(RoomsCount.Min, RoomsCount.Max);
    const capacity = generateRandomNumber(Capacity.Min, Capacity.Max);
    const features = getRandomItems(this.mockData.features).join(';');

    const photoUrls = Array.from(
      { length: OFFER_PHOTOS_COUNT },
      (_item, index) => `${housingType}-${String(index + 1)}.jpg`,
    ).join(';');

    const description = getRandomItem(this.mockData.descriptions);

    const city = getRandomItem(this.mockData.cities);
    const cityName = city.name;
    const latitude = TSVOfferGenerator.shiftCoordinate(city.coordinates.latitude);
    const longitude = TSVOfferGenerator.shiftCoordinate(city.coordinates.longitude);

    const userName = getRandomItem(this.mockData.names);
    const userEmail = `${userName.toLowerCase()}@example.net`;

    const userPassword = Math.random()
      .toString()
      .slice(generateRandomNumber(UserPasswordLength.Min, UserPasswordLength.Max));

    const userAvatarUrl = `avatar-${userName.toLowerCase()}.jpg`;
    const isProUser = generateRandomBoolean();

    const publicationDate = dayjs()
      .subtract(generateRandomNumber(0, MAX_DAYS_AGO), 'day')
      .toISOString();

    return [
      title,
      housingType,
      previewPhotoUrl,
      rating,
      isPremium,
      price,
      roomsCount,
      capacity,
      features,
      photoUrls,
      description,
      cityName,
      latitude,
      longitude,
      userName,
      userEmail,
      userPassword,
      userAvatarUrl,
      isProUser,
      publicationDate,
    ].join('\t')
  }

  private static shiftCoordinate(coordinate: number): number {
    const shift = generateRandomNumber(
      -MAX_COORDINATE_SHIFT,
      MAX_COORDINATE_SHIFT,
      COORDINATE_FRACTION_DIGITS
    );

    return coordinate + shift;
  }
}
