import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistsService } from 'src/artists/artists.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { ApiKeyStrategy } from './api-key-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [UsersModule,
            JwtModule.registerAsync({ imports: [ConfigModule], useFactory: async (configService: ConfigService) => ({ secret: configService.get<string>("secret"), signOptions: { expiresIn: "1d" } }), inject: [ConfigService]}),
            ArtistsModule]
})
export class AuthModule {}
