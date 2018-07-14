const parseString = require('xml2js').parseString;
const fs = require('fs');
const path = require('path');

const args = process.argv.splice(2)

let filename = path.basename(`./src/originalData/${args[0]}`, '.xml');

let sumind = 0;
const JSONResult = {};

const readFile = async (path) => new Promise((res, rej) => {
    fs.readFile(path, 'utf-8', function (err, fr) {
        if (err) {
            rej(err);
        } else {
            res(fr)
        }
    });
});

const xmlToJSON = async (xmldata) => new Promise((res, rej) => {
    parseString(xmldata, function(err, json) {
        if(err){
            rej(err)
        } else {
            res(json)
        }
    })
})

const opreationJSON = (topic, nodeId) => {
    var node = {};
    for (let i = 0; i < topic.length; i++) {
        const element = topic[i];
        node.message = element.title[0].split('&&');
        node.options = [];
        const subTopic = element.children[0].topics[0].topic;
        if (
            element.children[0]&&
            element.children[0].topics[0]&&
            element.children[0].topics[0].topic
        ) {
            for (let n = 0; n < subTopic.length; n++) {
                const subElement = subTopic[n];
                node.options.push({
                    text: subElement.title[0],
                    next: `Qid_${nodeId}_${n}`
                })
                if (
                    subElement.children[0]&&
                    subElement.children[0].topics[0]&&
                    subElement.children[0].topics[0].topic
                ) {
                    opreationJSON(subElement.children[0].topics[0].topic, `${nodeId}_${n}`);
                }
            }
        }
    }
    JSONResult[nodeId === 0 ? 'entry' : `Qid_${nodeId}`] = node;
    sumind++;
}

const getData = async () => {
    const xmldata = await readFile(`./src/originalData/${args[0]}`);
    const data = await xmlToJSON(xmldata);
    const loopData = data['xmap-content'].sheet[0].topic;
    opreationJSON(loopData, sumind);
    fs.appendFile(
        `./src/exportData/${filename}.json`, 
        JSON.stringify(JSONResult), 
        function (err) {
            if (err) throw err;
            console.log('JSON Saved!');
        });
}

getData();
