/* crud-java */
import React from 'react';
import ClienteTelefoneCampos from './ClienteTelefoneCampos';
import FormEdit from '../../../fc/components/FormEdit';
import FormItemInput from '../../../antd/form/FormItemInput';
import FormItemSelect from '../../../antd/form/FormItemSelect';
import LayoutApp from '../../../fc/components/LayoutApp';
import UString from '../../misc/utils/UString';
import {Card} from 'antd';
import {Col} from 'antd';
import {Row} from 'antd';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

export default class ClienteTelefoneEdit extends FormEdit {

	init2() {
		this.init3();
	}

	constructor(props) {
		super(props);
		this.init("ClienteTelefone", ClienteTelefoneCampos.getInstance());
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
		return <FormItemInput bind={this.getCampos().cliente} lg={8}/>;
	}

	inputTipo() {
		return <FormItemSelect bind={this.getCampos().tipo} lg={8}/>;
	}

	inputNumero() {
		return <FormItemInput bind={this.getCampos().numero} lg={8}/>;
	}

	grupo_geral_0(cps) {
		if (!cps.cliente.isVisible() && !cps.tipo.isVisible() && !cps.numero.isVisible()) {
			return null;
		}
		return (
			<Col lg={24} md={24} sm={24}>
				<Card size={"small"} style={LayoutApp.EMPTY.get()}>
					<Row gutter={24}>
						{this.inputCliente()}
						{this.inputTipo()}
						{this.inputNumero()}
					</Row>
				</Card>
			</Col>
		);
	}

	getTitleImpl() {
		return "Cliente Telefone";
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

ClienteTelefoneEdit.defaultProps = FormEdit.defaultProps;
