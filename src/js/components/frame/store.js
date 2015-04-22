const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');

const CHANGE_EVENT = 'change';

var frameState = {

};

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

	}
});

module.exports = FrameStore;
