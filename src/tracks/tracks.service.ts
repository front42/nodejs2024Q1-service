import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Injectable()
export class TracksService {
  constructor(private databasePrismaService: DatabasePrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || typeof createTrackDto.duration !== 'number')
      throw new BadRequestException('No required name or duration');
    return await this.databasePrismaService.track.create({
      data: createTrackDto,
    });
  }

  async findAll() {
    return await this.databasePrismaService.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.databasePrismaService.track.findUnique({
      where: { id },
    });
    if (!track) throw new NotFoundException('No such track in database');
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!updateTrackDto.name || typeof updateTrackDto.duration !== 'number')
      throw new BadRequestException('No required name or duration');
    let track = await this.databasePrismaService.track.findUnique({
      where: { id },
    });
    if (!track) throw new NotFoundException('No such track in database');
    track = await this.databasePrismaService.track.update({
      where: { id },
      data: {
        name: updateTrackDto.name,
        artistId: updateTrackDto.artistId,
        albumId: updateTrackDto.albumId,
        duration: updateTrackDto.duration,
      },
    });
    return track;
  }

  async remove(id: string) {
    const track = await this.databasePrismaService.track.findUnique({
      where: { id },
    });
    if (!track) throw new NotFoundException('No such track in database');
    return await this.databasePrismaService.track.delete({ where: { id } });
  }
}
