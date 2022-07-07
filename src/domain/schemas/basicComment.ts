import { AutoMap } from '@automapper/classes';

export class BasicComment {
  id: string;

  @AutoMap()
  userAddress: string;

  @AutoMap()
  content: string;
}
