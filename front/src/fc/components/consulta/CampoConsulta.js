/* front-constructor */
import React from 'react';
import BindingBoolean from '../../../app/campos/support/BindingBoolean';
import BindingList from '../../../app/campos/support/BindingList';
import BindingListener from '../../../app/campos/support/BindingListener';
import BindingString from '../../../app/campos/support/BindingString';
import Color from '../../../app/misc/consts/fixeds/Color';
import Console from '../../../app/misc/utils/Console';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';
import ConsultaStyles from './ConsultaStyles';
import Estilos from '../../outros/Estilos';
import InputBind from '../../../antd/InputBind';
import SelectBindSimple from '../../../antd/SelectBindSimple';
import Style from '../../../app/misc/utils/Style';
import TextAlign from '../../../app/misc/consts/enums/TextAlign';
import UCommons from '../../../app/misc/utils/UCommons';
import UString from '../../../app/misc/utils/UString';
import {CheckCircleTwoTone} from '@ant-design/icons';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {ExclamationCircleTwoTone} from '@ant-design/icons';
import {Fragment} from 'react';
import {Popover} from 'antd';

export default class CampoConsulta {

	titulo;
	visible = true;

	invalidMessage = new BindingString("", 500);
	operador = new BindingList("");
	defaultValue;
	negacao = BindingBoolean.novo("negacao");

	nomeCampo;

	constructor(nomeCampoP, tituloP, operadores, notNull) {

		this.nomeCampo = nomeCampoP;
		this.titulo = tituloP;
		operadores = operadores.copy();

		if (!notNull) {
			operadores.addIfNotContains(ConsultaOperadorConstantes.VAZIOS);
		}

		this.operador.setItens(operadores);
		this.defaultValue = operadores.get(0);
		this.operador.set(this.defaultValue);

	}

	init() {

		if (this.operador.getItens().size() === 1) {
			this.operador.setDisabled(true);
		} else {
			this.operador.addFunctionObserver(() => this.validar());
		}

		if (this.hasInicial()) {
			this.bindInicial().addFunctionObserver(() => this.validar());
			this.bindInicial().setNotNull(false);
			if (this.hasFinal()) {
				this.bindFinal().addFunctionObserver(() => this.validar());
				this.bindFinal().setNotNull(false);
			}
		}
	}

	validar() {
		this.invalidMessage.set(this.getInvalidMessage());
	}

	setVisible(value) {
		this.visible = value;
	}

	render() {

		if (!this.visible) {
			return null;
		}

		return (
			<tr style={CampoConsulta.TRS} key={this.titulo}>
				<td style={ConsultaStyles.COL_A}>
					{this.renderTitle()}
				</td>
				<td style={ConsultaStyles.COL_B}>
					<BindingListener
						itens={[this.negacao, this.operador]}
						func={() => this.iconNegacao()}
					/>
				</td>
				<td style={ConsultaStyles.COL_C}>
					{this.selectOperador()}
				</td>
				<BindingListener
					itens={[this.operador]}
					func={() => this.getConformeOperador()}
				/>
				<td style={ConsultaStyles.COL_G}>
					<BindingListener
						itens={[this.invalidMessage]}
						func={() => this.getIconValid()}
					/>
				</td>
			</tr>
		);
	}

	selectOperador() {
		return <SelectBindSimple bind={this.operador} style={CampoConsulta.FONT_STYLE}/>;
	}

	iconNegacao() {
		if (this.negacao.isTrue()) {
			return (
				<Popover
					content={<span>Afirmar / Negar</span>}>
					<ExclamationCircleTwoTone
						twoToneColor={"#eb2f96"}
						onClick={() => this.negacao.change()}
					/>
				</Popover>
			);
		} else {
			return (
				<Popover
					content={<span>Afirmar / Negar</span>}>
					<CheckCircleTwoTone
						twoToneColor={"#52c41a"}
						onClick={() => this.negacao.change()}
					/>
				</Popover>
			);
		}
	}

	getIconValid() {
		if (this.invalidMessage.isEmpty()) {
			return null;
		} else {
			return (
				<Popover content={<span>{this.invalidMessage.get()}</span>}>
					<ExclamationCircleOutlined style={Style.create().color(Color.red).get()}/>
				</Popover>
			);
		}
	}

	getInvalidMessage() {
		if (this.semBinding()) {
			return null;
		}
		if (this.getOperadoresSemBinding().contains(this.operador.get())) {
			return null;
		}
		let s = this.bindInicial().getInvalidMessage();
		if (UString.notEmpty(s)) {
			return s;
		}
		if (this.operador.eq(ConsultaOperadorConstantes.ENTRE)) {
			s = this.bindFinal().getInvalidMessage();
			if (UString.notEmpty(s)) {
				return s;
			}
			if (!this.bindInicial().isEmpty() && this.bindFinal().isEmpty()) {
				return "Preencha o valor final";
			} else if (this.bindInicial().isEmpty() && !this.bindFinal().isEmpty()) {
				return "Preencha o valor inicial";
			}
			if (this.valorInicialMaiorQueValorFinal()) {
				return "Valor inicial maior que valor final";
			}
		}
		return null;
	}

	valorInicialMaiorQueValorFinal() {
		return false;
	}

	getOperadoresSemBinding() {
		return CampoConsulta.LISTA_VAZIA;
	}

	getConformeOperador() {

		if (this.semBinding()) {
			return (
				<Fragment>
					<td style={ConsultaStyles.COL_D}/>
					<td style={ConsultaStyles.COL_E}/>
					<td style={ConsultaStyles.COL_F}/>
				</Fragment>
			);
		}

		if (this.operador.eq(ConsultaOperadorConstantes.ENTRE)) {
			return this.entre();
		}

		return this.render0();
	}

	isTodos() {
		return this.operador.eq(ConsultaOperadorConstantes.TODOS);
	}

	semBinding() {
		if (this.isTodos() || this.operador.eq(ConsultaOperadorConstantes.VAZIOS) || this.operador.eq(ConsultaOperadorConstantes.DESMEMBRAR)) {
			return true;
		}
		if (this.getOperadoresSemBinding().contains(this.operador.get())) {
			return true;
		}
		return false;
	}

	bindFinal() {
		return null;
	}

	clear() {
		if (this.hasInicial()) {
			this.bindInicial().clear();
			if (this.hasFinal()) {
				this.bindFinal().clear();
			}
		}
		this.operador.set(this.defaultValue);
		this.negacao.set(false);
	}

	hasInicial() {
		return UCommons.notEmpty(this.bindInicial());
	}

	hasFinal() {
		return UCommons.notEmpty(this.bindFinal());
	}

	clearB() {}

	render0() {
		return <td colSpan={3} style={ConsultaStyles.COL_DEF}>{this.inputa()}</td>;
	}

	entre() {
		return (
			<Fragment>
				<td style={ConsultaStyles.COL_D}>{this.inputa()}</td>
				<td style={ConsultaStyles.COL_E}><span>e</span></td>
				<td style={ConsultaStyles.COL_F}>{this.inputb()}</td>
			</Fragment>
		);
	}

	renderTitle() {
		return <span style={CampoConsulta.TABLE_STYLE}>{this.titulo}</span>;
	}

	log(s) {
		Console.log(UCommons.getClassName(this), s);
	}

	inputa() {
		return this.input(this.bindInicial());
	}

	inputb() {
		return this.input(this.bindFinal());
	}

	input(o) {
		return <InputBind bind={o} style={CampoConsulta.MARGIN_TOP_0.join(CampoConsulta.FONT_STYLE)}/>;
	}

	isValid() {
		return this.invalidMessage.isEmpty();
	}

	toString() {

		if (this.isTodos()) {
			return null;
		}

		let s = "\""+this.nomeCampo+"\": {\"operador\": " + this.operador.getId();
		s += ", \"negacao\": " + this.negacao.isTrue() + "";

		if (this.semBinding()) {
			return s + "}";
		}

		if (this.bindInicial().isEmpty()) {
			return null;
		}

		if (this.operador.eq(ConsultaOperadorConstantes.ENTRE)) {
			if (this.bindFinal().isEmpty()) {
				return null;
			}
		}

		s += ", \"a\": \"" + this.toStringBind(this.bindInicial()) + "\"";

		if (this.operador.eq(ConsultaOperadorConstantes.ENTRE)) {
			s += ", \"b\": \"" + this.toStringBind(this.bindFinal()) + "\"";
		}

		return s + "}";

	}

	toStringBind(bind) {
		return bind.asString();
	}

	setDefaultValue(value) {
		this.defaultValue = value;
		this.operador.set(value);
	}

}
CampoConsulta.TRS = Style.create().height(40).get();
CampoConsulta.fontSize = 12;
CampoConsulta.FONT_STYLE = Style.create().textAlign(TextAlign.left).fontSize(CampoConsulta.fontSize);
CampoConsulta.TABLE_STYLE = Estilos.createWidth(100).textAlign(TextAlign.left).fontSize(CampoConsulta.fontSize).get();
CampoConsulta.MARGIN_TOP_0 = Style.create().marginTop(0);
CampoConsulta.LISTA_VAZIA = [];
