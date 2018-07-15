const fs = require('fs');
const path = require('path');
const args = process.argv.splice(2)

let filename = path.basename(`./src/originalData/${args[0]}`);
filename = filename.split('.')[0];

let sumind = 0;
const JSONResult = {};
let backId = null

const readFile = async (path) => new Promise((res, rej) => {
    fs.readFile(path, 'utf-8', function (err, fr) {
        if (err) {
            rej(err);
        } else {
            const data = fr.replace(/\\n/g, '').replace(/\（/g, '(').replace(/\）/g, ')');
            res(JSON.parse(data))
        }
    });
});

const setBasicToJSON = (data) => {
    const basic = data.root.data.note.split('&&');
    JSONResult.subject = data.root.data.text;
    JSONResult.Headlines = basic[0];
    JSONResult.describe = basic[1];
    JSONResult.coverPhoto = basic[2];
}

const setContentToJSON = (data, nodeId) => {
    const node = {};
    const nodeData = data.children;
    for (let i = 0; i < nodeData.length; i++) {
        const element = nodeData[i];
        node.message = element.data.text.split('&&');
        node.options = [];
        const subData = element.children;
        if (element.data.priority === 1) {
            backId = `Qid_${nodeId}`
        }
        for (let n = 0; n < subData.length; n++) {
            const subElement = subData[n];
            const hasNextLoop = subElement.children.length > 0;
            node.options.push({
                text: subElement.data.text,
                next: hasNextLoop ? `Qid_${nodeId}_${n}` : backId
            })
            if (hasNextLoop) {
                setContentToJSON(subElement, `${nodeId}_${n}`);
            }
        }
    }
    JSONResult[nodeId === 0 ? 'entry' : `Qid_${nodeId}`] = node;
    sumind++;
}

const getData = async () => {
    const originalData = await readFile(`./src/originalData/${args[0]}`);
    setBasicToJSON(originalData);
    const loopData = originalData.root;
    setContentToJSON(loopData, sumind);
    fs.appendFile(
        `./src/exportData/${filename}.json`, 
        JSON.stringify(JSONResult), 
        function (err) {
            if (err) throw err;
            console.log('JSON Saved!');
        });
}

getData();