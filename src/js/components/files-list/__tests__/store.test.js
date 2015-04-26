jest.autoMockOff(); // see http://stackoverflow.com/a/28330836/1105860 jest is so miserable ಠ_ಠ
jest.mock('app-dispatcher');
const Constants = require('../constants');
const AppConstants = require('constants/app-constants');

const actionFolderContentArrived = {
	sourse: AppConstants.ActionSources.SERVER_ACTION,
	action: {
		type: Constants.FOLDER_CONTENT_ARRIVED,
		data: [ // modified asc: [0,2,1], desc: [1,2,0]; title asc: [1,0,2], desc: [2,0,1]
		{
			'id':990,
			'type':'file',
			'title':'C',
			'status':'new',
			'created':'1429622001',
			'modified':'1429229001'
		},
		{
			'id':991,
			'type':'file',
			'title':'A',
			'status':'new',
			'created':'1429622001',
			'modified':'1429629001'
		},
		{
			'id':992,
			'type':'file',
			'title':'D',
			'status':'new',
			'created':'1429622001',
			'modified':'1429329001'
		}]
	}
};

const actionSortFilesByModified = {
	sourse: AppConstants.ActionSources.VIEW_ACTION,
	action: {
		type: Constants.SORT_FILES,
		data: 'modified'
	}
};

const actionSortFilesByTitle = {
	sourse: AppConstants.ActionSources.VIEW_ACTION,
	action: {
		type: Constants.SORT_FILES,
		data: 'title'
	}
};

var AppDispatcher, Store, callback;

beforeEach(function() {
	AppDispatcher = require('app-dispatcher');
	Store = require('../store');
	callback = AppDispatcher.register.mock.calls[0][0];
});

describe('Files list store', function(){

	it('should register a callback', function(){
		expect(AppDispatcher.register.mock.calls.length).toBe(1);
	});

	it('should be able to deliver all files', function(){
		expect(Store.getFolderContent).toBeDefined();
		expect(Store.getFolderContent).toEqual(jasmine.any(Function));
	});

	it('should init with no files', function(){
		expect(Store.getFolderContent()).toEqual(jasmine.any(Array));
		expect(Store.getFolderContent().length).toEqual(0);
	});

	it('should add files to list', function(){
		callback(actionFolderContentArrived);
		expect(Store.getFolderContent().length).toEqual(3);
		expect(Store.getFolderContent()[0].id).toEqual(990);
		expect(Store.getFolderContent()[1].id).toEqual(991);
		expect(Store.getFolderContent()[2].id).toEqual(992);
	});

	it('should sort files asc', function(){
		callback(actionFolderContentArrived);
		callback(actionSortFilesByModified);
		expect(Store.getFolderContent()[0].id).toEqual(990);
		expect(Store.getFolderContent()[1].id).toEqual(992);
		expect(Store.getFolderContent()[2].id).toEqual(991);
	});

	it('should sort files desc if sorted twice with one field', function(){
		callback(actionFolderContentArrived);
		callback(actionSortFilesByModified);
		callback(actionSortFilesByModified);
		expect(Store.getFolderContent()[0].id).toEqual(991);
		expect(Store.getFolderContent()[1].id).toEqual(992);
		expect(Store.getFolderContent()[2].id).toEqual(990);
	});

	it('should srot files asc if field changed', function(){
		callback(actionFolderContentArrived);
		callback(actionSortFilesByModified);
		callback(actionSortFilesByTitle);
		expect(Store.getFolderContent()[0].id).toEqual(991);
		expect(Store.getFolderContent()[1].id).toEqual(990);
		expect(Store.getFolderContent()[2].id).toEqual(992);
	});

});
