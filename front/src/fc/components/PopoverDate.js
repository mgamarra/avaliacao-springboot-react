/* front-constructor */
import React from 'react';
import moment from 'moment';
import SuperComponent from '../../app/misc/components/SuperComponent';
import UCommons from '../../app/misc/utils/UCommons';
import {Calendar} from 'antd';
import {Icon} from 'antd';
import {Popover} from 'antd';

export default class PopoverDate extends SuperComponent {

	render() {

		if (this.props.bind.isDisabled()) {
			return PopoverDate.ICON_CALENDAR;
		} else {

			let defaultValue = this.props.bind.getMoment();

			if (UCommons.isEmpty(defaultValue)) {
				defaultValue = moment();
			}

			return (
				<Popover
				mouseEnterDelay={0.5}
				placement={"bottomRight"}
				content={
					<Calendar
						fullscreen={false}
						onSelect={value => this.props.bind.setMoment(value)}
						defaultValue={defaultValue}
					/>
				}>
					{PopoverDate.ICON_CALENDAR}
				</Popover>
			);
		}

	}

	componentDidMount() {
		this.observar(this.props.bind);
	}
}
PopoverDate.ICON_CALENDAR = <Icon type={"calendar"}/>;

PopoverDate.defaultProps = SuperComponent.defaultProps;
