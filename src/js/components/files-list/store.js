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
var currentFilter = '';

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
			return a[field] > b[field] ? 1 : -1;
		} else {
			return a[field] < b[field] ? 1 : -1;
		}
	});
}

var FilesListStore = assign({}, EventEmitter.prototype, {

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
		if(!currentFilter) return files;
		return files.filter((file) => {
			return file.title.search(new RegExp(currentFilter, 'i')) >= 0;
		});
	},

	getSortingSettings(){
		return currentSort;
	},

	getFilterSettings(){
		return currentFilter;
	}
});

AppDispatcher.register((payload) => {
	switch(payload.action.type){
		case Constants.FOLDER_CONTENT_ARRIVED:
			setFiles(payload.action.data);
			FilesListStore.emitChange();
			break;
		case Constants.SORT_FILES:
			sortFiles(payload.action.data);
			FilesListStore.emitChange();
			break;
		case Constants.FILTER_FILES:
			currentFilter = payload.action.data;
			FilesListStore.emitChange();
			break;
	}
});

module.exports = FilesListStore;
