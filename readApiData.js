const fs = require('fs');

//At this time, i'm practicing with a certain API hence my variable will be restricted to the API format

const baseApi = "https://questions.aloc.ng/api/"; //Basic API URL
let yearApi; //year attached to api to get the right question
let subjectAPi; //subject attached to api to get the right question
let questions =[];//Store questions

//Question years

const startYear = 2001;
const endYear = 2013;

