'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const config_1 = require('../../config');
const knex_1 = __importDefault(require('knex'));
class DatabaseConnection {
  constructor() {}
  static getInstance() {
    return DatabaseConnection.instance;
  }
  static destroy() {
    return DatabaseConnection.instance.destroy();
  }
}
exports.DatabaseConnection = DatabaseConnection;
DatabaseConnection.instance = knex_1.default({
  client: 'sqlite3',
  connection: {
    filename: config_1.DB_FILE_PATH,
  },
  useNullAsDefault: true,
  pool: { min: 100, max: 200 },
});
//# sourceMappingURL=Database.js.map
