/* crud-java */
import BindingConsultaList from '../../../fc/components/BindingConsultaList';
import ClienteUtils from './ClienteUtils';
import Consulta from '../../../fc/components/consulta/Consulta';
import Sessao from '../../../projeto/Sessao';
import UCommons from '../../misc/utils/UCommons';

export default class ClienteConsulta extends Consulta {

	dados;
	nome = this.newString("nome", "Nome", 100, true);
	cpf = this.newCpf("cpf", "CPF", true);
	cep = this.newFk("cep", "Cep", "cep", false);
	uf = this.newString("uf", "UF", 50, false);
	cidade = this.newString("cidade", "Cidade", 50, false);
	bairro = this.newString("bairro", "Bairro", 50, false);
	logradouro = this.newString("logradouro", "Logradouro", 50, false);
	complemento = this.newString("complemento", "Complemento", 50, false);

	init2() {
		this.nomeEntidade = "Cliente";
		this.dados = new BindingConsultaList(
			"dados",
			(a, b) => {},
			body => {
				let result = body;
				let array = result.dados;
				this.dados.addItens(ClienteUtils.getInstance().fromJsonList(array));
				this.refreshConsulta(result);
			},
			"clientes",
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
		Sessao.checkInstance("ClienteConsulta", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteConsulta", () => new ClienteConsulta(), o => o.init());
	}
}
