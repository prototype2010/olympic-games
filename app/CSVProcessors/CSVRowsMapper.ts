import { Athlete, Event, Game, Result, Sport, Team } from '../Database/entities';
import { OlympicEvent } from '../Database/utils/OlympicEvent';
import { SanitizedOlympiadEventRecord } from '../types';
import { HashCollection } from '../Database/utils/HashCollection';
import { CSVPropertyDescriptor } from './PropertyDescriptor';
import { PropertyPicker } from './PropertyPicker';
import { ObjectInitializer } from './ObjectInitializer';
import { InitializationStrategy } from './InitializationStrategy';
import { athletesDuplicateManager } from '../Database/entities/Athlete/AthleteDuplicateMaganer';

export type Constructor<T> = new (...args: any[]) => T;

export function mapToValidDBObjects(
  sanitizedSCV: Array<SanitizedOlympiadEventRecord>,
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
  /////////////////// THIS IS TEST ZONE

  /////////////////////////////////////

  const olympicEvents: Array<OlympicEvent> = sanitizedSCV.map(sanitizedCSVRow => {
    const { event, sport, noc, year, city, season, name, sex, height, weight, medal, team } = sanitizedCSVRow;

    // athletesDuplicateManager.register(sanitizedCSVRow);

    return new OlympicEvent(
      athletesDuplicateManager.register(sanitizedCSVRow),
      eventsHashCollection.addOrGetExisting(new Event({ event })),
      new Result({ medal }),
      sportsHashCollection.addOrGetExisting(new Sport({ sport })),
      teamsHashCollection.addOrGetExisting(new Team({ team, noc })),
      gamesHashCollection.addOrGetExisting(new Game({ city, season, year })),
    );
  });

  console.log(athletesDuplicateManager.getUnique());

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
