const fs = require('fs'), path = require('path');
module.exports = class PathUtil{
    static walkDir(dir, callback) {
        try{
            fs.readdirSync(dir).forEach( f => {
                let dirPath = path.join(dir, f);
                let isDirectory = fs.statSync(dirPath).isDirectory();
                isDirectory ? 
                  this.walkDir(dirPath, callback) : callback(path.join(dir, f));
              });
        } catch (e){
            console.error(`Error reading dir: ${e}`);
        }
        
    };
    static filesInDir(dir){
        let res = [];
        this.walkDir(dir, o => res.push(o));
        return res;
    }
    static isDir(path){
        return fs.lstatSync(path).isDirectory();
    }
}
