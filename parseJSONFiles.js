// helps from
//     https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
//     https://stackoverflow.com/questions/31274329/get-list-of-filenames-in-folder-with-javascript
// 'use strict';

var fs = require('fs');
var path = require('path');
const parentPath = 'questions-Copy';
var files = fs.readdirSync(parentPath);
let questionSet = new Set();
let questions = [];

files.forEach(file => {
    // const dir = path.format({
    //     dir: parentPath,
    //     base: file
    // });
    const dir = "./" + parentPath + "/" + file;
    // // console.log(dir);
    // const data = fs.readFileSync(dir);
    // const jsonFile = JSON.parse(data);
    // console.log(jsonFile);
    // // yield;
    // // console.log([data]);
    // // data.forEach(d=>console.log('d', d));
    // // let dataFile = require(dir);
    // // console.log(dataFile.data[0].length);
    // // console.log(dataFile);
    // // let stringData = JSON.stringify(dataFile);
    // // console.log(stringData);

    fs.readFile(dir, function (err, data) {
        if (data) {
            // console.log("Read JSON file: " + data);
            // data = data.trim();
            //or data = JSON.parse(JSON.stringify(data.trim()));
            // const [values] = data.data; 
            const dataFile = require(dir);
            const values = dataFile.data;
            addQuestions(values);
            // storage = JSON.parse(data);
            // console.log(values.data.length);
            // console.log(dir, typeof(storage));
            console.log(questions.length);
        }
    });
});

function addQuestions(fileArray){
    fileQuestions = fileArray;
    fileQuestions.forEach(fileQuestion => {
        questions.push(fileQuestion);
    });
    getUniqueQuestions();
}

function getUniqueQuestions(){
    questions.forEach(question => questionSet.add(question));
    console.log(questionSet.length);
}