import { Module } from '@nestjs/common';
import { DatabasePrismaService } from './database-prisma.service';

@Module({
  providers: [DatabasePrismaService],
  exports: [DatabasePrismaService],
})
export class DatabasePrismaModule {}
