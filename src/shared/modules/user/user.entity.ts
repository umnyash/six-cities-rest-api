import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

import { EMAIL_REGEX, UsernameLength } from '../../constants.js';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../utils/index.js';

export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    minlength: UsernameLength.Min,
    maxlength: UsernameLength.Max,
  })
  public name: string;

  @prop({
    required: true,
    unique: true,
    match: EMAIL_REGEX,
  })
  public email: string;

  @prop({ required: true })
  private passwordHash: string;

  @prop()
  public avatarUrl: string;

  @prop({ default: false })
  public isPro: boolean;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string): void {
    this.passwordHash = createSHA256(password, salt)
  }

  public getPasswordHash() {
    return this.passwordHash;
  }
}

export const UserModel = getModelForClass(UserEntity);
