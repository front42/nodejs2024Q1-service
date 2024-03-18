import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabasePrismaService],
})
export class UsersModule {}
