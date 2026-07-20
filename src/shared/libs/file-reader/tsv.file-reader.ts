import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { CityName, HousingType, Offer, OfferFeature } from '../../types/index.js';
import { FileReaderEventName } from './file-reader-event-name.enum.js';
import { parseBoolean, parseInteger } from '../../utils/index.js';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private readonly CHUNK_SIZE = 16384; //16KB

  constructor(
    private readonly filename: string,
  ) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let importedRowsCount = 0;

    for await (const chunk of readStream as AsyncIterable<string>) {
      remainingData += chunk.toString();
      let lineSeparatorIndex = remainingData.indexOf('\n');

      while (lineSeparatorIndex >= 0) {
        const completeRow = remainingData.slice(0, lineSeparatorIndex);
        remainingData = remainingData.slice(lineSeparatorIndex + 1);
        importedRowsCount++;

        const parsedOffer = TSVFileReader.parseOffer(completeRow);

        await new Promise((resolve) => {
          this.emit(FileReaderEventName.Line, parsedOffer, resolve);
        });

        lineSeparatorIndex = remainingData.indexOf('\n');
      }
    }

    this.emit(FileReaderEventName.End, importedRowsCount);
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
