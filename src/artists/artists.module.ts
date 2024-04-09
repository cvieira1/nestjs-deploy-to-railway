import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

@Module({
  providers: [ArtistsService],
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistsController],
  exports: [ArtistsService]
})
export class ArtistsModule {}
