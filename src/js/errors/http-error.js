function HTTPError(status, message) {
	if (!(this instanceof HTTPError)) {
		return new HTTPError(status, arguments);
	}
	this.stack = new Error().stack;
	this.status = status;
	this.message = message;
	this.toString = function () {
		return 'HTTPError: ' + status + ' ' + this.message;
	};
}

HTTPError.prototype = Object.create(Error.prototype);

module.exports = HTTPError;
