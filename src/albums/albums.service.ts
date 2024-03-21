import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private databasePrismaService: DatabasePrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    if (
      !createAlbumDto.name ||
      typeof createAlbumDto.name !== 'string' ||
      typeof createAlbumDto.year !== 'number'
    )
      throw new BadRequestException('No required name, year or artist id');
    return await this.databasePrismaService.album.create({
      data: createAlbumDto,
    });
  }

  async findAll() {
    return await this.databasePrismaService.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.databasePrismaService.album.findUnique({
      where: { id },
    });
    if (!album) throw new NotFoundException('No such album in database');
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!updateAlbumDto.name || typeof updateAlbumDto.year !== 'number')
      throw new BadRequestException('No required name or year');
    let album = await this.databasePrismaService.album.findUnique({
      where: { id },
    });
    if (!album) throw new NotFoundException('No such album in database');
    album = await this.databasePrismaService.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId,
      },
    });
    return album;
  }

  async remove(id: string) {
    const album = await this.databasePrismaService.album.findUnique({
      where: { id },
    });
    if (!album) throw new NotFoundException('No such album in database');
    return await this.databasePrismaService.album.delete({ where: { id } });
  }
}
