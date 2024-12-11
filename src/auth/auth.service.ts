import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    return this.generateToken(user);
  }

  async signup(createUserDto: CreateUserDto) {
    if (
      !createUserDto.login ||
      typeof createUserDto.login !== 'string' ||
      !createUserDto.password ||
      typeof createUserDto.password !== 'string'
    ) {
      throw new BadRequestException('No required login or password');
    }
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user) {
    const payload = { id: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload);
    return { ...payload, accessToken };
  }

  private async validateUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.getUserByLogin(createUserDto.login);
    const passwordEquals = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('Incorrect credentials');
  }
}
