import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from '@api/api.module';
import { configuration, CONFIGURATION_KEYS } from '@config';

const routes: Routes = [{
  path: 'api',
  module: ApiModule,
}];

@Module({
  imports: [
    // load config
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // DB Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>(CONFIGURATION_KEYS.DATABASE_TYPE) as any,
        host: configService.get<string>(CONFIGURATION_KEYS.DATABASE_HOST),
        port: configService.get<number>(CONFIGURATION_KEYS.MYSQL_PORT),
        username: configService.get<string>(CONFIGURATION_KEYS.MYSQL_USER),
        password: configService.get<string>(CONFIGURATION_KEYS.MYSQL_PASSWORD),
        database: configService.get<string>(CONFIGURATION_KEYS.MYSQL_DATABASE),
        // try autoload entities
        autoLoadEntities: true,
        // {module}/entities/entity.entity.ts
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        // entities: ENTITIES,
        // use cli and run schema:sync is better for secured data
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    // setup routes
    RouterModule.forRoutes(routes),
    // add modules
    ApiModule,
    // public folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
