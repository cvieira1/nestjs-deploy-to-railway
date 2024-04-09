import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { PlayListModule } from './playlists/playlists.module';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from 'env.validation';

const devConfig = { port: 3000 }
const proConfig = { port: 4000 }

@Module({
  imports: [
    SongsModule,
    PlayListModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.NODE_ENV}`],
                           isGlobal: true,
                           load: [configuration],
                           validate: validate})
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: DevConfigService,
      useClass: DevConfigService
    },
    {
      provide: "CONFIG",
      useFactory: () => {

        return process.env.NODE_ENV == "development" ? devConfig : proConfig

      }
    }
  ],
})

export class AppModule { }
