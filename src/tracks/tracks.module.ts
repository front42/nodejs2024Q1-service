import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService, DatabasePrismaService],
  imports: [AuthModule],
})
export class TracksModule {}
