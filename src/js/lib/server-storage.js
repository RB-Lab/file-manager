const xhr = require('xhr');
const HOST = require('constants/app-constants').API_HOST;
const HTTPError = require('errors/http-error');

function handleResponce(err, res, resolve, reject){

	if(err) reject(new HTTPError(0, 'Request declined by browser'));

	if(res.statusCode >= 400) reject(new HTTPError(res.statusCode, res.rawRequest.statusText));

	if(res.headers['content-type'] === 'application/json'){
		resolve(JSON.parse(res.body));
	} else {
		resolve(res.body);
	}

}

module.exports = {
	get(url){
		return new Promise((resolve, reject) => {
			xhr({uri: HOST + url}, (err, res) => handleResponce(err, res, resolve, reject));
		});
	}
};
