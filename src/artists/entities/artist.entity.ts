import { v4 as uuidv4 } from 'uuid';

export class Artist {
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
