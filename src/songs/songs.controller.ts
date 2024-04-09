import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Req, Request, Scope, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artists-jwt-guard';
import { Connection } from 'src/common/constants/connection';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './song.entity';
import { SongsService } from './songs.service';

@Controller({
    path: "songs",
    scope: Scope.REQUEST
})
@ApiTags("songs")
export class SongsController {

    constructor(private songsService: SongsService, @Inject("CONNECTION") private connection: Connection) {

        console.log(`THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`);
        

    }

    @Get()
    findAll(@Query("page", new DefaultValuePipe(1), ParseIntPipe) page = 1, @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit = 10): Promise<Pagination<Song>>{

        limit = limit > 100 ? 100 : limit

        return this.songsService.paginate({ page, limit })

    }

    @Get(":id")
    findOne(@Param("id", new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<Song>{

        return this.songsService.findOne(id)

    }

    @Put(":id")
    update(@Param("id", new ParseIntPipe) id: number, @Body() updateSongDto: UpdateSongDto): Promise<UpdateResult>{

        return this.songsService.update(id, updateSongDto)

    }

    @Post()
    @UseGuards(ArtistJwtGuard)
    create(@Body() createSongDTO: CreateSongDTO, @Request() request): Promise<Song>{

        return this.songsService.create(createSongDTO)

    }

    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult>{

        return this.songsService.remove(id)

    }

}
