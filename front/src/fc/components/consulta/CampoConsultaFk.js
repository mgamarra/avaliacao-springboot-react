/* front-constructor */
import React from 'react';
import BindingArray from '../../../app/campos/support/BindingArray';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';
import HttpMethod from '../../../projeto/HttpMethod';
import SelectMultipleBind from '../../../antd/SelectMultipleBind';
import UCommons from '../../../app/misc/utils/UCommons';
import UInteger from '../../../app/misc/utils/UInteger';

export default class CampoConsultaFk extends CampoConsulta {

	a = new BindingArray("");

	uri;
	chamada = 0;

	constructor(nomeCampoP, titulo, uri, notNull) {
		super(nomeCampoP, titulo, CampoConsultaFk.OPERDORES_POSSIVEIS, notNull);
		this.uri = uri + "/consulta-select";
	}

	bindInicial() {
		return this.a;
	}

	input(o) {
		return <SelectMultipleBind bind={this.a} onSearch={s => this.search(s)}/>;
	}

	search(filtro) {
		this.a.setItens(CampoConsultaFk.ITENS_CLEAM);
		const cham = ++this.chamada;
		if (UCommons.isEmpty(filtro)) {
			return;
		}
		setTimeout(() => {
			if (UInteger.equals(this.chamada, cham)) {
				const params = {};
				params.text = filtro;
				params.ignorar = this.a.get();
				HttpMethod.post(this.uri, params, res => {
					let resultadoConsulta = res.body;
					this.a.setItens(resultadoConsulta.dados);
				}).run();
			}
		}, 250);
	}

	toStringBind(bind) {
		return this.a.get().map(o => o.id).join(",");
	}

}
CampoConsultaFk.OPERDORES_POSSIVEIS = [
	ConsultaOperadorConstantes.EM
];
CampoConsultaFk.ITENS_CLEAM = [];
