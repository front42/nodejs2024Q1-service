import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.login, createUserDto.password);
    if (!user.login || !user.password)
      throw new BadRequestException(`No required login or password`);
    this.databaseService.users.push(user);
    return user.info;
  }

  findAll() {
    return this.databaseService.users.map((user: User) => user.info);
  }

  findOne(id: string) {
    const user = this.databaseService.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('No such user in database');
    return user.info;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword)
      throw new BadRequestException(`No required passwords`);
    const user = this.databaseService.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('No such user in database');
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }
    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user.info;
  }

  remove(id: string) {
    const user = this.databaseService.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('No such user in database');
    this.databaseService.users.splice(
      this.databaseService.users.indexOf(user),
      1,
    );
    return user.info;
  }
}
