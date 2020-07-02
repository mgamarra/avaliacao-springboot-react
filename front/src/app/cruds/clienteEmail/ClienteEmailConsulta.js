/* crud-java */
import BindingConsultaList from '../../../fc/components/BindingConsultaList';
import ClienteEmailUtils from './ClienteEmailUtils';
import Consulta from '../../../fc/components/consulta/Consulta';
import Sessao from '../../../projeto/Sessao';
import UCommons from '../../misc/utils/UCommons';

export default class ClienteEmailConsulta extends Consulta {

	dados;
	cliente = this.newFk("cliente", "Cliente", "cliente", true);
	email = this.newEmail("email", "E-mail", true);

	init2() {
		this.nomeEntidade = "ClienteEmail";
		this.dados = new BindingConsultaList(
			"dados",
			(a, b) => {},
			body => {
				let result = body;
				let array = result.dados;
				this.dados.addItens(ClienteEmailUtils.getInstance().fromJsonList(array));
				this.refreshConsulta(result);
			},
			"cliente-e-mail/consulta",
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
		Sessao.checkInstance("ClienteEmailConsulta", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteEmailConsulta", () => new ClienteEmailConsulta(), o => o.init());
	}
}
