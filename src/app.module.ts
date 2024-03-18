import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabasePrismaModule } from './database-prisma/database-prisma.module';

@Module({
  imports: [UsersModule, DatabasePrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
