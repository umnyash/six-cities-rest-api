import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import {
  Capacity,
  DescriptionLength,
  Price,
  RatingValue,
  RoomsCount,
  TitleLength,
} from '../../constants.js';

import { CityName, Coordinates, HousingType, OfferFeature } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base { }

class OfferCoordinates {
  @prop({ required: true })
  public latitude: number;

  @prop({ required: true })
  public longitude: number;
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    minlength: TitleLength.Min,
    maxlength: TitleLength.Max,
  })
  public readonly title: string;

  @prop({
    required: true,
    enum: HousingType,
  })
  public readonly housingType: HousingType;

  @prop({
    required: true,
    type: () => [String],
  })
  public readonly previewPhotoUrl: string;

  @prop({
    required: true,
    min: RatingValue.Min,
    max: RatingValue.Max,
  })
  public readonly rating: number;

  @prop({ default: false })
  public readonly isPremium: boolean;

  @prop({
    required: true,
    min: Price.Min,
    max: Price.Max,
  })
  public readonly price: number;

  @prop({
    required: true,
    min: RoomsCount.Min,
    max: RoomsCount.Max,
  })
  public readonly roomsCount: number;

  @prop({
    required: true,
    min: Capacity.Min,
    max: Capacity.Max,
  })
  public readonly capacity: number;

  @prop({
    type: () => [String],
    enum: OfferFeature,
    default: [],
  })
  public readonly features: OfferFeature[];

  @prop({
    required: true,
    type: () => [String],
  })
  public readonly photoUrls: string[];

  @prop({
    required: true,
    minlength: DescriptionLength.Min,
    maxlength: DescriptionLength.Max,
  })
  public readonly description: string;

  @prop({
    required: true,
    enum: CityName,
  })
  public readonly cityName: CityName;

  @prop({
    required: true,
    type: () => OfferCoordinates,
    _id: false,
  })
  public readonly coordinates: Coordinates;

  @prop({
    required: true,
    ref: () => UserEntity,
  })
  public readonly authorId: Ref<UserEntity>;

  @prop({
    required: true,
  })
  public readonly publicationDate: Date;
}

export const OfferModel = getModelForClass(OfferEntity);
