import { CSVPropertyDescriptor } from '../../../CSVProcessors/PropertyDescriptor';
import { ObjectInitializer } from '../../../CSVProcessors/ObjectInitializer';
import { Game } from './Game';
import { InitializationStrategy } from '../../../CSVProcessors/InitializationStrategy';
import { DuplicateManager, OBJECT_RETURN_STRATEGY } from '../../../CSVProcessors/DuplicateManager';
import { PropertyPicker } from '../../../CSVProcessors/PropertyPicker';

const gameDescriptors = [
  new CSVPropertyDescriptor('city', 'city'),
  new CSVPropertyDescriptor('season', 'season'),
  new CSVPropertyDescriptor('year', 'year'),
];

export const gameDuplicateManager = new DuplicateManager<Game>(
  gameDescriptors,
  PropertyPicker.pickArray,
  InitializationStrategy.asObject,
  ObjectInitializer.initialize,
  Game,
  OBJECT_RETURN_STRATEGY.GET_UNIQUE,
);
