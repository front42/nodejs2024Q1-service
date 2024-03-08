import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    if (
      this.databaseService.users.find(
        (user) => user.login === createUserDto.login,
      )
    )
      throw new BadRequestException(
        `User ${createUserDto.login} already exists in database`,
      );

    const user = new User(createUserDto.login, createUserDto.password); // можно деструктурировать
    if (!user.login) throw new BadRequestException(`No required login`);
    this.databaseService.users.push(user);
    return user.info;
  }

  findAll() {
    return this.databaseService.users.map((user: User) => user.info);
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Not valid id');

    // @Get(':uuid') Есть встроенный
    // async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    //   return this.catsService.findOne(uuid);
    // }

    const user = this.databaseService.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('No such user in database');
    return user.info;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!validate(id)) throw new BadRequestException('Not valid id');
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
    return `This action removes a #${id} user`;
  }
}
