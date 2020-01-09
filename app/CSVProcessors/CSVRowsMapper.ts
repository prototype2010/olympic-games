import { Athlete, Event, Game, Result, Sport, Team } from '../Database/entities';
import { OlympicEvent } from '../Database/utils/OlympicEvent';
import { SanitizedCSVRecord } from '../types';
import { getFromHashMap } from '../utils';

export function mapToValidDBObjects(sanitizedSCV: Array<SanitizedCSVRecord>) {
  const athletes = getFromHashMap<Athlete>(new Map(), Athlete);
  const sports = getFromHashMap<Sport>(new Map(), Sport);
  const events = getFromHashMap<Event>(new Map(), Event);
  const teams = getFromHashMap<Team>(new Map(), Team);
  const games = getFromHashMap<Game>(new Map(), Game);

  const rows: Array<OlympicEvent> = sanitizedSCV.map(sanitizedCSVRow => {
    const { event, sport, noc, year, city, season, id } = sanitizedCSVRow;

    return new OlympicEvent(
      athletes([id], sanitizedCSVRow),
      events([event], sanitizedCSVRow),
      new Result(sanitizedCSVRow),
      sports([sport], sanitizedCSVRow),
      teams([noc], sanitizedCSVRow),
      games([year, season, city], sanitizedCSVRow),
    );
  });

  return {
    rows,
    uniqueEntries: {
      athletes: athletes.getArray(),
      sports: sports.getArray(),
      events: events.getArray(),
      teams: teams.getArray(),
      games: games.getArray(),
    },
  };
}
