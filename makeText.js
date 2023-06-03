/** Command-line tool to generate Markov text. */

const fs = require("fs");
// const markov = require("./markov");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function exitError(msg, data, err){
    console.error(`${msg}: ${data}: ${err}`)
    process.exit(1)
}

function generateText(text){
    let mm = new markov.MarkovMachine(text)
    console.log(`\n${mm.makeText()}`)
}

// Read file & generate text
function makeText(path){
    fs.readFile(path, "utf-8", (err, data)=>{
        if(err) exitError("Connot read file", path, err)
        else generateText(data);
    });
}

async function makeURLText(url){
    let resp;

    try { resp = await axios.get(url); }
    catch (err) { exitError("Cannot read URL", path, err) }

    generateText(resp.data)
}

let [method, path] = process.argv.slice(2);

if (method === "file") makeText(path);
else if (method === "url") makeURLText(path);
else  exitError("Unknown method", path, err)