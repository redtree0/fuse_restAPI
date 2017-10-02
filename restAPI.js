var Observable = require('FuseJS/Observable');
var ROOT_URL = "https://api.example.com/v2/";

var defaultUrl = "http://192.168.0.15/myapp/"
var entryStr = Observable(defaultUrl);
var data = Observable("");

function getJsonResult(){
	console.log("result data :" + data);
	console.log("result data value:" + data.value);
	console.log("result data tostring :" + JSON.stringify(data));
	console.log("result data value tostring :" + JSON.stringify(data.value));
}

function clicked(args){
	ROOT_URL = entryStr.value;
	getArticle("");
	getJsonResult()
}

function scanStartAPI(args){
	ROOT_URL = entryStr.value;
	getArticle("scanStart");
	getJsonResult()
}

function scanStopAPI(args){
	ROOT_URL = entryStr.value;
	getArticle("scanStop");
	getJsonResult()
}

function connectAPI(args){
	ROOT_URL = entryStr.value;
	getArticle("connect");
	getJsonResult()
}

function disconnectAPI(args){
	ROOT_URL = entryStr.value;
	getArticle("disconnect");
	getJsonResult()
}


function getArticle(id) {
	return apiFetch(id);
}

function apiFetch(path, options) {
	var url = encodeURI(ROOT_URL + path);

	if(options === undefined) {
		options = {};
	}
	
	// If a body is provided, serialize it as JSON and set the Content-Type header
	if(options.body !== undefined) {
		options = Object.assign({}, options, {
			body: JSON.stringify(options.body),
			headers: Object.assign({}, options.headers, {
				"Content-Type": "application/json"
			})
		});
	}
	console.log(url);
	// Fetch the resource and parse the response as JSON
	return fetch(url, options)
		.then(function(response) { return response.json(); })
		.then(function(responseObject) { 
		 	data.replaceAll(responseObject);
		 	// console.log(responseObject);
	    })
	    .catch((err)=>{
	    	if(err){
	    		console.log(err);
	    		data.value = "error";
	    	}
	    });
}

module.exports = {
	clickHandler : clicked,
	entryStr : entryStr,
	tdata : data,
	scanStart : scanStartAPI,
	scanStop : scanStopAPI,
	connect : connectAPI,
	disconnect : disconnectAPI
	// data : JSON.stringify(data.value)
};
