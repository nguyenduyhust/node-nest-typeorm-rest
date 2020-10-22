import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from '@api/api.module';
import { configuration } from '@config';
import { BatchModule } from '@batch/batch.module';

const routes: Routes = [
  {
    path: 'api',
    module: ApiModule,
  },
];

@Module({
  imports: [
    // load config
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : '.env.prod',
      load: [configuration],
    }),
    // DB Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('database.type') as any,
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get<string>('database.name'),
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
    // schedule
    ScheduleModule.forRoot(),
    // batch
    BatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
