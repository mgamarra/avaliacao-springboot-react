/* front-constructor */
import React from 'react';
import BindingArray from '../../../app/campos/support/BindingArray';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';
import IdText from '../../../app/misc/utils/IdText';
import SelectMultipleBind from '../../../antd/SelectMultipleBind';

export default class CampoConsultaList extends CampoConsulta {

	a = new BindingArray("");

	constructor(nomeCampoP, titulo, itens, notNull) {
		super(nomeCampoP, titulo, CampoConsultaList.OPERADORES_POSSIVEIS, notNull);
		itens = itens.copy();
		itens.add(CampoConsultaList.VAZIOS0);
		this.a.setItens(itens);
	}

	bindInicial() {
		return this.a;
	}

	input(o) {
		return <SelectMultipleBind bind={this.a}/>;
	}

	toStringBind(bind) {
		return this.a.get().map(o => o.id).join(",");
	}

}
CampoConsultaList.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.EM
];
CampoConsultaList.VAZIOS0 = new IdText(0, "Vazios");
