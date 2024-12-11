import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabasePrismaService } from 'src/database-prisma/database-prisma.service';

@Injectable()
export class UsersService {
  constructor(private databasePrismaService: DatabasePrismaService) {}

  private getUserInfo = (user) => {
    const { password, createdAt, updatedAt, ...rest } = user;
    return {
      ...rest,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    };
  };

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('No required login or password');
    }
    const user = await this.databasePrismaService.user.create({
      data: createUserDto,
    });
    return this.getUserInfo(user);
  }

  async findAll() {
    const users = await this.databasePrismaService.user.findMany();
    return users.map((user) => this.getUserInfo(user));
  }

  async findOne(id: string) {
    const user = await this.databasePrismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('No such user in database');
    return this.getUserInfo(user);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword)
      throw new BadRequestException('No required passwords');
    let user = await this.databasePrismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('No such user in database');
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }
    user = await this.databasePrismaService.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: ++user.version,
        updatedAt: new Date(),
      },
    });
    return this.getUserInfo(user);
  }

  async remove(id: string) {
    const user = await this.databasePrismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('No such user in database');
    return await this.databasePrismaService.user.delete({ where: { id } });
  }
}
