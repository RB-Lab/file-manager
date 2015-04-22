const React = require('react');
const Store = require('./store');


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
			</div>
		);
	}

});

module.exports = App;
