const React = require('react');
const Actions = require('./actions');
const Store = require('./store');
const constatns = require('./constants');
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

	sortByTitle_(){
		Actions.sortFiles(constatns.SORT_BY_TITLE);
	},

	sortByStatus_(){
		Actions.sortFiles(constatns.SORT_BY_STATUS);
	},

	sortByType_(){
		Actions.sortFiles(constatns.SORT_BY_TYPE);
	},

	sortByCreated_(){
		Actions.sortFiles(constatns.SORT_BY_CREATED);
	},

	sortByModified_(){
		Actions.sortFiles(constatns.SORT_BY_MODIFIED);
	},

	render() {
		return (
			<section classNameName="files-list">
				<header className="files-list__header">
					<ul>
						<li className="files-list__header-item" onClick={this.sortByTitle_}>title</li>
						<li className="files-list__header-item" onClick={this.sortByStatus_}>status</li>
						<li className="files-list__header-item" onClick={this.sortByType_}>type</li>
						<li className="files-list__header-item" onClick={this.sortByCreated_}>created</li>
						<li className="files-list__header-item" onClick={this.sortByModified_}>modified</li>
					</ul>
				</header>
				<ul className="files-list__list">
					{this.state.files.map(function(file){
						return (
							<File data={file}/>
						);
					})}
				</ul>
			</section>
		);
	}

});

module.exports = App;
