import { IndexedObject, Table } from '../../../types';
import { Model } from '../../utils/Model';

export interface TeamInitParams {
  team: string;
  noc: string;
}

export class Team extends Model {
  private static readonly TABLE_NAME = Table.TEAMS;

  readonly name: string;
  readonly NOCName: string;

  constructor({ team, noc }: TeamInitParams) {
    super();
    this.name = team;
    this.NOCName = noc;
  }

  getKeyFields(): string[] {
    return ['NOCName'];
  }

  public buildKey(): string {
    return super.buildKey();
  }

  getInsertParams(): IndexedObject {
    const { name, NOCName } = this;

    return {
      name,
      noc_name: NOCName,
    };
  }

  write() {
    return super.insertToDB<Team>(Team.TABLE_NAME);
  }
}
