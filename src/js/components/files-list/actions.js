const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');

module.exports = {
	sortFiles(field){
		AppDispatcher.handleViewAction({
			type: Constants.SORT_FILES,
			data: field
		});
	}
};
