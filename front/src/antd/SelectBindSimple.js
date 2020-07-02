/* react-web-antd */
import React from 'react';
import Color from '../app/misc/consts/fixeds/Color';
import Console from '../app/misc/utils/Console';
import InputBind from './InputBind';
import Style from '../app/misc/utils/Style';
import SuperComponent from '../app/misc/components/SuperComponent';
import UCommons from '../app/misc/utils/UCommons';
import UString from '../app/misc/utils/UString';
import {Select} from 'antd';
const SelectOption = Select.Option;

export default class SelectBindSimple extends SuperComponent {

	static STYLE_DEFAULT = Style.create().marginTop(0);

	render() {

		if (this.props.bind.isDisabled()) {
			return (
				<InputBind
					bind={this.props.bind}
					style={SelectBindSimple.STYLE_DEFAULT.join(this.props.style).backgroundColor(Color.white)}
				/>
			);
		}

		let options = this.props.bind.getItens().filter(o => UCommons.notEquals(o, this.props.bind.get())).map(o => o.text);
		return (
			<Select
				placeholder={this.props.bind.getPlaceHolder()}
				value={this.props.bind.asString()}
				onChange={o => this.props.bind.set(this.getIdText(o))}
				style={SelectBindSimple.STYLE_DEFAULT.join(this.props.style).get()}
				disabled={this.props.bind.isDisabled()}>
				{options.map(o => <SelectOption key={UString.toString(o)} value={o}>{o}</SelectOption>)}
			</Select>
		);
	}

	getIdText(s) {
		if (typeof(s) === "string") {
			return this.props.bind.getItens().uniqueObrig(x => UString.equals(x.text, s));
		} else {
			Console.log("SelectBindSimple", s);
			throw new Error("? " + typeof(s));
		}
	}

	componentDidMount() {
		this.observar(this.props.bind);
	}
}

SelectBindSimple.defaultProps = SuperComponent.defaultProps;
