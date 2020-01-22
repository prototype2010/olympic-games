import { Athlete, Event, Game, Sport, Team } from '../Database/entities';
import { OlympicEvent } from '../Database/utils/OlympicEvent';
import { SanitizedOlympiadEventRecord } from '../types';

import { athletesDuplicateManager } from '../Database/entities/Athlete/AthleteDuplicateMaganer';
import { sportDuplicateManager } from '../Database/entities/Sport/SportDuplicateManager';
import { resultDuplicateManager } from '../Database/entities/Result/ResultDuplicateMaganer';
import { teamDuplicateManager } from '../Database/entities/Team/TeamDuplicateManager';
import { gameDuplicateManager } from '../Database/entities/Game/GameDuplicateManager';
import { eventsDuplicateManager } from '../Database/entities/Event/EventDuplicateManager';

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
  const olympicEvents: Array<OlympicEvent> = sanitizedSCV.map(sanitizedCSVRow => {
    const rowAthlete = athletesDuplicateManager.register(sanitizedCSVRow);
    const rowEvent = eventsDuplicateManager.register(sanitizedCSVRow);
    const rowResult = resultDuplicateManager.register(sanitizedCSVRow);
    const rowSport = sportDuplicateManager.register(sanitizedCSVRow);
    const rowTeam = teamDuplicateManager.register(sanitizedCSVRow);
    const rowGame = gameDuplicateManager.register(sanitizedCSVRow);

    return new OlympicEvent(rowAthlete, rowEvent, rowResult, rowSport, rowTeam, rowGame);
  });

  return {
    olympicEvents,
    uniqueEntries: {
      athletes: athletesDuplicateManager.getUnique(),
      sports: sportDuplicateManager.getUnique(),
      events: eventsDuplicateManager.getUnique(),
      teams: teamDuplicateManager.getUnique(),
      games: gameDuplicateManager.getUnique(),
    },
  };
}
