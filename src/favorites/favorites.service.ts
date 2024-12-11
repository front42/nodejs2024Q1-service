import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private databaseService: DatabaseService) {}

  create(childRoute: string, id: string) {
    switch (childRoute) {
      case 'artist':
        const artist = this.databaseService.artists.find(
          (artist) => artist.id === id,
        );
        if (artist) {
          this.databaseService.favorites.artists.push(id);
          return artist.info;
        } else {
          throw new UnprocessableEntityException(`No such artist in database`);
        }
      case 'album':
        const album = this.databaseService.albums.find(
          (album) => album.id === id,
        );
        if (album) {
          this.databaseService.favorites.albums.push(id);
          return album.info;
        } else {
          throw new UnprocessableEntityException(`No such album in database`);
        }
      case 'track':
        const track = this.databaseService.tracks.find(
          (track) => track.id === id,
        );
        if (track) {
          this.databaseService.favorites.tracks.push(id);
          return track.info;
        } else {
          throw new UnprocessableEntityException(`No such track in database`);
        }
      default:
        throw new BadRequestException(`No such route`);
    }
  }

  findAll() {
    return {
      artists: this.databaseService.favorites.artists.map((id) =>
        this.databaseService.artists.find((artist) => artist.id === id),
      ),
      albums: this.databaseService.favorites.albums.map((id) =>
        this.databaseService.albums.find((album) => album.id === id),
      ),
      tracks: this.databaseService.favorites.tracks.map((id) =>
        this.databaseService.tracks.find((track) => track.id === id),
      ),
    };
  }

  remove(childRoute: string, id: string) {
    switch (childRoute) {
      case 'artist':
        const artistId = this.databaseService.favorites.artists.find(
          (el) => el === id,
        );
        if (artistId) {
          this.databaseService.favorites.artists.splice(
            this.databaseService.favorites.artists.indexOf(artistId),
            1,
          );
          return artistId;
        } else {
          throw new NotFoundException(`No such artist in favorites`);
        }
      case 'album':
        const albumId = this.databaseService.favorites.albums.find(
          (el) => el === id,
        );
        if (albumId) {
          this.databaseService.favorites.albums.splice(
            this.databaseService.favorites.albums.indexOf(albumId),
            1,
          );
          return albumId;
        } else {
          throw new NotFoundException(`No such album in favorites`);
        }
      case 'track':
        const trackId = this.databaseService.favorites.tracks.find(
          (el) => el === id,
        );
        if (trackId) {
          this.databaseService.favorites.tracks.splice(
            this.databaseService.favorites.tracks.indexOf(trackId),
            1,
          );
          return trackId;
        } else {
          throw new NotFoundException(`No such track in favorites`);
        }
      default:
        throw new BadRequestException(`No such route`);
    }
  }
}
