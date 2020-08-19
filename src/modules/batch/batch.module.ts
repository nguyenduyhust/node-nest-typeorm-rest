import { Module } from '@nestjs/common';
import { SERVICES } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from '@api/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature(ENTITIES),
  ],
  providers: [...SERVICES],
})
export class BatchModule { }