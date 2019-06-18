const fs = require('fs');

//At this time, i'm practicing with a certain API hence my variable will be restricted to the API format

const baseApi = "https://questions.aloc.ng/api/"; //Basic API URL
let yearApi; //year attached to api to get the right question
let subjectAPi; //subject attached to api to get the right question
let questions =[];//Store questions

//Question years

const startYear = 2001;
const endYear = 2013;

const getQuestionFromURL = (url) =>{
    function status(response){
        if(response.status >= 200 || response.status < 300){
            return Promise.resolve(response);
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }

    function json(resp){
        resp = resp.json();
        console.log("JSON", resp);
        return resp;
    }
    
    //Fetch gets a promis and we can status and co directly without wrapping them in a function because they are functions
    fetch(url)
    .then(status)
    .then(json)
    .catch(function(err){
        console.log(err);
    })
}