import {CSVValue, Medal, RawCSVRecord, SanitizedCSVRecord} from "../../types";

class CSVSanitizer {

    static sanitizeArray(csvRowsArray : Array<RawCSVRecord> = []) {

        return  csvRowsArray.map(csvRow => this.sanitize(csvRow));
    }

    static sanitize(csvRow : RawCSVRecord) : SanitizedCSVRecord {

        const {Age,City,Event,Games,Height,ID,Medal,Name,NOC,Season,Sex,Sport,Team,Weight,Year} = csvRow;


        // return {
        //     age :
        //
        //
        // }

    }

    static sanitizeFullName(value : CSVValue) {
        const noRoundBrackets = (<string>value).replace(/\(.*,.*\)/, () => '' );
        const noDoubleQuotes = noRoundBrackets.replace(/"/, () => '' );

        return noDoubleQuotes;
    }

    static sanitizeSex(value : CSVValue) {
        return value ? value : null;
    }

    static sanitizeYear(value : CSVValue) {
        return this.parseInt(value);
    }

    static sanitizeHeight(value : CSVValue) {
        return this.parseInt(value);
    }

    static sanitizeWeight(value: CSVValue) {
        return this.parseInt(value);
    }


    static parseInt(value : CSVValue) {

        const parsed = Number.parseInt(<string>value);

        if(!Number.isNaN(parsed) && Number.isFinite(parsed)) {
            return parsed;
        } else {
            return null;
        }
    }

    static sanitizeTeamName(value : CSVValue) {
        const noLastDigits = (<string> value).replace(/\d+$/, () => '');
        const noDash = noLastDigits.replace(/-$/,() => '');

        return noDash;
    }

    static sanitizeMedal(value : CSVValue) {
        if(Object.values(Medal).includes(<Medal>value)) {
            return value
        }
    }

}