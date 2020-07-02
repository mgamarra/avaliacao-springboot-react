/* react-web-antd */
import React from 'react';
import Color from '../app/misc/consts/fixeds/Color';
import Style from '../app/misc/utils/Style';
import SuperComponent from '../app/misc/components/SuperComponent';
import UCommons from '../app/misc/utils/UCommons';
import UInteger from '../app/misc/utils/UInteger';
import UString from '../app/misc/utils/UString';
import {Select} from 'antd';
import {Tag} from 'antd';
const SelectOption = Select.Option;

export default class SelectMultipleBind extends SuperComponent {

	static STYLE_DEFAULT = Style.create();

	render() {

		let value = this.props.bind.get().map(o => o.text);
		let options = this.props.bind.getItensNaoSelecionados().map(o => o.text);

		return (
			<Select
				mode={"multiple"}
				placeholder={this.props.placeholder}
				value={value}
				onChange={values => this.setValues(values)}
				tagRender={o => this.renderTag(o)}
				style={SelectMultipleBind.STYLE_DEFAULT.join(this.props.style).get()}
				onSearch={this.props.onSearch}>
				{options.map(o => <SelectOption key={UString.toString(o)} value={o}>{o}</SelectOption>)}
			</Select>
		);
	}

	setValues(values) {
		let array = values.map(o => this.getIdText(o));
		array.sort((a,b) => UInteger.compare(a.id, b.id));
		this.props.bind.set(array);
	}

	getIdText(s) {
		let o = this.props.bind.getItens().unique(x => UString.equals(x.text, s));
		if (UCommons.notEmpty(o)) {
			return o;
		} else {
			return this.props.bind.get().uniqueObrig(x => UString.equals(x.text, s));
		}
	}

	renderTag(o) {
		if (UCommons.isEmpty(this.props.tagRender)) {
			return (
				<Tag color={Color.lime} closable={true}/>
			);
		} else {
			return this.props.tagRender(this.getIdText(o));
		}
	}

	componentDidMount() {
		this.observar(this.props.bind);
	}
}

SelectMultipleBind.defaultProps = SuperComponent.defaultProps;
