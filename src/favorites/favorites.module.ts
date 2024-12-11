import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, DatabasePrismaService],
  imports: [AuthModule],
})
export class FavoritesModule {}
