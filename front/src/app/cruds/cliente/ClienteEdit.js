/* crud-java */
import React from 'react';
import BotaoSize from '../../../antd/BotaoSize';
import BotaoType from '../../../antd/BotaoType';
import ClienteCampos from './ClienteCampos';
import ClienteEmailEdit from '../clienteEmail/ClienteEmailEdit';
import ClienteEmailsCols from './ClienteEmailsCols';
import ClienteTelefoneEdit from '../clienteTelefone/ClienteTelefoneEdit';
import ClienteTelefonesCols from './ClienteTelefonesCols';
import FcBotao from '../../../fc/components/FcBotao';
import FormEdit from '../../../fc/components/FormEdit';
import FormItemInput from '../../../antd/form/FormItemInput';
import GroupCard from '../../../fc/components/GroupCard';
import Session from '../../estado/Session';
import Tabela from '../../../fc/components/tabela/Tabela';
import UString from '../../misc/utils/UString';
import {Col} from 'antd';
import {Row} from 'antd';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

export default class ClienteEdit extends FormEdit {

	telefonesEditCols;
	telefonesGrupoCols;
	emailsEditCols;
	emailsGrupoCols;

	init2() {
		this.telefonesEditCols = ClienteTelefonesCols.getInstance().list;
		this.telefonesGrupoCols = ClienteTelefonesCols.getInstance().grupos;
		this.emailsEditCols = ClienteEmailsCols.getInstance().list;
		this.emailsGrupoCols = ClienteEmailsCols.getInstance().grupos;
		this.init3();
	}

	constructor(props) {
		super(props);
		this.init("Cliente", ClienteCampos.getInstance());
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
				{this.grupo_geral_dadosPessoais(cps)}
				{this.grupo_geral_endereco(cps)}
				{this.grupo_geral_telefones(cps)}
				{this.grupo_geral_emails(cps)}
			</Row>
		);
	}

	inputNome() {
		return <FormItemInput bind={this.getCampos().nome} lg={16}/>;
	}

	inputCpf() {
		return <FormItemInput bind={this.getCampos().cpf} lg={8}/>;
	}

	grupo_geral_dadosPessoais(cps) {
		if (!cps.nome.isVisible() && !cps.cpf.isVisible()) {
			return null;
		}
		return (
			<Col lg={24} md={24} sm={24}>
				<GroupCard title={"Dados Pessoais"}>
					<Row gutter={24}>
						{this.inputNome()}
						{this.inputCpf()}
					</Row>
				</GroupCard>
			</Col>
		);
	}

	inputCep() {
		return <FormItemInput bind={this.getCampos().cep} lg={6}/>;
	}

	inputUf() {
		return <FormItemInput bind={this.getCampos().uf} lg={6}/>;
	}

	inputCidade() {
		return <FormItemInput bind={this.getCampos().cidade} lg={6}/>;
	}

	inputBairro() {
		return <FormItemInput bind={this.getCampos().bairro} lg={6}/>;
	}

	inputLogradouro() {
		return <FormItemInput bind={this.getCampos().logradouro} lg={12}/>;
	}

	inputComplemento() {
		return <FormItemInput bind={this.getCampos().complemento} lg={12}/>;
	}

	grupo_geral_endereco(cps) {
		if (!cps.cep.isVisible() && !cps.uf.isVisible() && !cps.cidade.isVisible() && !cps.bairro.isVisible() && !cps.logradouro.isVisible() && !cps.complemento.isVisible()) {
			return null;
		}
		return (
			<Col lg={24} md={24} sm={24}>
				<GroupCard title={"Endereço"}>
					<Row gutter={24}>
						{this.inputCep()}
						{this.inputUf()}
						{this.inputCidade()}
						{this.inputBairro()}
					</Row>
					<Row gutter={24}>
						{this.inputLogradouro()}
						{this.inputComplemento()}
					</Row>
				</GroupCard>
			</Col>
		);
	}

	botaoNovoTelefones() {
		if (Session.canInsert("ClienteTelefone")) {
			return <FcBotao title={"+ Novo"} type={BotaoType.normal} size={BotaoSize.small} onClick={() => this.getCampos().telefonesNovo()}/>;
		} else {
			return null;
		}
	}

	onDeleteTelefones() {
		if (Session.canDelete("ClienteTelefone")) {
			return o => {
				o.setExcluido(true);
				this.getCampos().telefones.notifyObservers();
			};
		} else {
			return null;
		}
	}

	grupo_geral_telefones(cps) {
		if (!cps.telefones.isVisible()) {
			return null;
		}
		return (
			<Col lg={24} md={24} sm={24}>
				<GroupCard title={"Telefones"} extra={this.botaoNovoTelefones()}>
					<Row gutter={24}>
						<Tabela
						bind={cps.telefones}
						onClick={o => cps.telefonesEdit(o)}
						onDelete={this.onDeleteTelefones()}
						colunas={this.telefonesEditCols}
						colunasGrupo={this.telefonesGrupoCols}
						/>
					</Row>
				</GroupCard>
			</Col>
		);
	}

	botaoNovoEmails() {
		if (Session.canInsert("ClienteEmail")) {
			return <FcBotao title={"+ Novo"} type={BotaoType.normal} size={BotaoSize.small} onClick={() => this.getCampos().emailsNovo()}/>;
		} else {
			return null;
		}
	}

	onDeleteEmails() {
		if (Session.canDelete("ClienteEmail")) {
			return o => {
				o.setExcluido(true);
				this.getCampos().emails.notifyObservers();
			};
		} else {
			return null;
		}
	}

	grupo_geral_emails(cps) {
		if (!cps.emails.isVisible()) {
			return null;
		}
		return (
			<Col lg={24} md={24} sm={24}>
				<GroupCard title={"Emails"} extra={this.botaoNovoEmails()}>
					<Row gutter={24}>
						<Tabela
						bind={cps.emails}
						onClick={o => cps.emailsEdit(o)}
						onDelete={this.onDeleteEmails()}
						colunas={this.emailsEditCols}
						colunasGrupo={this.emailsGrupoCols}
						/>
					</Row>
				</GroupCard>
			</Col>
		);
	}

	getTitleImpl() {
		return "Cliente";
	}

	getModal() {
		const cps = this.getCampos();
		if (cps.telefones.isTrue()) {
			return (
				<ClienteTelefoneEdit
				vinculo={cps.telefones}
				somenteUpdate={false}
				isModal={true}
				/>
			);
		}
		if (cps.emails.isTrue()) {
			return (
				<ClienteEmailEdit
				vinculo={cps.emails}
				somenteUpdate={false}
				isModal={true}
				/>
			);
		}
		throw new Error("???");
	}

	getCampos() {
		return super.getCampos();
	}

	init3() {}
	setWidthForm = o => this.setState({widthForm:o});
	setAbaSelecionada = o => this.setState({abaSelecionada:o});
}

ClienteEdit.defaultProps = FormEdit.defaultProps;
