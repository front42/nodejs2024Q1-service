import { v4 as uuidv4 } from 'uuid';
import { IArtist } from 'src/models';

export class Artist implements IArtist {
  public id = uuidv4();

  constructor(public name: string, public grammy: boolean) {}

  // get info() {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     grammy: this.grammy,
  //   };
  // }
}
