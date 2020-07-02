/* crud-java */
import React from 'react';
import Afters from '../../../antd/form/Afters';
import ClienteEmailCampos from './ClienteEmailCampos';
import FormEdit from '../../../fc/components/FormEdit';
import FormItemInput from '../../../antd/form/FormItemInput';
import LayoutApp from '../../../fc/components/LayoutApp';
import UString from '../../misc/utils/UString';
import {Card} from 'antd';
import {Col} from 'antd';
import {Row} from 'antd';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

export default class ClienteEmailEdit extends FormEdit {

	init2() {
		this.init3();
	}

	constructor(props) {
		super(props);
		this.init("ClienteEmail", ClienteEmailCampos.getInstance());
	}

	getTabs() {
		return (
			<Tabs
			tabPosition={"top"}
			activeKey={this.state.abaSelecionada}
			defaultActiveKey={"Geral"}
			onChange={s => this.setAbaSelecionada(s)}>
				<TabPane key={"Geral"} tab={"Geral"}>
					{this.abaGeral()}
				</TabPane>
			</Tabs>
		);
	}

	abaGeral() {
		if (!UString.equals(this.state.abaSelecionada, "Geral")) {
			return null;
		}
		const cps = this.getCampos();
		return (
			<Row gutter={24}>
				{this.grupo_geral_0(cps)}
			</Row>
		);
	}

	inputCliente() {
		return <FormItemInput bind={this.getCampos().cliente} lg={12}/>;
	}

	inputEmail() {
		return <FormItemInput after={Afters.getEmail()} bind={this.getCampos().email} lg={12}/>;
	}

	grupo_geral_0(cps) {
		if (!cps.cliente.isVisible() && !cps.email.isVisible()) {
			return null;
		}
		return (
			<Col lg={24} md={24} sm={24}>
				<Card size={"small"} style={LayoutApp.EMPTY.get()}>
					<Row gutter={24}>
						{this.inputCliente()}
						{this.inputEmail()}
					</Row>
				</Card>
			</Col>
		);
	}

	getTitleImpl() {
		return "Cliente E-mail";
	}

	getModal() {
		throw new Error("???");
	}

	getCampos() {
		return super.getCampos();
	}

	init3() {}
	setWidthForm = o => this.setState({widthForm:o});
	setAbaSelecionada = o => this.setState({abaSelecionada:o});
}

ClienteEmailEdit.defaultProps = FormEdit.defaultProps;
