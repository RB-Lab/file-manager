const AppDispatcher = require('app-dispatcher');
const serverStorage = require('lib/server-storage');

const FilesListConstants = require('components/files-list/constants');
const FrameConstants = require('components/frame/constants');

const DEFAULT_FOLDER = require('constants/app-constants').DEFAULT_FOLDER;
const ERROR_TIMEOUT = require('constants/app-constants').ERROR_TIMEOUT;

var errorTimeout = null;
function handleHTTPError(err){

	AppDispatcher.handleServerAction({
		type: FrameConstants.SET_ERROR,
		data: err
	});

	clearTimeout(errorTimeout);
	errorTimeout = setTimeout(() => {
		AppDispatcher.handleViewAction({
			type: FrameConstants.DISMISS_ERROR,
			data: err
		});
	}, ERROR_TIMEOUT);
}

function fetchFolderContent(folder){
	serverStorage.get('/folder-content/' + folder)
		.then((res) => {
			AppDispatcher.handleServerAction({
				type: FilesListConstants.FOLDER_CONTENT_ARRIVED,
				data: res.data
			});
		})
		.catch(handleHTTPError);
}

function fetchFolderPath(folder){
	serverStorage.get('/path-to-folder/' + folder)
		.then((res) => {
			AppDispatcher.handleServerAction({
				type: FrameConstants.FOLDER_PATH_ARRIVED,
				data: res
			});
		})
		.catch(handleHTTPError);
}
module.exports = {
	openFolder(folder){
		folder = folder || DEFAULT_FOLDER;
		fetchFolderContent(folder);
		fetchFolderPath(folder);
	}
};
