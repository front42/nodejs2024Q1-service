import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, DatabasePrismaService],
  imports: [AuthModule],
})
export class ArtistsModule {}
