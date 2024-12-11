import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, DatabasePrismaService],
})
export class TracksModule {}
