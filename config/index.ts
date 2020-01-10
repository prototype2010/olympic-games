export const { DB_FILE_PATH, CSV_FILE_PATH } = require('dotenv').config({
  /* if TEST env var exists - test DB and File will be used */

  path: (() => {
    if (process.env.test) {
      return '.env.test';
    } else {
      return '.env';
    }
  })(),
}).parsed;
