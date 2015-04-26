const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const FilesListConstants = require('components/files-list/constants');

module.exports = {
	filterFiles(str){
		AppDispatcher.handleViewAction({
			type: FilesListConstants.FILTER_FILES,
			data: str
		});
	}
};
