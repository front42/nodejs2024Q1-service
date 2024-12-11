import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':childRoute/:id')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('childRoute') childRoute: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.favoritesService.create(childRoute, id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete(':childRoute/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('childRoute') childRoute: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.favoritesService.remove(childRoute, id);
  }
}
