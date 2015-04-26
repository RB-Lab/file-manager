const React = require('react');
const moment = require('moment');
const {FontIcon} = require('material-ui');

const mdiClasses = {
	folder: 'mdi-file-folder',
	document: 'mdi-action-description',
	file: 'mdi-editor-insert-drive-file',
	casefile: 'mdi-communication-quick-contacts-mail',
	unknown: 'mdi-communication-live-help'
};
function getIconName(type){
	return (mdiClasses[type] || mdiClasses.unknown) + ' file__icon';
}

let App = React.createClass({



	render() {
		return (
			<li className="file">
				<FontIcon className={getIconName(this.props.data.type)}/>
				<span className="file__data">
					<span className="file__data-item">
						{this.props.data.title}
					</span>
					<span className="file__data-item">
						{this.props.data.status}
					</span>
					<span className="file__data-item">
						{this.props.data.type}
					</span>
					<span className="file__data-item">
						{moment(this.props.data.created).fromNow()}
					</span>
					<span className="file__data-item">
						{moment(this.props.data.modified).fromNow()}
					</span>
				</span>
			</li>
		);
	}

});

module.exports = App;
