import {RECORD_SEP, UNIT_SEP} from "papaparse";

export const {DB_FILE_PATH,CSV_FILE_PATH} = require('dotenv').config().parsed;

export const PARSE_OPTIONS = {
    delimiter: ",",
    newline: "\r\n",
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    error: undefined,
    download: false,
    downloadRequestHeaders: undefined,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', RECORD_SEP, UNIT_SEP]
};
