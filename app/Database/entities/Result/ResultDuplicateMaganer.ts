import { CSVPropertyDescriptor } from '../../../CSVProcessors/PropertyDescriptor';
import { ObjectInitializer } from '../../../CSVProcessors/ObjectInitializer';
import { Result } from './Result';
import { InitializationStrategy } from '../../../CSVProcessors/InitializationStrategy';
import { DuplicateManager, OBJECT_RETURN_STRATEGY } from '../../../CSVProcessors/DuplicateManager';
import { PropertyPicker } from '../../../CSVProcessors/PropertyPicker';

const resultDescriptors = [new CSVPropertyDescriptor('medal', 'medal')];

export const resultDuplicateManager = new DuplicateManager<Result>(
  resultDescriptors,
  PropertyPicker.pickArray,
  InitializationStrategy.asObject,
  ObjectInitializer.initialize,
  Result,
  OBJECT_RETURN_STRATEGY.GET_NEW,
);
