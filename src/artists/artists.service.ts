import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private databasePrismaService: DatabasePrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || typeof createArtistDto.grammy !== 'boolean') {
      throw new BadRequestException(`No required name or grammy`);
    }
    return await this.databasePrismaService.artist.create({
      data: createArtistDto,
    });
  }

  async findAll() {
    return await this.databasePrismaService.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.databasePrismaService.artist.findUnique({
      where: { id },
    });
    if (!artist) throw new NotFoundException('No such artist in database');
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!updateArtistDto.name || typeof updateArtistDto.grammy !== 'boolean')
      throw new BadRequestException(`No required name or grammy`);
    let artist = await this.databasePrismaService.artist.findUnique({
      where: { id },
    });
    if (!artist) throw new NotFoundException('No such artist in database');
    artist = await this.databasePrismaService.artist.update({
      where: { id },
      data: {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      },
    });
    return artist;
  }

  async remove(id: string) {
    const artist = await this.databasePrismaService.artist.findUnique({
      where: { id },
    });
    if (!artist) throw new NotFoundException('No such artist in database');
    return this.databasePrismaService.artist.delete({ where: { id } });
  }
  //   const artist = this.databasePrismaService.artists.find(
  //     (artist) => artist.id === id,
  //   );
  //   if (!artist) throw new NotFoundException('No such artist in database');
  //   const artistAlbums = this.databasePrismaService.albums.filter(
  //     (album) => album.artistId === id,
  //   );
  //   artistAlbums.forEach((album) => (album.artistId = null));
  //   const artistTracks = this.databasePrismaService.tracks.filter(
  //     (track) => track.artistId === id,
  //   );
  //   artistTracks.forEach((track) => (track.artistId = null));
  //   this.databasePrismaService.favorites.artists =
  //     this.databasePrismaService.favorites.artists.filter(
  //       (artistId) => artistId !== id,
  //     );
  //   this.databasePrismaService.artists =
  //     this.databasePrismaService.artists.filter((artist) => artist.id !== id);
  // }
}
