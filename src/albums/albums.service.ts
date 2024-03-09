import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumsService {
  constructor(private databaseService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    if (
      !album.name ||
      typeof album.name !== 'string' ||
      typeof album.year !== 'number'
    )
      throw new BadRequestException(`No required name, year or artist id`);
    this.databaseService.albums.push(album);
    return album.info;
  }

  findAll() {
    return this.databaseService.albums.map((album: Album) => album.info);
  }

  findOne(id: string) {
    const album = this.databaseService.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('No such album in database');
    return album.info;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!updateAlbumDto.name || typeof updateAlbumDto.year !== 'number')
      throw new BadRequestException(`No required name or year`);
    const album = this.databaseService.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('No such album in database');
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album.info;
  }

  remove(id: string) {
    const album = this.databaseService.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('No such album in database');
    this.databaseService.albums.splice(
      this.databaseService.albums.indexOf(album),
      1,
    );
    return album.info;
  }
}
