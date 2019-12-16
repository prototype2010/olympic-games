import {CSVValue, Medal, Nullable, RawCSVRecord, SanitizedCSVRecord, Season} from "../types";

export class CSVSanitizer {

    static sanitizeArray(csvRowsArray : Array<RawCSVRecord> = []) {
        return  csvRowsArray.map(csvRow => CSVSanitizer.sanitize(csvRow));
    }

    static sanitize(csvRow : RawCSVRecord) : SanitizedCSVRecord {

        const {age,city,event,games,height,id,medal,name,noc,season,sex,sport,team,weight,year} = csvRow;
        const {parseInt,sanitizeFullName,sanitizeMedal,sanitizeSex,sanitizeTeamName,sanitizeSeason, sanitizeAsString} = CSVSanitizer;

        return {
            age : parseInt(age),
            city: sanitizeAsString(city),
            event: sanitizeAsString(event),
            games: sanitizeAsString(games),
            height: parseInt(height),
            id: parseInt(id),
            medal : sanitizeMedal(medal),
            name: sanitizeFullName(name),
            NOC: sanitizeAsString(noc),
            season: sanitizeSeason(season),
            sex: sanitizeSex(sex),
            sport: sanitizeAsString(sport),
            team: sanitizeTeamName(team),
            weight: parseInt(weight),
            year: parseInt(year),
        }
    }

    private static sanitizeAsString(value : any) {
        return typeof value === 'string' ? value : String(value);
    }

    private static sanitizeSeason(value : any) : Nullable<Season> {

        const sanitizedAsString = CSVSanitizer.sanitizeAsString(value);

        if([Season.WINTER,Season.SUMMER].includes(<Season>sanitizedAsString)) {
            return value as Season;
        } else {
            return null;
        }
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
            return sanitizedString as Medal;
        } else {
            return Medal.NA
        }
    }
}