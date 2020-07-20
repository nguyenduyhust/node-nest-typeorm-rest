import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CONTROLLERS } from '@api/controlers';
import { SERVICES } from '@api/services';
import { ENTITIES } from './entities';
import { AuthMiddleware } from '@api/middlewares';

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    ConfigModule,
    TypeOrmModule.forFeature(ENTITIES),
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class ApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/users', method: RequestMethod.ALL });
  }
}