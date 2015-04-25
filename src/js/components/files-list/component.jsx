const React = require('react');
const Actions = require('./actions');
const Store = require('./store');


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
						<li className="files-list__file">
							<span className="files-list__file-data-item">{file.title}</span>
							<span className="files-list__file-data-item">{file.status}</span>
							<span className="files-list__file-data-item">{file.type}</span>
							<span className="files-list__file-data-item">{file.created}</span>
							<span className="files-list__file-data-item">{file.modified}</span>
						</li>
					);
				})}
			</ul>
		);
	}

});

module.exports = App;
