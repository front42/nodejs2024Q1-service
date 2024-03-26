import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private databasePrismaService: DatabasePrismaService) {}

  async create(childRoute: string, id: string) {
    switch (childRoute) {
      case 'artist':
        const artist = await this.databasePrismaService.artist.findUnique({
          where: { id },
        });
        if (artist) {
          await this.databasePrismaService.artist.update({
            where: { id },
            data: {
              favorites: {
                connectOrCreate: {
                  where: { id: 'Favorites' },
                  create: { id: 'Favorites' },
                },
              },
            },
          });
          return artist;
        } else {
          throw new UnprocessableEntityException('No such artist in database');
        }
      case 'album':
        const album = await this.databasePrismaService.album.findUnique({
          where: { id },
        });
        if (album) {
          await this.databasePrismaService.album.update({
            where: { id },
            data: {
              favorites: {
                connectOrCreate: {
                  where: { id: 'Favorites' },
                  create: { id: 'Favorites' },
                },
              },
            },
          });
          return album;
        } else {
          throw new UnprocessableEntityException('No such album in database');
        }
      case 'track':
        const track = await this.databasePrismaService.track.findUnique({
          where: { id },
        });
        if (track) {
          await this.databasePrismaService.track.update({
            where: { id },
            data: {
              favorites: {
                connectOrCreate: {
                  where: { id: 'Favorites' },
                  create: { id: 'Favorites' },
                },
              },
            },
          });
          return track;
        } else {
          throw new UnprocessableEntityException('No such track in database');
        }
    }
  }

  async findAll() {
    return (
      (await this.databasePrismaService.favorites.findUnique({
        where: { id: 'Favorites' },
        select: {
          artists: true,
          albums: true,
          tracks: true,
        },
      })) ?? { artists: [], albums: [], tracks: [] }
    );
  }

  async remove(childRoute: string, id: string) {
    switch (childRoute) {
      case 'artist':
        const artist = await this.databasePrismaService.artist.findUnique({
          where: { id },
        });
        if (artist) {
          await this.databasePrismaService.artist.update({
            where: { id },
            data: {
              favorites: {
                disconnect: { id: 'Favorites' },
              },
            },
          });
          return artist;
        } else {
          throw new NotFoundException('No such artist in favorites');
        }
      case 'album':
        const album = await this.databasePrismaService.album.findUnique({
          where: { id },
        });
        if (album) {
          await this.databasePrismaService.album.update({
            where: { id },
            data: {
              favorites: {
                disconnect: { id: 'Favorites' },
              },
            },
          });
          return album;
        } else {
          throw new NotFoundException('No such album in favorites');
        }
      case 'track':
        const track = await this.databasePrismaService.track.findUnique({
          where: { id },
        });
        if (track) {
          await this.databasePrismaService.track.update({
            where: { id },
            data: {
              favorites: {
                disconnect: { id: 'Favorites' },
              },
            },
          });
          return track;
        } else {
          throw new NotFoundException('No such track in favorites');
        }
      default:
        throw new BadRequestException('No such route');
    }
  }
}
