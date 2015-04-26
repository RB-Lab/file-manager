const React = require('react');
const Actions = require('./actions');
const Store = require('./store');
const File = require('components/file/component.jsx');
const FileModel = require('models/file');


let App = React.createClass({

	getInitialState() {
		return {
			files: Store.getFolderContent(),
			sort: Store.getSortingSettings(),
			filter: Store.getFilterSettings()
		};
	},

	onChange_() {
		this.setState({
			files: Store.getFolderContent(),
			sort: Store.getSortingSettings(),
			filter: Store.getFilterSettings()
		});
	},

	componentDidMount() {
		Actions.fetchFolderContent(this.props.currentFolderId);
		Store.addChangeListener(this.onChange_);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this.onChange_);
	},

	sort_(field){
		Actions.sortFiles(field);
	},

	renderField(field){
		var className = 'files-list__header-item';
		if(this.state.sort.field === field){
			className += ' files-list__header-item';
			className += this.state.sort.asc ? '--sort-asc' : '--sort-desc';
		}
		return (
			<li key={field} className={className} onClick={this.sort_.bind(this, field)}>{field}</li>
		);
	},

	render() {
		return (
			<section classNameName="files-list">
				<header className="files-list__header">
					<ul>
						{FileModel.FIELDS.map(this.renderField)}
					</ul>
				</header>
				<ul className="files-list__list">
					{this.state.files.map((file) => {
						return (
							<File key={file.id} data={file} matcher={this.state.filter}/>
						);
					})}
				</ul>
			</section>
		);
	}

});

module.exports = App;
