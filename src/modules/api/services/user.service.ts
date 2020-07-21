import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { classToPlain } from 'class-transformer';

import { User } from '@api/entities';

export interface CreateUserInput {
  username: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(options: IPaginationOptions, s: string): Promise<Pagination<UserResponse>> {
    const queryBuilder = this.userRepository.createQueryBuilder('c');
    s = s.trim();
    if (s.length > 0) {
      queryBuilder.orWhere('username like :s', { s: `%${s}%` });
      queryBuilder.orWhere('full_name like :s', { s: `%${s}%` });
    }
    let records = await paginate<UserResponse>(queryBuilder, options);
    const items = classToPlain(records.items);
    records = Object.assign(records, { items: items });
    return records;
  }

  async create(payload: CreateUserInput) {
    const user = new User({
      ...payload,
      password: await User.hashPassword(payload.password),
    });
    return this.userRepository.save(user);
  }

  async findOneByUsername(email: string) {
    return this.userRepository.findOne({ email });
  }

  async findOneById(id: string) {
    return this.userRepository.findOne(id);
  }

}