import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class DatabaseService {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  // tracks: Track[] = [];
  // favorites: Favorites = { artists: [], albums: [], tracks: [] };
}
