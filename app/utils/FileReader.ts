import {readFileSync} from 'fs';

export class FileReader {

    static read(filePath:string) {
        try {
            return FileReader.getFileContent(filePath);
        } catch (e) {
            console.error(`Failed to parse CSV file by path ${filePath}`,e)
        }
    }

    private static getFileContent(filePath: string) {
        return readFileSync(filePath,'utf8');
    }
}