import { Athlete, Event, Game, Result, Sport, Team } from '../Database/entities';
import { OlympicEvent } from '../Database/utils/OlympicEvent';
import { SanitizedCSVRecord } from '../types';
import { HashCollection } from '../Database/utils/HashCollection';

export function mapToValidDBObjects(
  sanitizedSCV: Array<SanitizedCSVRecord>,
): {
  olympicEvents: Array<OlympicEvent>;
  uniqueEntries: {
    athletes: Array<Athlete>;
    sports: Array<Sport>;
    events: Array<Event>;
    teams: Array<Team>;
    games: Array<Game>;
  };
} {
  const athletesHashCollection = new HashCollection<Athlete>();
  const sportsHashCollection = new HashCollection<Sport>();
  const eventsHashCollection = new HashCollection<Event>();
  const teamsHashCollection = new HashCollection<Team>();
  const gamesHashCollection = new HashCollection<Game>();

  const olympicEvents: Array<OlympicEvent> = sanitizedSCV.map(sanitizedCSVRow => {
    const { event, sport, noc, year, city, season, name, sex, height, weight, medal, team } = sanitizedCSVRow;

    return new OlympicEvent(
      athletesHashCollection.addOrGetExisting(new Athlete({ name, sex, year, height, weight })),
      eventsHashCollection.addOrGetExisting(new Event({ event })),
      new Result({ medal }),
      sportsHashCollection.addOrGetExisting(new Sport({ sport })),
      teamsHashCollection.addOrGetExisting(new Team({ team, noc })),
      gamesHashCollection.addOrGetExisting(new Game({ city, season, year })),
    );
  });

  return {
    olympicEvents,
    uniqueEntries: {
      athletes: athletesHashCollection.getArray(),
      sports: sportsHashCollection.getArray(),
      events: eventsHashCollection.getArray(),
      teams: teamsHashCollection.getArray(),
      games: gamesHashCollection.getArray(),
    },
  };
}
