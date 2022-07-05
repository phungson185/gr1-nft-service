import { AutoMap } from '@automapper/classes';

export class BasicUser {
  id: string;

  @AutoMap()
  address: string;

  @AutoMap()
  username: string;

  @AutoMap()
  avatar: string;
}
