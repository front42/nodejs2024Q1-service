import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, DatabasePrismaService],
  imports: [AuthModule],
})
export class AlbumsModule {}
