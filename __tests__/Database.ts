import 'jest';
import { DatabaseConnection } from '../app/Database/Database';
import { dropTables } from '../app/Database/utils';
import { Athlete, Game, Sport, Event, Team, Result } from '../app/Database/entities';
import { Medal, Season, Sex } from '../app/types';

const DB = DatabaseConnection.getInstance();

describe('Database tests', () => {
  beforeAll(async () => {
    await dropTables();
  });

  afterAll(async () => {
    await dropTables();
  });

  test('Athlete creates the only row', async () => {
    const userRows = await DB('athletes');
    expect(userRows.length).toBe(0);

    const athlete = new Athlete({ height: 100, name: 'Boris', sex: Sex.F, weight: 100, year: 1966 });
    athlete.teamId = 1;

    await athlete.write();
    const userRowsAfter = await DB('athletes');

    expect(userRowsAfter.length).toBe(1);
  });

  test('Game creates the only row', async () => {
    const gameRows = await DB('games');

    expect(gameRows.length).toBe(0);

    const game = new Game({ city: 'Sumy', season: Season.Summer, year: 1999 });

    await game.write();

    const gameRowsAfter = await DB('games');

    expect(gameRowsAfter.length).toBe(1);
  });

  test('Sport creates the only row', async () => {
    const sportRows = await DB('sports');

    expect(sportRows.length).toBe(0);

    const sport = new Sport({ sport: 'Smoking weed' });

    await sport.write();

    const sportRowsAfter = await DB('sports');

    expect(sportRowsAfter.length).toBe(1);
  });

  test('Event creates the only row', async () => {
    const eventRows = await DB('events');

    expect(eventRows.length).toBe(0);

    const event = new Event({ event: 'Somethis good' });

    await event.write();

    const eventRowsAfter = await DB('events');

    expect(eventRowsAfter.length).toBe(1);
  });

  test('Team creates the only row', async () => {
    const teamRows = await DB('teams');

    expect(teamRows.length).toBe(0);

    const team = new Team({ team: 'Spartak', noc: 'Uganda' });

    await team.write();

    const teamRowsAfter = await DB('teams');

    expect(teamRowsAfter.length).toBe(1);
  });

  test('Result creates the only row', async () => {
    const resultRows = await DB('results');

    expect(resultRows.length).toBe(0);

    const result = new Result({ medal: Medal.Gold });

    result.athleteId = 1;
    result.eventId = 1;
    result.sportId = 1;
    result.gameId = 1;

    await result.write();

    const resultRowsAfter = await DB('results');

    expect(resultRowsAfter.length).toBe(1);
  });

  test('Athlete row matches', async () => {
    const athleteParams = { height: 100, name: 'Boris', sex: Sex.F, weight: 100, year: 1966 };

    const athlete = new Athlete(athleteParams);

    athlete.teamId = 2;

    await athlete.write();
    const athleteRow = await DB('athletes').where({
      year_of_birth: athleteParams.year,
      full_name: athleteParams.name,
      sex: athleteParams.sex,
      params: JSON.stringify({
        weight: athleteParams.weight,
        height: athleteParams.height,
      }),
      team_id: athlete.teamId,
    });

    expect(athleteRow.length).toBe(1);
  });

  test('Game row matches', async () => {
    const gameParams = { city: 'Bezdrik', season: Season.Summer, year: 2879 };
    const game = new Game(gameParams);

    await game.write();

    const gameRow = await DB('games').where(gameParams);

    expect(gameRow.length).toBe(1);
  });

  test('Sport  row matches', async () => {
    const sportParams = { sport: 'Running in heels' };
    const sport = new Sport(sportParams);

    await sport.write();

    const sportRow = await DB('sports').where({ name: sportParams.sport });

    expect(sportRow.length).toBe(1);
  });

  test('Event row matches', async () => {
    const eventParams = { event: 'Something funny' };
    const event = new Event({ event: 'Something funny' });

    await event.write();

    const eventRow = await DB('events').where({ name: eventParams.event });

    expect(eventRow.length).toBe(1);
  });

  test('Team row matches', async () => {
    const teamParams = { team: 'Netherlands', noc: 'Elysium' };
    const team = new Team(teamParams);
    await team.write();

    const teamRow = await DB('teams').where({
      noc_name: teamParams.noc,
      name: teamParams.team,
    });

    expect(teamRow.length).toBe(1);
  });

  test('Result row matches', async () => {
    const resultParams = {
      athlete_id: 30,
      event_id: 30,
      sport_id: 30,
      game_id: 30,
    };

    const result = new Result({ medal: Medal.Gold });

    result.athleteId = resultParams.athlete_id;
    result.eventId = resultParams.event_id;
    result.sportId = resultParams.sport_id;
    result.gameId = resultParams.game_id;

    await result.write();

    const resultRow = await DB('results').where(resultParams);

    expect(resultRow.length).toBe(1);
  });
});
