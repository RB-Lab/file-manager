const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const FilesListConstants = require('components/files-list/constants');
const serverStorage = require('lib/server-storage');
const DEFAULT_FOLDER = require('constants/app-constants').DEFAULT_FOLDER;

module.exports = {
	fetchFolderContent(folder){

		folder = folder || DEFAULT_FOLDER;

		serverStorage.get('/folder-content/' + folder)
			.then((res) => {
				AppDispatcher.handleServerAction({
					type: FilesListConstants.FOLDER_CONTENT_ARRIVED,
					data: res.data
				});
			})
			.catch((err) => {
				// TODO what to do if we got error?
			});
	},
	fetchFolderPath(folder){

		folder = folder || DEFAULT_FOLDER;

		serverStorage.get('/path-to-folder/' + folder)
			.then((res) => {
				AppDispatcher.handleServerAction({
					type: Constants.FOLDER_PATH_ARRIVED,
					data: res
				});
			})
			.catch((err) => {
				// TODO what to do if we got error?
			});
	},
	filterFiles(str){
		AppDispatcher.handleViewAction({
			type: FilesListConstants.FILTER_FILES,
			data: str
		});
	}
};
