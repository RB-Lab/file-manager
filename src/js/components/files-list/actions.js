const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const serverStorage = require('lib/server-storage');
const DEFAULT_FOLDER = require('constants/app-constants').DEFAULT_FOLDER;

module.exports = {
	fetchFolderContent(folder){

		folder = folder || DEFAULT_FOLDER;

		serverStorage.get('/folder-content/' + folder)
			.then((res) => {
				AppDispatcher.handleServerAction({
					type: Constants.FOLDER_CONTENT_ARRIVED,
					data: res.data
				});
			})
			.catch((err) => {
				// TODO what to do if we got error?
			});
	},
	sortFiles(field){
		AppDispatcher.handleViewAction({
			type: Constants.SORT_FILES,
			data: field
		});
	}
};
