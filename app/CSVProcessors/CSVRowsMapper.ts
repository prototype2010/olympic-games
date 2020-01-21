import { Athlete, Event, Game, Result, Sport, Team } from '../Database/entities';
import { OlympicEvent } from '../Database/utils/OlympicEvent';
import { IndexedObject, SanitizedOlympiadEventRecord } from '../types';
import { HashCollection } from '../Database/utils/HashCollection';
import { Model } from '../Database/utils/Model';
import { CSVPropertyDescriptor } from './PropertyDescriptor';
import { PropertyPicker } from './PropertyPicker';
import { ObjectInitializer } from './ObjectInitializer';
import { InitializationStrategy } from './InitializationStrategy';

export type Constructor<T> = new (...args: any[]) => T;

class ReduceStrategy<T extends Model> {
  private hashMap = new HashCollection<T>();
}

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

  const athleteDescriptors = [
    new CSVPropertyDescriptor('name', 'name'),
    new CSVPropertyDescriptor('sex', 'sex'),
    new CSVPropertyDescriptor('year', 'year'),
    new CSVPropertyDescriptor('height', 'height'),
    new CSVPropertyDescriptor('weight', 'weight'),
  ];

  const picked = PropertyPicker.pickAll(athleteDescriptors, {
    id: '1',
    name: 'A Dijiang',
    sex: 'M',
    age: '24',
    height: '180',
    weight: '80',
    team: 'China',
    noc: 'CHN',
    games: '1992 Summer',
    year: '1992',
    season: 'Summer',
    city: 'Barcelona',
    sport: 'Basketball',
    event: "Basketball Men's Basketball",
    medal: 'NA',
  });

  console.log('PICKED = ', picked);

  const initializer = ObjectInitializer.initialize<Athlete>(InitializationStrategy.asObject, Athlete, picked);

  /////////////////////////////////////

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
