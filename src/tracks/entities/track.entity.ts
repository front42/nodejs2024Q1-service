import { v4 as uuidv4 } from 'uuid';

export class Track {
  public id = uuidv4();

  constructor(
    public name: string,
    public artistId: string,
    public albumId: string,
    public duration: number,
  ) {}

  // get info() {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     artistId: this.artistId,
  //     albumId: this.albumId,
  //     duration: this.duration,
  //   };
  // }
}
