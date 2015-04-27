const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');

const CHANGE_EVENT = 'change';

var frameState = {
	currentPath: [],
	currentError: false
};

function setError(err){
	if(err.toString() === frameState.currentError.toString()) return false;
	frameState.currentError = err;
	return true;
}

function dismissError(err){
	if(err.toString() !== frameState.currentError.toString()) return false;
	frameState.currentError = false;
	return true;
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

	getState() {
		return frameState;
	}
});

AppDispatcher.register((payload) => {
	switch(payload.action.type){
		case Constants.FOLDER_PATH_ARRIVED:
			frameState.currentPath = payload.action.data;
			FrameStore.emitChange();
			break;
		case Constants.SET_ERROR:
			var wtf = setError(payload.action.data);
			if(wtf){
				FrameStore.emitChange();
			}
			break;
		case Constants.DISMISS_ERROR:
			if(dismissError(payload.action.data)){
				FrameStore.emitChange();
			}
			break;
	}
});

module.exports = FrameStore;
