/* crud-java */
import React from 'react';
import Coluna from '../../../fc/components/tabela/Coluna';
import Sessao from '../../../projeto/Sessao';
import TextAlign from '../../misc/consts/enums/TextAlign';
import UCpf from '../../misc/utils/UCpf';
import UString from '../../misc/utils/UString';

export default class ClienteCols {

	NOME;
	CPF;
	list;
	grupos;

	init() {
		this.checkInstance();
		this.NOME = new Coluna(200, "Nome", o => o.getNome(), TextAlign.left).setSort((a, b) => UString.compare(a.getNome(), b.getNome())).setGrupo(true).setId("Cliente-Cols-nome");
		this.CPF = new Coluna(150, "CPF", o => o.getCpf(), TextAlign.center).setSort((a, b) => UString.compare(a.getCpf(), b.getCpf())).setGrupo(true).setId("Cliente-Cols-cpf");
		this.CPF.renderItem = o => <span>{UCpf.format(o.getCpf())}</span>;
		this.list = [this.NOME, this.CPF];
		this.grupos = [new Coluna(350, "Dados Pessoais", null, TextAlign.center).setCols(2).setId("cliente-dados-pessoais")];
		this.init2();
	}

	init2() {}

	checkInstance() {
		Sessao.checkInstance("ClienteCols", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteCols", () => new ClienteCols(), o => o.init());
	}
}
