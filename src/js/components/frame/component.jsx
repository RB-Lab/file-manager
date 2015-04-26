const React = require('react');
const Store = require('./store');
const Actions = require('./actions');
const FilesList = require('components/files-list/component.jsx');
const {Toolbar, ToolbarGroup, RaisedButton, TextField} = require('material-ui');


let App = React.createClass({

	getInitialState() {
		return Store.getState();
	},

	onChange_() {
		this.setState(Store.getState());
	},

	onInput_(e){
		Actions.filterFiles(e.currentTarget.value);
	},

	componentDidMount() {
		this.changeFolder_();
		Store.addChangeListener(this.onChange_);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this.onChange_);
	},

	changeFolder_(id){
		Actions.fetchFolderContent(id);
		Actions.fetchFolderPath(id);
	},

	renderFolder_(folder, index){
		var label = folder.title, disabled = true;
		if(index < this.state.currentPath.length - 1) {
			label += ' >';
			disabled = false;
		}
		return(
			<span className="toolbar__follder-button">
				<RaisedButton
					label={label}
					disabled={disabled}
					onClick={this.changeFolder_.bind(this, folder.id)}/>
			</span>
		);
	},

	render() {
		return (
			<section id="frame">
				<Toolbar>
					<ToolbarGroup key={0} float="left">
						<span className="toolbar__folder-pane">
							{this.state.currentPath.map(this.renderFolder_)}
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
