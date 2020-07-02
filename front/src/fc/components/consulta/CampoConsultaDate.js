/* front-constructor */
import React from 'react';
import BindingData from '../../../app/campos/support/BindingData';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';
import ConsultaStyles from './ConsultaStyles';
import InputBind from '../../../antd/InputBind';
import PopoverDate from '../PopoverDate';
import {Fragment} from 'react';

export default class CampoConsultaDate extends CampoConsulta {

	a = new BindingData("");
	b = new BindingData("");

	constructor(nomeCampoP, titulo, notNull) {
		super(nomeCampoP, titulo, CampoConsultaDate.OPERADORES_POSSIVEIS, notNull);
	}

	bindInicial() {
		return this.a;
	}

	bindFinal() {
		return this.b;
	}

	clearB() {
		this.bindFinal().clear();
	}

	getOperadoresSemBinding() {
		return [ConsultaOperadorConstantes.HOJE];
	}

	render0() {
		return (
			<Fragment>
				<td style={ConsultaStyles.COL_D}>{this.inputa()}</td>
				<td style={ConsultaStyles.COL_E}/>
				<td style={ConsultaStyles.COL_F}/>
			</Fragment>
		);
	}

	input(o) {
		let bind = o;
		return (
			<InputBind
				bind={bind}
				after={<PopoverDate bind={bind}/>}
				style={CampoConsulta.MARGIN_TOP_0.join(CampoConsulta.FONT_STYLE)}
			/>
		);
	}

	valorInicialMaiorQueValorFinal() {
		return this.a.maiorQue(this.b);
	}

}
CampoConsultaDate.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.IGUAL
	, ConsultaOperadorConstantes.HOJE
	, ConsultaOperadorConstantes.MAIOR_OU_IGUAL
	, ConsultaOperadorConstantes.MENOR_OU_IGUAL
	, ConsultaOperadorConstantes.ENTRE
	, ConsultaOperadorConstantes.VAZIOS
	, ConsultaOperadorConstantes.DESMEMBRAR
];
