const esprima = require('esprima');
const fs = require("fs");

class Parsed {
    /**
     * 
     * @param {string} file 
     * @param {*} tokens 
     * @param {esprima.Program} parsed 
     */
    constructor(file, tokens, parsed){
        this.file = file;
        this.tokens = tokens;
        this.parsed = parsed;
    }
    toString(){
        return `ParsedObject[file=${this.file}, parsed=${this.parsed}]`;
    }
}
module.exports = class Parser{
    static parse(file, data){
        try{
            return new Parsed(file, esprima.tokenize(data), esprima.parseScript(data));    
        } catch (e){
            console.log("Error in file: " + file + " " + e);
            console.log(data);
        }
    }
    static parseFile(file){
        let data = fs.readFileSync(file,  "utf8");
        return this.parse(file, data);
        
    }
};