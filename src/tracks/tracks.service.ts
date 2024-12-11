import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TracksService {
  constructor(private databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );
    if (!track.name || typeof track.duration !== 'number')
      throw new BadRequestException(`No required name or duration`);
    this.databaseService.tracks.push(track);
    return track.info;
  }

  findAll() {
    return this.databaseService.tracks.map((track: Track) => track.info);
  }

  findOne(id: string) {
    const track = this.databaseService.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('No such track in database');
    return track.info;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!updateTrackDto.name || typeof updateTrackDto.duration !== 'number')
      throw new BadRequestException(`No required name or duration`);
    const track = this.databaseService.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('No such track in database');
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track.info;
  }

  remove(id: string) {
    const track = this.databaseService.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('No such track in database');
    this.databaseService.favorites.tracks =
      this.databaseService.favorites.tracks.filter((trackId) => trackId !== id);
    this.databaseService.tracks = this.databaseService.tracks.filter(
      (track) => track.id !== id,
    );
  }
}
