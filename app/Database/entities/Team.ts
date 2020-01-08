import { SanitizedCSVRecord, Table } from '../../types';
import { Model } from '../utils/Model';

export class Team extends Model {
  private static readonly TABLE_NAME = Table.TEAMS;

  readonly name: string;
  readonly NOCName: string;

  constructor({ team, noc }: SanitizedCSVRecord) {
    super();
    this.name = team;
    this.NOCName = noc;
  }

  write() {
    const { name, NOCName } = this;

    return super.insertToDB(Team.TABLE_NAME, {
      name,
      noc_name: NOCName,
    });
  }
}
