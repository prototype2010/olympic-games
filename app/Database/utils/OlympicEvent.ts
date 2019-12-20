import { Athlete, Event, Game, Result, Sport, Team } from '../entities/index';

export class OlympicEvent {
  private _athlete: Athlete;
  private _event: Event;
  private _result: Result;
  private _sport: Sport;
  private _team: Team;
  private _game: Game;

  constructor(athlete: Athlete, event: Event, result: Result, sport: Sport, team: Team, game: Game) {
    this._athlete = athlete;
    this._event = event;
    this._result = result;
    this._sport = sport;
    this._team = team;
    this._game = game;
  }

  get athlete(): Athlete {
    return this._athlete;
  }

  set athlete(value: Athlete) {
    this._athlete = value;
  }

  get event(): Event {
    return this._event;
  }

  set event(value: Event) {
    this._event = value;
  }

  get result(): Result {
    return this._result;
  }

  set result(value: Result) {
    this._result = value;
  }

  get sport(): Sport {
    return this._sport;
  }

  set sport(value: Sport) {
    this._sport = value;
  }

  get team(): Team {
    return this._team;
  }

  set team(value: Team) {
    this._team = value;
  }

  get game(): Game {
    return this._game;
  }

  set game(value: Game) {
    this._game = value;
  }
}
