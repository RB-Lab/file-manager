const React = require('react');
const Store = require('./store');
const Actions = require('./actions');
const FilesList = require('components/files-list/component.jsx');
const {Toolbar, ToolbarGroup, RaisedButton, TextField} = require('material-ui');


let App = React.createClass({

	getInitialState() {
		return {};
	},

	onChange_() {
		this.setState(this._getState());
	},

	onInput_(e){
		Actions.filterFiles(e.currentTarget.value);
	},

	componentDidMount() {
		Store.addChangeListener(this.onChange_);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this.onChange_);
	},

	render() {
		return (
			<section id="frame">
				<Toolbar>
					<ToolbarGroup key={0} float="left">
						<span className="toolbar__folder-pane">
							<span className="toolbar__follder-button"><RaisedButton label="folder a >"/></span>
							<span className="toolbar__follder-button"><RaisedButton label="folder b >"/></span>
							<span className="toolbar__follder-button"><RaisedButton label="folder c"/></span>
						</span>
					</ToolbarGroup>
					<ToolbarGroup key={1} float="right">
						<span className="toolbar__search-pane">
							<TextField hintText='Filter files' onInput={this.onInput_} />
						</span>
					</ToolbarGroup>
				</Toolbar>
				<FilesList />
			</section>
		);
	}

});

module.exports = App;
