import { CSVPropertyDescriptor } from '../../../CSVProcessors/PropertyDescriptor';
import { ObjectInitializer } from '../../../CSVProcessors/ObjectInitializer';
import { Athlete } from './Athlete';
import { InitializationStrategy } from '../../../CSVProcessors/InitializationStrategy';
import { DuplicateManager, OBJECT_RETURN_STRATEGY } from '../../../CSVProcessors/DuplicateManager';
import { PropertyPicker } from '../../../CSVProcessors/PropertyPicker';

const athleteDescriptors = [
  new CSVPropertyDescriptor('name', 'name'),
  new CSVPropertyDescriptor('sex', 'sex'),
  new CSVPropertyDescriptor('year', 'year'),
  new CSVPropertyDescriptor('height', 'height'),
  new CSVPropertyDescriptor('weight', 'weight'),
];

export const athletesDuplicateManager = new DuplicateManager<Athlete>(
  athleteDescriptors,
  PropertyPicker.pickArray,
  InitializationStrategy.asObject,
  ObjectInitializer.initialize,
  Athlete,
  OBJECT_RETURN_STRATEGY.GET_UNIQUE,
);
