import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, DatabasePrismaService],
})
export class ArtistsModule {}
