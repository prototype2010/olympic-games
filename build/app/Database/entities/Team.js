'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('../../types');
const Model_1 = require('../utils/Model');
class Team extends Model_1.Model {
  constructor({ team, noc }) {
    super();
    this.name = team;
    this.NOCName = noc;
  }
  write() {
    const { name, NOCName } = this;
    return super.insertToDB(Team.TABLE_NAME, {
      name,
      noc_name: NOCName,
    });
  }
}
exports.Team = Team;
Team.TABLE_NAME = types_1.Table.TEAMS;
//# sourceMappingURL=Team.js.map
