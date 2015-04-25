const React = require('react');


let App = React.createClass({

	render() {
		return (
			<li className="file">
				<span className="file__data-item">{this.props.data.title}</span>
				<span className="file__data-item">{this.props.data.status}</span>
				<span className="file__data-item">{this.props.data.type}</span>
				<span className="file__data-item">{this.props.data.created}</span>
				<span className="file__data-item">{this.props.data.modified}</span>
			</li>
		);
	}

});

module.exports = App;
