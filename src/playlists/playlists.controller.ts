import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePlayListDto } from "./dto/create-playlist.dto";
import { Playlist } from "./playlist.entity";
import { PlayListsService } from "./playlists.service";

@Controller("playlists")
@ApiTags("playlists")
export class PlayListsController{

    constructor(private playlistService: PlayListsService) {}

    @Post()
    create(
        @Body()
        playlistDTO: CreatePlayListDto
    ): Promise<Playlist>{

        return this.playlistService.create(playlistDTO)

    }

}