import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private databaseService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);
    if (!artist.name || typeof artist.grammy !== 'boolean')
      throw new BadRequestException(`No required name or grammy`);
    this.databaseService.artists.push(artist);
    return artist.info;
  }

  findAll() {
    return this.databaseService.artists.map((artist: Artist) => artist.info);
  }

  findOne(id: string) {
    const artist = this.databaseService.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) throw new NotFoundException('No such artist in database');
    return artist.info;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!updateArtistDto.name || typeof updateArtistDto.grammy !== 'boolean')
      throw new BadRequestException(`No required name or grammy`);
    const artist = this.databaseService.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) throw new NotFoundException('No such artist in database');
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist.info;
  }

  remove(id: string) {
    const artist = this.databaseService.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) throw new NotFoundException('No such artist in database');

    const artistAlbums = this.databaseService.albums.filter(
      (album) => album.artistId === id,
    );
    artistAlbums.forEach((album) => (album.artistId = null));

    const artistTracks = this.databaseService.tracks.filter(
      (track) => track.artistId === id,
    );
    artistTracks.forEach((track) => (track.artistId = null));

    this.databaseService.artists.splice(
      this.databaseService.artists.indexOf(artist),
      1,
    );
    return artist.info;
  }
}
