let api

const getData = (api) =>{
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

    function countData(resp){
        const data = resp.data;
        console.log("Data length", data.length);
        console.log("data",data);
    }
    
    //Fetch gets a promis and we can status and co directly without wrapping them in a function because they are functions
    fetch(api)
    .then(status)
    .then(json)
    .then(countData)
    .catch(function(err){
        console.log(err);
    })
}

const startApp = (urlapi) =>{
    getData(urlapi);
}