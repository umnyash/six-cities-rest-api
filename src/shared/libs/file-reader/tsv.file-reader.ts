import { readFileSync } from 'node:fs';

import { CityName, HousingType, Offer, OfferFeature } from '../../types/index.js';
import { parseBoolean, parseInteger } from '../../utils/index.js';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string,
  ) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public parseOffers(): Offer[] {
    this.validateRawData();

    return this.rawData
      .split('\n')
      .filter((row) => row.trim())
      .map((row) => TSVFileReader.parseOffer(row));
  }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read.');
    }
  }

  private static parseOffer(offerString: string): Offer {
    const [
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
      name,
      email,
      password,
      avatarUrl,
      isPro,
      publicationDate,
    ] = offerString.split('\t');

    return {
      title,
      housingType: housingType as HousingType,
      previewPhotoUrl,
      rating: Number.parseFloat(rating),
      isPremium: parseBoolean(isPremium as 'true' | 'false'),
      price: parseInteger(price),
      roomsCount: parseInteger(roomsCount),
      capacity: parseInteger(capacity),
      features: features.split(';') as OfferFeature[],
      photoUrls: photoUrls.split(';'),
      description,
      cityName: cityName as CityName,
      coordinates: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      },
      author: {
        name,
        email,
        password,
        avatarUrl,
        isPro: parseBoolean(isPro as 'true' | 'false'),
      },
      publicationDate: new Date(publicationDate),
    }
  }
}
