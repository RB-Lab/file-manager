const xhr = require('xhr');
const HOST = require('constants/app-constants').API_HOST;
const HTTPError = require('errors/http-error');
const Promise = require('es6-promise').Promise; // jshint ignore:line

function handleResponce(err, res, resolve, reject){

	if(err) return reject(new HTTPError(0, 'Request declined by browser'));

	if(res.statusCode >= 400) return reject(new HTTPError(res.statusCode, res.rawRequest.statusText));

	if(res.headers['content-type'] === 'application/json'){
		try{
			resolve(JSON.parse(res.body));
		} catch (e) {
			reject(new TypeError('Content-Type of the server response specified as JSON but response is not a JSON'));
		}
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
