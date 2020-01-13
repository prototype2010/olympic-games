'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('../../types');
const Model_1 = require('../utils/Model');
class Event extends Model_1.Model {
  constructor({ event }) {
    super();
    this.name = event;
  }
  write() {
    return super.insertToDB(Event.TABLE_NAME, {
      name: this.name,
    });
  }
}
exports.Event = Event;
Event.TABLE_NAME = types_1.Table.EVENTS;
//# sourceMappingURL=Event.js.map
