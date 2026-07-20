import { Offer } from '../../shared/types/index.js';
import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';
import { buildMongoURI, getErrorMessage, parseInteger } from '../../shared/utils/index.js';
import { TSVFileReader, FileReaderEventName } from '../../shared/libs/file-reader/index.js';
import { stylizeSuccessMessage, stylizeErrorMessage } from '../cli.styles.js';

import { OfferService } from '../../shared/modules/offer/index.js';
import { UserService } from '../../shared/modules/user/index.js';
import { DatabaseClient } from '../../shared/libs/database-client/index.js';

export class ImportCommand implements Command {
  private salt: string;

  constructor(
    private readonly databaseClient: DatabaseClient,
    private readonly userService: UserService,
    private readonly offerService: OfferService,
  ) { }

  public getName(): string {
    return CommandName.Import;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename, username, password, host, port, databaseName, salt] = parameters;
    this.salt = salt;

    const mongoUri = buildMongoURI({
      username,
      password,
      host,
      port: parseInteger(port),
      databaseName,
    });

    await this.databaseClient.connect(mongoUri);

    try {
      const fileReader = new TSVFileReader(filename.trim());

      fileReader.on(FileReaderEventName.Line, (offer: Offer, resolve: () => void) => {
        void this.onLineRead(offer, resolve);
      });

      fileReader.once(FileReaderEventName.End, (count: number) => {
        void this.onReadingEnd(count);
      });

      await fileReader.read();
    } catch (error: unknown) {
      console.error(stylizeErrorMessage(`Can't import data from file: ${filename}`));
      console.error(stylizeErrorMessage(getErrorMessage(error)));
    }
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(offer.author, this.salt);

    await this.offerService.create({
      title: offer.title,
      housingType: offer.housingType,
      previewPhotoUrl: offer.previewPhotoUrl,
      rating: offer.rating,
      isPremium: offer.isPremium,
      price: offer.price,
      roomsCount: offer.roomsCount,
      capacity: offer.capacity,
      features: offer.features,
      photoUrls: offer.photoUrls,
      description: offer.description,
      cityName: offer.cityName,
      coordinates: offer.coordinates,
      authorId: String(user.id),
      publicationDate: offer.publicationDate,
    });
  }

  private async onLineRead(offer: Offer, resolve: () => void): Promise<void> {
    await this.saveOffer(offer);
    resolve();
  }

  private async onReadingEnd(count: number): Promise<void> {
    console.info(stylizeSuccessMessage(`${String(count)} rows imported.`));
    await this.databaseClient.disconnect();
  }
}
