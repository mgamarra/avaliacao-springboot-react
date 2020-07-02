/* crud-java */
import BindingConsultaList from '../../../fc/components/BindingConsultaList';
import ClienteTelefoneUtils from './ClienteTelefoneUtils';
import Consulta from '../../../fc/components/consulta/Consulta';
import Sessao from '../../../projeto/Sessao';
import TipoDeTelefoneConstantes from '../tipoDeTelefone/TipoDeTelefoneConstantes';
import UCommons from '../../misc/utils/UCommons';

export default class ClienteTelefoneConsulta extends Consulta {

	dados;
	cliente = this.newFk("cliente", "Cliente", "cliente", true);
	tipo = this.newList("tipo", "Tipo", TipoDeTelefoneConstantes.getList(), true);
	numero = this.newString("numero", "Número", 9, true);

	init2() {
		this.nomeEntidade = "ClienteTelefone";
		this.dados = new BindingConsultaList(
			"dados",
			(a, b) => {},
			body => {
				let result = body;
				let array = result.dados;
				this.dados.addItens(ClienteTelefoneUtils.getInstance().fromJsonList(array));
				this.refreshConsulta(result);
			},
			"cliente-telefone/consulta",
			() => this
		);
	}

	consultarImpl() {
		this.dados.clearItens();
		this.dados.carregar();
	}

	getDataSource() {
		if (UCommons.isEmpty(this.dados)) {
			return [];
		} else {
			return this.dados.getItens();
		}
	}

	checkInstance() {
		Sessao.checkInstance("ClienteTelefoneConsulta", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteTelefoneConsulta", () => new ClienteTelefoneConsulta(), o => o.init());
	}
}
