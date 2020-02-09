const args = require("./args");

const path = args._[0];
const PathUtils = require("./util/pathUtils");
const parser = require("./parser");
const objectUtil = require("./util/objectUtil")


if (!path){
    console.log("File parameter required");
    process.exit(1);
}
console.log(`Scaning ${path} ${typeof path}`);
const files = PathUtils.filesInDir(path).filter(o => o.endsWith(".js"));

let result = [];
files.map(o => parser.parseFile(o)).forEach(o => {
    o.parsed.body.forEach(body => {
        let res = {
            file: o.file, 
            type: body.type, 
            name: body.id.name
        };
        result.push(res);
    })
})

let filesincluded = {};
let objectsincluded = {};
let resultScript = [];

function createObj(obj){
    let res = [];
    let objects = obj.split(".");
    for (let i=0; i<objects.length - 1; i++){
        let objPath = objectUtil.getObjectPart(objects, i + 1).join(".");
        if (!objectsincluded[objPath]){
            objectsincluded[objPath] = 1;
            if (i === 0){
                res.push(`var ${objPath} = {};`);
            } else {
                res.push(`${objPath} = {};`);
            }
        }
    }
    return res.join("\n");
}

result.forEach(o => {
    let modName = o.file.split("mod/")[1];
    if (!filesincluded[o.file]){
        resultScript.push(`/// <reference path="./mod/${modName}" />`);
        filesincluded[o.file] = 1;
    }
    let modPath = modName
        .split("../").join("")
        .split("./").join("")
        .split("/").join(".")
        .split(".").slice(0, -1).join('.');
    let objs = createObj(modPath);
    objs.length && resultScript.push(objs);
    resultScript.push(`${modPath} = ${o.name}`)
});
console.log(resultScript.join("\n"));
