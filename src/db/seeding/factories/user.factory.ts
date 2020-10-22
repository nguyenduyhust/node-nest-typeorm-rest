import { define } from 'typeorm-seeding';
import { User } from '@api/entities';
import * as Faker from 'faker';

define(User, () => {
  return new User({
    email: Faker.internet.email().toLowerCase(),
    password: Faker.internet.password(),
    fullName: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
    createdAt: Faker.date.recent(),
    updatedAt: Faker.date.recent(),
  });
});
