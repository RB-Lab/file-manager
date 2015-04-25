jest.dontMock('lib/server-storage');
jest.dontMock('global/window');
jest.dontMock('es6-promise');

const serverStorage = require('lib/server-storage');
const Promise = require('es6-promise').Promise; // jshint ignore:line
const xhr = require('xhr');
const HOST = require('constants/app-constants').API_HOST;
const HTTPError = require('errors/http-error');

function createAsyncSpies(){
	var spies = {
		flag: false,
		thenSpy: jasmine
			.createSpy('thenSpy')
			.andCallFake(() => {
				spies.flag = true;
			}),
		catchSpy: jasmine
			.createSpy('catchSpy')
			.andCallFake(() => {
				spies.flag = true;
			})
	};
	return spies;
}

function createResponce(status, message){ // mninimal responce object based on XHR API description - https://www.npmjs.com/package/xhr
	return {statusCode: status, rawRequest:{statusText: message}, headers: {}};
}

afterEach(function() {
	xhr.mockClear();
});

describe('serverStorage.get', function() {

	it('should return a Promice', function() {
		expect(serverStorage.get()).toEqual(jasmine.any(Promise));
	});

	it('should call xhr with proper URL', function(){
		serverStorage.get('/foo');
		expect(xhr).toBeCalledWith({
			uri: HOST + '/foo'
		}, jasmine.any(Function));
	});

});

describe('handling the response (by the example of GET request)', function(){

	it('should reject promice if error in browser', function(){
		var spies = createAsyncSpies();

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			xhr.mock.calls[0][1]('some error'); // xhr calls callback with some error in fitst argument
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			expect(spies.thenSpy).not.toHaveBeenCalled();
			expect(spies.catchSpy).toHaveBeenCalled();
		});
	});

	it('should reject promice with HTTPError with status code 0 if error in browser', function(){
		var spies = createAsyncSpies();

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			xhr.mock.calls[0][1]('some error');
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			var error = spies.catchSpy.mostRecentCall.args[0];
			expect(error).toEqual(jasmine.any(HTTPError));
			expect(error.status).toEqual(0);
			expect(error.message).toEqual('Request declined by browser');
		});
	});

	it('should reject promice if responce status code is 404', function(){
		var spies = createAsyncSpies();

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			xhr.mock.calls[0][1](null, createResponce(404));
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			expect(spies.thenSpy).not.toHaveBeenCalled();
			expect(spies.catchSpy).toHaveBeenCalled();
		});
	});

	it('should reject promice if responce status code is 500', function(){
		var spies = createAsyncSpies();

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			xhr.mock.calls[0][1](null, createResponce(500));
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			expect(spies.thenSpy).not.toHaveBeenCalled();
			expect(spies.catchSpy).toHaveBeenCalled();
		});
	});

	it('should reject promice with HTTPError with proper status code and message', function(){
		var spies = createAsyncSpies();

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			xhr.mock.calls[0][1](null, createResponce(401, 'Unauthorized'));
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			var error = spies.catchSpy.mostRecentCall.args[0];
			expect(error).toEqual(jasmine.any(HTTPError));
			expect(error.status).toEqual(401);
			expect(error.message).toEqual('Unauthorized');
		});
	});

	it('should resolove promise if status code is 200', function(){
		var spies = createAsyncSpies();

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			xhr.mock.calls[0][1](null, createResponce(200));
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			expect(spies.thenSpy).toHaveBeenCalled();
			expect(spies.catchSpy).not.toHaveBeenCalled();
		});
	});

	it('should provide responce body if request fullfiled', function(){
		var spies = createAsyncSpies();
		var body = 'foo bar';

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			var resp = createResponce(200);
			resp.body = body;
			xhr.mock.calls[0][1](null, resp);
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			var resp = spies.thenSpy.mostRecentCall.args[0];
			expect(resp).toEqual(body);
		});
	});

	it('shoudl parse JSON if content-type is JSON', function(){
		var spies = createAsyncSpies();
		var body = {foo: 'bar'};

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			var resp = createResponce(200);
			resp.body = JSON.stringify(body);
			resp.headers['content-type'] = 'application/json';
			xhr.mock.calls[0][1](null, resp);
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			var resp = spies.thenSpy.mostRecentCall.args[0];
			expect(resp).toEqual(body);
		});
	});

	it('should reject promice with TypeError if content-type is JSON but responce is not JSON (and message should say something about JSON)', function(){
		var spies = createAsyncSpies();
		var body = 'foo bar';

		runs(function(){
			serverStorage.get('/foo').then(spies.thenSpy).catch(spies.catchSpy);
			var resp = createResponce(200);
			resp.body = body;
			resp.headers['content-type'] = 'application/json';
			xhr.mock.calls[0][1](null, resp);
		});

		waitsFor(function(){return spies.flag;}, 'Promise should be resolved or rejected', 10);

		runs(function(){
			var error = spies.catchSpy.mostRecentCall.args[0];
			expect(error).toEqual(jasmine.any(TypeError));
			expect(error).toMatch(/JSON/i);
		});
	});

});
