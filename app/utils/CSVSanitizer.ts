import {IndexedObject, Nullable,} from "../types";

export class CSVSanitizer {

    static sanitizeAsString(value : any) {
        return typeof value === 'string' ? value : String(value);
    }

    static parseInt(value : any) {
        const parsed = Number.parseInt(<string>value);

        if(!Number.isNaN(parsed) && Number.isFinite(parsed)) {
            return parsed;
        } else {
            return null;
        }
    }

    static sanitizeFromEnum(value : any, enumArray : Array<IndexedObject>) : Nullable<string> {

        const [enumObject] = enumArray;

        if(Object.values(enumObject).includes(String(value))) {
            return value;
        } else {
            return null;
        }
    }

    static clearByRegexp(value : string, regexps : RegExp[]) {
        return  regexps.reduce((cumulative, current) => {
            return cumulative.replace(current, () => '');
        }, value);
    }
}