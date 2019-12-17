import {IndexedObject, RawCSVRecord, SanitizedCSVRecord} from "../types";
import {SanitizeConfig} from "../../config";

export class SanitizeExecutor {

    static sanitizeArray(csvRowsArray : Array<RawCSVRecord> = [], sanitizeConfig : SanitizeConfig ) {

        return  csvRowsArray.map(csvRow =>  {

            return Object.entries(csvRow).reduce((cumulative,current) => {

                const [key, value] = current;

                const executableConfig = SanitizeExecutor.readConfigByPropName(key, sanitizeConfig);

                return {
                    ...cumulative,
                    [key] : SanitizeExecutor.proceedExecutableConfig(value,executableConfig!) as any,
                }

            }, (<SanitizedCSVRecord> {}));

            });
    }

    static readConfigByPropName (propName : string,sanitizeConfig : IndexedObject) : Array<Array<any>> | undefined  {

        if(propName in sanitizeConfig ) {
            return sanitizeConfig[propName];
        } else {
            console.error(`There are no rules for ${propName} in ${sanitizeConfig}`);
        }
    }

    static proceedExecutableConfig(value : any, executableConfig : Array<Array<any>>) {

        return executableConfig.reduce((cummulative, current) => {

            const [executableFunction,...args] = current;

            return executableFunction(value,...args);

        }, value)

    }

}