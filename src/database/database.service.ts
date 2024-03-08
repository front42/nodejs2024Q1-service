import { Injectable } from '@nestjs/common';
// import { IAlbum, IArtist, IFavorites, ITrack, IUser } from 'src/models';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DatabaseService {
  users: User[] = [];
  // artists: Artist[] = [];
  // tracks: Track[] = [];
  // albums: Album[] = [];
  // favorites: Favorites = { artists: [], albums: [], tracks: [] };
}
