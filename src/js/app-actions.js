const AppDispatcher = require('app-dispatcher');
const serverStorage = require('lib/server-storage');
const DEFAULT_FOLDER = require('constants/app-constants').DEFAULT_FOLDER;
const FilesListConstants = require('components/files-list/constants');
const FrameConstants = require('components/frame/constants');

function fetchFolderContent(folder){
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
}

function fetchFolderPath(folder){
	serverStorage.get('/path-to-folder/' + folder)
		.then((res) => {
			AppDispatcher.handleServerAction({
				type: FrameConstants.FOLDER_PATH_ARRIVED,
				data: res
			});
		})
		.catch((err) => {
			// TODO what to do if we got error?
		});
}
module.exports = {
	openFolder(folder){
		folder = folder || DEFAULT_FOLDER;
		fetchFolderContent(folder);
		fetchFolderPath(folder);
	}
};
