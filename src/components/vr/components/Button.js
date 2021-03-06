import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Entity} from 'aframe-react';

class Button extends Component {
	static propTypes = {
		onClick: PropTypes.func,
		position: PropTypes.object,
		color: PropTypes.string,
		text: PropTypes.string,
		disabled: PropTypes.bool,
		width: PropTypes.number,
		height: PropTypes.number,
	};

	static defaultProps = {
		position: {x: 0, y: 0, z: 0},
		color: 'black',
		text: null,
		disabled: false,
	};

	onClick = () => {
		const {onClick, disabled} = this.props;

		if (disabled) {
			return;
		}

		onClick && onClick();
	};

	render() {
		const {position, text, width, height} = this.props;
		return (
			<Entity width={width} height={height} primitive= "a-plane"
			material="shader: flat; color: black;" events={{click: this.onClick}} position={position}>
				{text && <Entity primitive="a-text" width="1" value={text} align="center" color="white" anchor="center" baseline="center" />}
			</Entity>
		);
	}
}

export default Button;
