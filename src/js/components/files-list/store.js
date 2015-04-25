const assign = require('object-assign');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');

const CHANGE_EVENT = 'change';

var files = [];
var currentSort = {
	field: null,
	asc: true
};

function setFiles(newFiles){
	// TODO add check if newFiles is not array - where to catch it?
	files = newFiles;
}

function setCurrentSort(field){
	if(currentSort.field === field){
		currentSort.asc = !currentSort.asc;
	} else {
		currentSort.field = field;
		currentSort.asc = true;
	}
}

function findField(field){
	var map = {
		title: Constants.SORT_BY_TITLE,
		status: Constants.SORT_BY_STATUS,
		type: Constants.SORT_BY_TYPE,
		created: Constants.SORT_BY_CREATED,
		modified: Constants.SORT_BY_MODIFIED
	};
	return _.invert(map)[field];
}

function sortFiles(field){
	setCurrentSort(field);
	field = findField(field);
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
