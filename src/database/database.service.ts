import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class DatabaseService {
  users: User[] = [];
  artists: Artist[] = [];
  // tracks: Track[] = [];
  // albums: Album[] = [];
  // favorites: Favorites = { artists: [], albums: [], tracks: [] };
}
