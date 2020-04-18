import { IndexedObject, Sex, Table } from '../../../types';
import { Model } from '../../utils/Model';

export interface AthleteParams {
  height?: number;
  weight?: number;
}

export interface AthleteInitParams {
  sex?: Sex;
  year?: number;
  name: string;
  height?: number;
  weight?: number;
}

export class Athlete extends Model {
  private static readonly TABLE_NAME = Table.ATHLETES;

  private _fullName: string;
  private _sex?: Sex;
  private _birthYear?: number;
  private _params: AthleteParams;
  private _teamId?: number;

  constructor({ name, sex, year, weight, height }: AthleteInitParams) {
    super();

    this._fullName = name;
    this._sex = sex;
    this._birthYear = year;

    const params: AthleteParams = {};

    if (weight) {
      params.weight = weight;
    }

    if (height) {
      params.height = height;
    }

    this._params = params;
  }

  getInsertParams(): IndexedObject {
    const { fullName, sex, teamId, params, birthYear } = this;

    return {
      id: this.id,
      full_name: fullName,
      sex,
      team_id: teamId,
      params: JSON.stringify(params),
      year_of_birth: birthYear,
    };
  }

  write() {
    return super.insertToDB<Athlete>(Athlete.TABLE_NAME);
  }

  public buildKey(): string {
    return super.buildKey();
  }

  getKeyFields(): string[] {
    return ['fullName', 'sex'];
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(value) {
    this._fullName = value;
  }

  get sex() {
    return this._sex;
  }

  set sex(value) {
    this._sex = value;
  }

  get birthYear() {
    return this._birthYear;
  }

  set birthYear(value) {
    this._birthYear = value;
  }

  get params(): AthleteParams {
    return this._params;
  }

  set params(value: AthleteParams) {
    this._params = value;
  }

  get teamId() {
    return this._teamId;
  }

  set teamId(value) {
    this._teamId = value;
  }
}
