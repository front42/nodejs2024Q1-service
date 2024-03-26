import { v4 as uuidv4 } from 'uuid';

export class Album {
  public id = uuidv4();

  constructor(
    public name: string,
    public year: number,
    public artistId: string | null,
  ) {}
}
