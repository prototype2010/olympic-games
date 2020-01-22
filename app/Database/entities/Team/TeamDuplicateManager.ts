import { CSVPropertyDescriptor } from '../../../CSVProcessors/PropertyDescriptor';
import { ObjectInitializer } from '../../../CSVProcessors/ObjectInitializer';
import { Team } from './Team';
import { InitializationStrategy } from '../../../CSVProcessors/InitializationStrategy';
import { DuplicateManager, OBJECT_RETURN_STRATEGY } from '../../../CSVProcessors/DuplicateManager';
import { PropertyPicker } from '../../../CSVProcessors/PropertyPicker';

const teamDescriptors = [new CSVPropertyDescriptor('team', 'team')];

export const teamDuplicateManager = new DuplicateManager<Team>(
  teamDescriptors,
  PropertyPicker.pickArray,
  InitializationStrategy.asObject,
  ObjectInitializer.initialize,
  Team,
  OBJECT_RETURN_STRATEGY.GET_UNIQUE,
);
