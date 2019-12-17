import { Medal, Nullable, RawCSVRecord, SanitizedCSVRecord, Season, Sex} from "../types";

export class CSVSanitizer {

    static sanitizeArray(csvRowsArray : Array<RawCSVRecord> = []) {
        return  csvRowsArray.map(csvRow => CSVSanitizer.sanitize(csvRow));
    }

    static sanitize(csvRow : RawCSVRecord) : SanitizedCSVRecord {

        const {year,weight,team,sport,sex,season,noc,name,medal,id,height,games,event,city,age} = csvRow;
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

        const sanitizedAsString =<Season> CSVSanitizer.sanitizeAsString(value);

        if([Season.WINTER,Season.SUMMER].includes(sanitizedAsString)) {
            return value;
        } else {
            return null;
        }
    }

    private static sanitizeFullName(value : any) {

        const sanitizedAsString = CSVSanitizer.sanitizeAsString(value);
        const noRoundBrackets = sanitizedAsString.replace(/\(.*\)/, () => '' );
        return noRoundBrackets.replace(/"/, () => '' );
    }

    private static sanitizeSex(value : any) : Nullable<Sex> {

        const sanitizedString =<Sex> CSVSanitizer.sanitizeAsString(value);

        if([Sex.F,Sex.M].includes(sanitizedString)){
            return sanitizedString;
        } else {
            return null;
        }
    }

    private static parseInt(value : any) {
        const parsed = Number.parseInt(<string>value);

        if(!Number.isNaN(parsed) && Number.isFinite(parsed)) {
            return parsed;
        } else {
            return null;
        }
    }

    private static sanitizeTeamName(value : any) : string {

        const sanitizedString = CSVSanitizer.sanitizeAsString(value);

        const noLastDigits = sanitizedString.replace(/\d+$/, () => '');
        return noLastDigits.replace(/-$/,() => '');
    }

    private static sanitizeMedal(value : any) {
        const sanitizedString = CSVSanitizer.sanitizeAsString(value);

        if([Medal.Bronze,Medal.Silver,Medal.Gold].includes(<Medal>sanitizedString)) {
            return sanitizedString as Medal;
        } else {
            return Medal.NA
        }
    }
}