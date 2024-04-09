import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './song.entity';

@Injectable({
    scope: Scope.TRANSIENT
})
export class SongsService {

    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
    ){}

    private readonly songs = []

    async create(songDTO: CreateSongDTO) : Promise<Song>{

        const song = new Song()
        song.title = songDTO.title
        song.duration = songDTO.duration
        song.lyrics = songDTO.lyrics
        song.releaseDate = songDTO.releaseDate

        const artists = await this.artistRepository.findByIds(songDTO.artists)

        song.artists = artists

        return this.songRepository.save(song)

    }

    findAll(): Promise<Song[]>{

        // throw new Error("Error in Db while fetching record")
        return this.songRepository.find()

    }

    findOne(id: number): Promise<Song>{

        return this.songRepository.findOneBy({ id })

    }

    remove(id: number): Promise<DeleteResult>{

        return this.songRepository.delete(id)

    }

    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult>{

        return this.songRepository.update(id, recordToUpdate)

    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>>{

        const queryBuilder = this.songRepository.createQueryBuilder("c")

        queryBuilder.orderBy("c.releaseDate", "DESC")

        return paginate<Song>(queryBuilder, options)

    }

}
