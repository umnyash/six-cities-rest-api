import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { Component } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { UserService } from './user-service.interface.js';

export function createUserContainer() {
  const container = new Container();

  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();

  return container;
}
