import {CSVValue, Medal, RawCSVRecord, SanitizedCSVRecord} from "../types";

export class CSVSanitizer {

    static sanitizeArray(csvRowsArray : Array<RawCSVRecord> = []) {

        return  csvRowsArray.map(csvRow => CSVSanitizer.sanitize(csvRow));
    }

    static sanitize(csvRow : RawCSVRecord) : SanitizedCSVRecord {

        const {Age,City,Event,Games,Height,ID,Medal,Name,NOC,Season,Sex,Sport,Team,Weight,Year} = csvRow;
        const {parseInt,sanitizeFullName,sanitizeMedal,sanitizeSex,sanitizeTeamName, sanitizeAsString} = CSVSanitizer;

        return {
            age : parseInt(Age),
            city: sanitizeAsString(City),
            event: sanitizeAsString(Event),
            games: sanitizeAsString(Games),
            height: parseInt(Height),
            id: parseInt(ID),
            medal : sanitizeMedal(Medal),
            name: sanitizeFullName(Name),
            NOC: sanitizeAsString(NOC),
            season: sanitizeAsString(Season),
            sex: sanitizeSex(Sex),
            sport: sanitizeAsString(Sport),
            team: sanitizeTeamName(Team),
            weight: parseInt(Weight),
            year: parseInt(Year),
        }
    }

    private static sanitizeAsString(value : any) {
        return typeof value === 'string' ? value : String(value);
    }

    private static sanitizeFullName(value : CSVValue) {

        const sanitizedAsString = CSVSanitizer.sanitizeAsString(value);
        const noRoundBrackets = sanitizedAsString.replace(/\(.*\)/, () => '' );
        return noRoundBrackets.replace(/"/, () => '' );
    }

    private static sanitizeSex(value : CSVValue) {

        const sanitizedString = CSVSanitizer.sanitizeAsString(value);

        return  sanitizedString ? sanitizedString : null;
    }

    private static parseInt(value : CSVValue) {
        const parsed = Number.parseInt(<string>value);

        if(!Number.isNaN(parsed) && Number.isFinite(parsed)) {
            return parsed;
        } else {
            return null;
        }
    }

    private static sanitizeTeamName(value : CSVValue) : string {

        const sanitizedString = CSVSanitizer.sanitizeAsString(value);

        const noLastDigits = sanitizedString.replace(/\d+$/, () => '');
        return noLastDigits.replace(/-$/,() => '');
    }

    private static sanitizeMedal(value : CSVValue) {
        const sanitizedString = CSVSanitizer.sanitizeAsString(value);

        if([Medal.Bronze,Medal.Silver,Medal.Gold].includes(<Medal>sanitizedString)) {
            return sanitizedString;
        } else {
            return Medal.NA
        }
    }
}