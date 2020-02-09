module.exports = class ObjectUtil{
    static getObjectPart(objects, numbe){
        if (typeof objects === "string"){
            objects = objects.split(".");
        }
        return objects.slice(0, numbe);
    }
    static getObjectPath(objects){
        return objects.join(".");
    }
}