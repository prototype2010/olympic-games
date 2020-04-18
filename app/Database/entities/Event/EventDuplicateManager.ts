import { CSVPropertyDescriptor } from '../../../CSVProcessors/PropertyDescriptor';
import { ObjectInitializer } from '../../../CSVProcessors/ObjectInitializer';
import { Event } from './Event';
import { InitializationStrategy } from '../../../CSVProcessors/InitializationStrategy';
import { DuplicateManager, OBJECT_RETURN_STRATEGY } from '../../../CSVProcessors/DuplicateManager';
import { PropertyPicker } from '../../../CSVProcessors/PropertyPicker';

const eventDescriptors = [new CSVPropertyDescriptor('event', 'event')];

export const eventsDuplicateManager = new DuplicateManager<Event>(
  eventDescriptors,
  PropertyPicker.pickArray,
  InitializationStrategy.asObject,
  ObjectInitializer.initialize,
  Event,
  OBJECT_RETURN_STRATEGY.GET_UNIQUE,
);
