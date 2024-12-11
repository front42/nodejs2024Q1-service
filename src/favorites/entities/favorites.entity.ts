import { IFavorites } from 'src/models';

export class Favorites implements IFavorites {
  public artists: string[] = [];
  public albums: string[] = [];
  public tracks: string[] = [];
}
