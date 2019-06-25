// const fs = require('fs');
//At this time, i'm practicing with a certain API hence my variable will be restricted to the API format

const baseApi = "https://questions.aloc.ng/api/"; //Basic API URL
// let yearApi; //year attached to api to get the right question
// let subjectAPi; //subject attached to api to get the right question
let questions =[];//Store questions

//Question years

const startYear = 2001;
const endYear = 2013;
const subjects = [
    "english",
    "mathematics",
    "commerce",
    "accounting",
    "biology",
    "physics",
    "chemistry",
    "englishlit",
    "government",
    "crk",
    "geography",
    "economics",
    "irk",
    "civiledu",
    "insurance",
    "currentaffairs",
    "history"
];

// eg
// "Subjects": {
    // "0": "english",English language
    // "1": "mathematics",Mathematics
    // "2": "commerce",Commerce
    // "3": "accounting",Accounting
    // "4": "biology",Biology
    // "5": "physics",Physics
    // "6": "chemistry",Chemistry
    // "7": "englishlit",English literature
    // "8": "government",Government
    // "9": "crk",Christian Religious Knowledge
    // "10": "geography",Geography
    // "11": "economics",Economics
    // "12": "irk",Islamic Religious Knowledge
    // "13": "civiledu",Civic Education
    // "14": "insurance",Insurance
    // "15": "currentaffairs",Current Affairs
    // "16": "history",History
// }

//Check if a question was pushed in from this API call
let questionWasPushed = false;
let apiExhausted = false; //Monitor API has been exhausted
const numVerifyQuestionWasPushed = 3; //No of times to check as to verify if all has been added.
let counterNumVerifyQuestionWasPushed; //count No of times to check as to verify if all has been added

//Question class
class Question{
    constructor({id, question, option, section, image, answer, solution, examType, examYear}, subject){
        this.id = id;
        this.question = question;
        this.option = option;
        this.section = section;
        this.image = image;
        this.answer = answer;
        this.solution = solution;
        this.examType = examType;
        this.examYear = examYear;
        this.subject = subject;
    }
}


const getQuestionFromURL = (url, subject) =>{
    function status(response){
        if(response.status >= 200 && response.status < 300){
            return Promise.resolve(response)
        }
        else{
            return Promise.reject(new Error(response.statusText))
        }
    }

    function json(resp){
        resp = resp.json();
        console.log("JSON", resp);
        return resp;
    }
    
    //Fetch gets a promis and we can status and co directly without wrapping them in a function because they are functions
    fetch(url, {mode: 'cors'})
    .then(status)
    .then(json)
    .then(function(resp){
        getQuestions(resp, subject);
    })
    .catch(function(err){
        console.log(err);
    })
}

const createQuestionsURLApi = (subject, year) =>{
    //an example of what the API looks like https://questions.aloc.ng/api/m?subject=chemistry&year=2010
    return baseApi + "m?subject=" + subject + "&year=" + year;
}

//Check the type of data set returned
const checkTypeOfData = (data) => {
    if(data){
       if(Array.isArray(data)){
            return 'array';
        } else {
            return 'object';
        } 
    } else{
        return 'Empty data';
    }
}

const emptyData = () =>{
    console.log('No questions');
    questionWasPushed = false; //hence no question was pushed
}

const confirmQuestion = (thisQuestion) =>{
    let confirmIfQuestionExist = false;
    confirmIfQuestionExist = questions.some(question =>{
        return (question.id === thisQuestion.id);
    });

    if(confirmIfQuestionExist === false){
        questions.push(thisQuestion);
        questionWasPushed = true; //hence a question was pushed
    }
}

const getQuestions = (resp, subject) =>{
    const questionSet = resp.data
    // data = new Question(data);
    console.log('data', questionSet);
    console.log('Data type', checkTypeOfData(questionSet));
    const questionSetStatus = checkTypeOfData(questionSet);

    if(questionSetStatus.toLowerCase() === 'array'){
        //If an array, get each question iterate. Then add them using class Question
        if (questionSet.length > 0) {
            for (const quest of questionSet) {
                const question = new Question(quest, subject);
                // confirmQuestion(question);
                questions.push(question);
            }
        } else {
            emptyData();
        }
    } else if(questionSetStatus.toLowerCase() === 'object'){
        //If object then it's just an object, just one!!!
        // confirmQuestion(questionSet);
        const question = new Question(questionSet, subject);
        // confirmQuestion(question);
        questions.push(question);
    } else{
        emptyData();
    }
}

//Using a generator function
function* subjectGenerator(){
    for(let i = 0; i < subjects.length; i++){
        const subject = subjects[i];
        let examyear =  startYear; 
        while (examyear <= endYear) {
            const api = createQuestionsURLApi(subject, examyear);
            getQuestionFromURL(api, subject);
            console.log(subject, api);
            yield examyear++;
        }
    }

    //NB: Generator functions don't work with forEach
}

const gen = subjectGenerator();

const startApp = () =>{
    //#region 
    // subjects.forEach(subject=>{
    //     questions = []; //resets value of question

    //     for (let i = startYear; i <= endYear; i++){
    //         const year = i;
    //         const api = createQuestionsURLApi(subject, year);
    //         this.subject = subject.toLowerCase();
    //         //continue till api has been exhausted
    //         // do {
    //         //     checker(api, subject);
    //         // } while (apiExhausted === false);

    //         //I removed checker because we dont need that
    //         getQuestionFromURL(api, subject);

    //         //Then we go generator mode

    //         //Then save question;
    //         // alert('ji');
    //         // console.log("all questions in " + subject, questions);
    //     }
    // });
    //#endregion

    gen.next();
    setTimeout(startApp, 1000);
}

const checker = (api, subject) =>{
    // return new Promise(function(resolve, reject) {
    //     resolve(get)
    // })
    apiExhausted = false;

    getQuestionFromURL(api, subject)
    // .then(function(){
            //no question addded? let's call again to confirm if api exhausted.
        if (questionWasPushed === false) {
            // counterNumVerifyQuestionWasPushed = 0;

            for (let i = 0; i < numVerifyQuestionWasPushed; i++) {
                //continues calling that particular API
                getQuestionFromURL(api, subject);
                if (questionWasPushed === true) {

                    //Yup, we added a question, hence api is not exhausted.
                    apiExhausted = false;
                    break;
                }

                //We did not add a question, lets assume it's true for now.
                apiExhausted = true;
            }
        }
    // }).catch(function(err){
    //     console.log('Error from checker', err);
    // })
    return apiExhausted;
}

// const hh = (api) =>{
//     for (let i = 0; i < numVerifyQuestionWasPushed; i++) {
//         if (questionWasPushed === true) {
//             break;
//         }
//         //continues calling that particular API
//         getQuestionFromURL()
//     }
// } 

const saveQuestionToJSON = () =>{
    //saveQuestionToJSON(questions, subjectAPi, yearApi)
    const data = new Object({data:questions})
    let downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.download = 'questions-export.JSON';
    // downloadLink.href = "data:text/plain;base64," + btoa(unescape(encodeURIComponent((
    //     JSON.stringify(questions,null,2) //this helps me add tab/whitespace in JSON
    // ))));
    downloadLink.href = "data:text/plain;base64," + btoa(unescape(encodeURIComponent((
        JSON.stringify(data,null,2) //this helps me add tab/whitespace in JSON
    ))));
    downloadLink.target = '_blank';
    // downloadLink.innerHTML = "download questions JSON text";
    downloadLink.click();
}


startApp();