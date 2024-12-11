import { v4 as uuidv4 } from 'uuid';
import { IUser } from 'src/models';

export class User implements IUser {
  public id = uuidv4();
  public version = 1;
  public createdAt = Date.now();
  public updatedAt = this.createdAt;

  constructor(public login: string, public password: string) {}

  get info() {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
