import { existsSync } from 'fs';
import { resolve } from 'path';

function resolveEnvFilePath(): string | never {
  const { NODE_ENV_FILENAME = '' } = process.env;

  const fileName = `.env${NODE_ENV_FILENAME}`;
  const filePath = resolve(__dirname, `../${fileName}`);
  if (existsSync(filePath)) {
    return filePath;
  } else {
    throw new Error(`.env[.*] file is required ${filePath}/  <-- HERE`);
  }
}

export const { DB_FILE_PATH, CSV_FILE_PATH } = require('dotenv').config({
  path: resolveEnvFilePath(),
}).parsed;
