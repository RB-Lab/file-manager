const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const File = require('models/file');

const CHANGE_EVENT = 'change';

var files = [];
var currentSort = {
	field: null,
	asc: true
};

function setFiles(newFiles){
	// TODO add check if newFiles is not array - where to catch it?
	files = [];
	newFiles.forEach((file) => {
		files.push(new File(file));
	});
}

function setCurrentSort(field){
	if(currentSort.field === field){
		currentSort.asc = !currentSort.asc;
	} else {
		currentSort.field = field;
		currentSort.asc = true;
	}
}

function sortFiles(field){
	setCurrentSort(field);
	files.sort(function(a,b){
		if(currentSort.asc){
			return a[field] > b[field];
		} else {
			return a[field] < b[field];
		}
	});
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
	},

	getSortingSettings(){
		return currentSort;
	}
});

AppDispatcher.register((payload) => {
	switch(payload.action.type){
		case Constants.FOLDER_CONTENT_ARRIVED:
			setFiles(payload.action.data);
			FrameStore.emitChange();
			break;
		case Constants.SORT_FILES:
			sortFiles(payload.action.data);
			FrameStore.emitChange();
			break;
	}
});

module.exports = FrameStore;
