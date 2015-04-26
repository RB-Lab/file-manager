const React = require('react');
const moment = require('moment');


let App = React.createClass({

	render() {
		return (
			<li className="file">
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
			</li>
		);
	}

});

module.exports = App;
