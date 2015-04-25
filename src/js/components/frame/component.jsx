const React = require('react');
const Store = require('./store');
const FilesList = require('components/files-list/component.jsx');


let App = React.createClass({

	getInitialState() {
		return {};
	},

	onChange_() {
		this.setState(this._getState());
	},


	componentDidMount() {
		Store.addChangeListener(this.onChange_);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this.onChange_);
	},

	render() {
		return (
			<div id="frame">
				<FilesList />
			</div>
		);
	}

});

module.exports = App;
