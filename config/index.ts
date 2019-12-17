import {CSVSanitizer} from "../app/utils/CSVSanitizer";
import {Medal, Season, Sex} from "../app/types";

export const {DB_FILE_PATH,CSV_FILE_PATH} = require('dotenv').config().parsed;

export type SanitizeConfig = typeof sanitizeConfig;

export const sanitizeConfig = {
    name :  [
        [CSVSanitizer.sanitizeAsString,[]],
        [CSVSanitizer.clearByRegexp,[/\(.*\)/g,/"/g]]
    ],
    sport :  [[CSVSanitizer.sanitizeAsString,[]]],
    city :  [[CSVSanitizer.sanitizeAsString,[]]],
    noc : [[CSVSanitizer.sanitizeAsString,[]]],
    event : [[CSVSanitizer.sanitizeAsString,[]]],
    games : [[CSVSanitizer.sanitizeAsString,[]]],
    medal :  [[CSVSanitizer.sanitizeFromEnum,[Medal]]],
    season : [[CSVSanitizer.sanitizeFromEnum,[Season]]],
    sex : [[CSVSanitizer.sanitizeFromEnum,[Sex]]],
    id : [[CSVSanitizer.parseInt,[]]],
    year : [[CSVSanitizer.parseInt,[]]],
    weight : [[CSVSanitizer.parseInt,[]]],
    height :[[CSVSanitizer.parseInt,[]]],
    age : [[CSVSanitizer.parseInt,[]]],
    team : [
            [CSVSanitizer.sanitizeAsString,[]],
            [CSVSanitizer.clearByRegexp,[/\d+$/g,/-$/g]]
        ],
};