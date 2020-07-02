/* crud-java */
import React from 'react';
import BindingTelefone from '../../infra/outros/BindingTelefone';
import Coluna from '../../../fc/components/tabela/Coluna';
import Sessao from '../../../projeto/Sessao';
import TextAlign from '../../misc/consts/enums/TextAlign';
import UIdText from '../../misc/utils/UIdText';
import UString from '../../misc/utils/UString';

export default class ClienteTelefonesCols {

	TIPO;
	NUMERO;
	list;
	grupos;

	init() {
		this.checkInstance();
		this.TIPO = new Coluna(300, "Tipo", o => o.getTipo(), TextAlign.left).setSort((a, b) => UIdText.compareText(a.getTipo(), b.getTipo())).setGrupo(false).setId("Cliente-TelefonesCols-tipo");
		this.NUMERO = new Coluna(18, "Número", o => o.getNumero(), TextAlign.left).setSort((a, b) => UString.compare(a.getNumero(), b.getNumero())).setGrupo(false).setId("Cliente-TelefonesCols-numero");
		this.list = [this.TIPO, this.NUMERO];
		this.grupos = [];
		this.NUMERO.setRenderItem(o => <span>{BindingTelefone.format(o.getNumero(), o.getTipo())}</span>);
	}

	checkInstance() {
		Sessao.checkInstance("ClienteTelefonesCols", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteTelefonesCols", () => new ClienteTelefonesCols(), o => o.init());
	}
}
