/* react-web */
import React from 'react';
import CommonStyles from '../app/misc/styles/CommonStyles';
import SuperComponent from '../app/misc/components/SuperComponent';
import UString from '../app/misc/utils/UString';

export default class Tb extends SuperComponent {

	render() {

		let cssName = "tb";
		if (this.props.hover) {
			cssName += " hover";
		}

		if (UString.notEmpty(this.props.className)) {
			cssName += " " + this.props.className;
		}

		return (
			<table style={CommonStyles.W100P.join(this.props.style).get()} className={cssName} id={this.id}>
				<tbody>
					{this.props.children}
				</tbody>
			</table>
		);
	}
}

Tb.defaultProps = {
	...SuperComponent.defaultProps,
	hover: false
}
