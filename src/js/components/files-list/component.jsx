const React = require('react');
const Actions = require('./actions');
const Store = require('./store');
const File = require('components/file/component.jsx');


let App = React.createClass({

	getInitialState() {
		return {files: Store.getFolderContent()};
	},

	onChange_() {
		this.setState({files: Store.getFolderContent()});
	},

	componentDidMount() {
		Actions.fetchFolderContent(this.props.currentFolderId);
		Store.addChangeListener(this.onChange_);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this.onChange_);
	},

	render() {
		return (
			<ul className="files-list">
				{this.state.files.map(function(file){
					return (
						<File data={file}/>
					);
				})}
			</ul>
		);
	}

});

module.exports = App;
