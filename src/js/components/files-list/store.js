const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');

const CHANGE_EVENT = 'change';

var files = [];

function setFiles(newFiles){
	// TODO add check if newFiles is not array - where to catch it?
	files = newFiles;
}

var FrameStore = assign({}, EventEmitter.prototype, {

	// Allow Controller-View to register itself with store
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	// triggers change listener above, firing controller-view callback
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	getFolderContent() {
		return files;
	}
});

AppDispatcher.register((payload) => {
	switch(payload.action.type){
		case Constants.FOLDER_CONTENT_ARRIVED:
			setFiles(payload.action.data);
			FrameStore.emitChange();
			break;
	}
});

module.exports = FrameStore;
