import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';
import { EncryptHelper } from '@base/helpers';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User extends BaseModel {

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 60,
    unique: true,
    nullable: false,
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  static async hashPassword(password: string) {
    return EncryptHelper.hash(password);
  }

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 180,
    nullable: false,
  })
  fullName: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phone: string;
}
