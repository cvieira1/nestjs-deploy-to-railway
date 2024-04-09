import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artists/artist.entity';
import { connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

const mockSongService = {

  findAll(){

    return [{ id: 1, title: "Lasting lover", artists: ["Siagla"] }]

  }

}

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    // {
    //   provide: SongsService,
    //   useClass: SongsService
    // }
    SongsService,
    // {
    //   provide: SongsService,
    //   useValue: mockSongService
    // }
    {
      provide: "CONNECTION",
      useValue: connection
    }
  ]
})
export class SongsModule {}
