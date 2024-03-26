import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, DatabasePrismaService],
})
export class FavoritesModule {}
