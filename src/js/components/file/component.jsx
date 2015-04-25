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
					{moment(this.props.data.created * 1000).fromNow()}
				</span>
				<span className="file__data-item">
					{moment(this.props.data.modified * 1000).fromNow()}
				</span>
			</li>
		);
		// TODO casting to std. timestamp must be in.. file model?
	}

});

module.exports = App;
