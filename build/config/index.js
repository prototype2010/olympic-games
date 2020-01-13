'use strict';
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = require('fs');
const path_1 = require('path');
function resolveEnvFilePath() {
  const { NODE_ENV_FILENAME = '' } = process.env;
  const fileName = `.env${NODE_ENV_FILENAME}`;
  const filePath = path_1.resolve(__dirname, `../${fileName}`);
  if (fs_1.existsSync(filePath)) {
    return filePath;
  } else {
    throw new Error(`.env[.*] file is required ${path_1.resolve(__dirname, `../`)}/  <-- HERE`);
  }
}
(_a = require('dotenv').config({
  path: resolveEnvFilePath(),
}).parsed),
  (exports.DB_FILE_PATH = _a.DB_FILE_PATH),
  (exports.CSV_FILE_PATH = _a.CSV_FILE_PATH);
//# sourceMappingURL=index.js.map
