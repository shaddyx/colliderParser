const yargsLib = require('yargs')
let argv = yargsLib.command("parse [path]", "parse the path", (yargs) => {
    yargs.positional("path", {
        describe: "Path to search js files"
    });
}).argv
module.exports = argv;
