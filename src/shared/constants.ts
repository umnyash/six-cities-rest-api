export const COORDINATE_FRACTION_DIGITS = 6;
export const EMAIL_REGEX = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const RATING_FRACTION_DIGITS = 1;
export const OFFER_PHOTOS_COUNT = 6;

export enum Capacity {
  Min = 1,
  Max = 10,
}

export enum Price {
  Min = 100,
  Max = 100000,
}

export enum RatingValue {
  Min = 1,
  Max = 5,
}

export enum RoomsCount {
  Min = 1,
  Max = 8,
}

export enum UsernameLength {
  Min = 1,
  Max = 15,
}

export enum UserPasswordLength {
  Min = 6,
  Max = 12,
}
