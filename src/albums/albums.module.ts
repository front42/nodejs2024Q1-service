import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, DatabasePrismaService],
})
export class AlbumsModule {}
