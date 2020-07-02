/* crud-java */
import Binding from '../../campos/support/Binding';
import BindingCep from '../../infra/outros/BindingCep';
import BindingNome from '../../infra/outros/BindingNome';
import ClienteConsulta from './ClienteConsulta';
import ClienteEmail from '../clienteEmail/ClienteEmail';
import ClienteEmailCampos from '../clienteEmail/ClienteEmailCampos';
import ClienteEmailUtils from '../clienteEmail/ClienteEmailUtils';
import ClienteTelefone from '../clienteTelefone/ClienteTelefone';
import ClienteTelefoneCampos from '../clienteTelefone/ClienteTelefoneCampos';
import ClienteTelefoneUtils from '../clienteTelefone/ClienteTelefoneUtils';
import ClienteUtils from './ClienteUtils';
import EntityCampos from '../../../fc/components/EntityCampos';
import HttpMethod from '../../../projeto/HttpMethod';
import Sessao from '../../../projeto/Sessao';
import UCep from '../../misc/utils/UCep';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class ClienteCampos extends EntityCampos {

	nome;
	cpf;
	cep;
	uf;
	cidade;
	bairro;
	logradouro;
	complemento;
	telefones;
	emails;
	original;
	to;

	getEntidade() {
		return "Cliente";
	}

	getEntidadePath() {
		return "clientes";
	}

	initImpl() {
		this.nome = this.add(new BindingNome(), true, "Geral");
		this.cpf = this.newCpf("CPF", true, "Geral");
		this.cep = this.add(new BindingCep(), true, "Geral");
		this.uf = this.newString("UF", 50, false, "Geral").setDisabled(true);
		this.cidade = this.newString("Cidade", 50, false, "Geral").setDisabled(true);
		this.bairro = this.newString("Bairro", 50, false, "Geral").setDisabled(true);
		this.logradouro = this.newString("Logradouro", 50, false, "Geral").setDisabled(true);
		this.complemento = this.newString("Complemento", 50, false, "Geral");
		this.telefones = this.newSubList(
			"Telefones", "telefones"
			, (de, para) => ClienteTelefoneUtils.getInstance().merge(de, para)
			, obj => {
				let array = obj;
				this.original.setTelefones([]);
				array.forEach(json => this.original.getTelefones().add(ClienteTelefoneUtils.getInstance().fromJson(json)));
				this.setTelefones();
				if (UCommons.notEmpty(this.original.getOriginal())) {
					this.original.getOriginal().setTelefones(ClienteTelefoneUtils.getInstance().clonarList(this.original.getTelefones()));
				}
			}
			, false, "Geral", false
		);
		this.emails = this.newSubList(
			"Emails", "emails"
			, (de, para) => ClienteEmailUtils.getInstance().merge(de, para)
			, obj => {
				let array = obj;
				this.original.setEmails([]);
				array.forEach(json => this.original.getEmails().add(ClienteEmailUtils.getInstance().fromJson(json)));
				this.setEmails();
				if (UCommons.notEmpty(this.original.getOriginal())) {
					this.original.getOriginal().setEmails(ClienteEmailUtils.getInstance().clonarList(this.original.getEmails()));
				}
			}
			, false, "Geral", false
		);
		this.telefones.setOnConfirm(() => {
			this.telefones.add(ClienteTelefoneCampos.getInstance().getTo());
			this.refreshTelefonesHouveMudancas();
		});
		this.telefones.setOnClear(() => {
			this.telefones.remove(ClienteTelefoneCampos.getInstance().getTo());
			this.refreshTelefonesHouveMudancas();
		});
		this.emails.setOnConfirm(() => {
			this.emails.add(ClienteEmailCampos.getInstance().getTo());
			this.refreshEmailsHouveMudancas();
		});
		this.emails.setOnClear(() => {
			this.emails.remove(ClienteEmailCampos.getInstance().getTo());
			this.refreshEmailsHouveMudancas();
		});
		this.cep.addFunctionObserver(() => {
			if (this.cep.isVirgin()) {
				return;
			}
			if (UString.equals(this.cep.get(), this.cep.getOld())) {
				return;
			}
			this.uf.clear();
			this.cidade.clear();
			this.bairro.clear();
			this.logradouro.clear();
			if (UCep.isValid(this.cep.get())) {
				HttpMethod.get("cep/" + UString.mantemSomenteNumeros(this.cep.get()), null, res => {
					let result = res.body;
					this.uf.set(result.uf);
					this.cidade.set(result.localidade);
					this.bairro.set(result.bairro);
					this.logradouro.set(result.logradouro);
				}).run();
			}
		});
		this.telefones.funcGetInvalidMessage = () => {
			if (this.telefones.getItens().filter(o => !o.excluido).isEmpty()) {
				return "Pelo menos um telefone deve ser cadastrado";
			} else {
				return null;
			}
		};
		this.emails.funcGetInvalidMessage = () => {
			if (this.emails.getItens().filter(o => !o.excluido).isEmpty()) {
				return "Pelo menos um e-mails deve ser cadastrado";
			} else {
				return null;
			}
		};
		this.construido = true;
	}

	setCampos(o) {
		if (UCommons.isEmpty(o)) {
			throw new Error("o === null");
		}
		this.checkInstance();
		Binding.notificacoesDesligadasInc();
		this.disabledObservers = true;
		this.original = o;
		this.to = ClienteUtils.getInstance().clonar(o);
		this.id.clear();
		this.id.set(this.to.getId());
		this.nome.set(this.to.getNome());
		this.cpf.set(this.to.getCpf());
		this.cep.set(this.to.getCep());
		this.uf.set(this.to.getUf());
		this.cidade.set(this.to.getCidade());
		this.bairro.set(this.to.getBairro());
		this.logradouro.set(this.to.getLogradouro());
		this.complemento.set(this.to.getComplemento());
		this.excluido.set(this.to.getExcluido());
		this.registroBloqueado.set(this.to.getRegistroBloqueado());
		this.id.setStartValue(this.to.getId());
		this.nome.setStartValue(this.nome.get());
		this.cpf.setStartValue(this.cpf.get());
		this.cep.setStartValue(this.cep.get());
		this.uf.setStartValue(this.uf.get());
		this.cidade.setStartValue(this.cidade.get());
		this.bairro.setStartValue(this.bairro.get());
		this.logradouro.setStartValue(this.logradouro.get());
		this.complemento.setStartValue(this.complemento.get());
		this.telefones.setStartValue(this.telefones.get());
		this.emails.setStartValue(this.emails.get());
		this.excluido.setStartValue(this.excluido.get());
		this.registroBloqueado.setStartValue(this.registroBloqueado.get());
		this.setTelefones();
		this.setEmails();
		let readOnly = this.isReadOnly();
		this.nome.setDisabled(readOnly);
		this.cpf.setDisabled(readOnly);
		this.cep.setDisabled(readOnly);
		this.complemento.setDisabled(readOnly);
		this.telefones.setDisabled(readOnly);
		this.emails.setDisabled(readOnly);
		this.setCampos2(o);
		this.reiniciar();
	}

	setTelefones() {
		if (UCommons.isEmpty(this.original.getTelefones())) {
			this.telefones.clearItens();
		} else {
			this.telefones.clearItens2();
			let readOnly = this.isReadOnly();
			this.original.getTelefones().forEach(item => {
				let o = ClienteTelefoneUtils.getInstance().clonar(item);
				if (readOnly) o.setRegistroBloqueado(true);
				this.telefones.add(o);
			});
		}
	}

	setEmails() {
		if (UCommons.isEmpty(this.original.getEmails())) {
			this.emails.clearItens();
		} else {
			this.emails.clearItens2();
			let readOnly = this.isReadOnly();
			this.original.getEmails().forEach(item => {
				let o = ClienteEmailUtils.getInstance().clonar(item);
				if (readOnly) o.setRegistroBloqueado(true);
				this.emails.add(o);
			});
		}
	}

	setCampos2(o) {}

	getTo() {
		this.checkInstance();
		this.to.setId(this.id.get());
		this.to.setNome(this.nome.get());
		this.to.setCpf(this.cpf.get());
		this.to.setCep(this.cep.get());
		this.to.setUf(this.uf.get());
		this.to.setCidade(this.cidade.get());
		this.to.setBairro(this.bairro.get());
		this.to.setLogradouro(this.logradouro.get());
		this.to.setComplemento(this.complemento.get());
		this.to.setExcluido(this.excluido.get());
		this.to.setRegistroBloqueado(this.registroBloqueado.get());
		this.to.setTelefones(this.telefones.getItens());
		this.to.setEmails(this.emails.getItens());
		return this.to;
	}

	setJson(obj) {
		this.checkInstance();
		let json = obj;
		let o = ClienteUtils.getInstance().fromJson(json);
		this.setCampos(o);
		let itensGrid = ClienteConsulta.getInstance().getDataSource();
		if (UCommons.notEmpty(itensGrid)) {
			let itemGrid = itensGrid.byId(o.getId());
			if (UCommons.notEmpty(itemGrid)) {
				ClienteUtils.getInstance().merge(o, itemGrid);
			}
		}
		return o;
	}

	refreshTelefonesHouveMudancas() {
		this.to.setTelefonesHouveMudancas(!ClienteTelefoneUtils.getInstance().equalsList(this.telefones.getItens(), this.original.getTelefones()));
		if (this.to.getTelefonesHouveMudancas()) {
			this.telefones.getItens().forEach(o => {
				let ori = this.original.getTelefones().byId(o.getId());
				o.setHouveMudancas(!ClienteTelefoneUtils.getInstance().equals(o, ori));
			});
		}
	}

	refreshEmailsHouveMudancas() {
		this.to.setEmailsHouveMudancas(!ClienteEmailUtils.getInstance().equalsList(this.emails.getItens(), this.original.getEmails()));
		if (this.to.getEmailsHouveMudancas()) {
			this.emails.getItens().forEach(o => {
				let ori = this.original.getEmails().byId(o.getId());
				o.setHouveMudancas(!ClienteEmailUtils.getInstance().equals(o, ori));
			});
		}
	}

	static getText(o) {
		if (UCommons.isEmpty(o)) {
			return null;
		}
		return o.getNome();
	}

	houveMudancas() {
		if (UCommons.isEmpty(this.original)) {
			return false;
		}
		return !ClienteUtils.getInstance().equals(this.original, this.getTo());
	}

	camposAlterados() {
		return ClienteUtils.getInstance().camposAlterados(this.original, this.getTo());
	}

	cancelarAlteracoes() {
		this.setCampos(this.original);
	}

	getOriginal() {
		return this.original;
	}

	telefonesNovo() {
		let o = new ClienteTelefone();
		o.setId(--EntityCampos.novos);
		this.telefonesEdit(o);
	}

	telefonesEdit(o) {
		let cps = ClienteTelefoneCampos.getInstance();
		cps.cliente.setVisible(false);
		cps.setCampos(o);
		this.telefones.setTrue("edit");
	}

	emailsNovo() {
		let o = new ClienteEmail();
		o.setId(--EntityCampos.novos);
		this.emailsEdit(o);
	}

	emailsEdit(o) {
		let cps = ClienteEmailCampos.getInstance();
		cps.cliente.setVisible(false);
		cps.setCampos(o);
		this.emails.setTrue("edit");
	}

	setAttr(key, value) {
		if (UString.equals(key, "nome")) {
			this.nome.setString(value);
			return;
		}
		if (UString.equals(key, "Nome")) {
			this.nome.setString(value);
			return;
		}
		if (UString.equals(key, "cpf")) {
			this.cpf.setString(value);
			return;
		}
		if (UString.equals(key, "CPF")) {
			this.cpf.setString(value);
			return;
		}
		if (UString.equals(key, "cep")) {
			this.cep.setString(value);
			return;
		}
		if (UString.equals(key, "Cep")) {
			this.cep.setString(value);
			return;
		}
		if (UString.equals(key, "uf")) {
			this.uf.setString(value);
			return;
		}
		if (UString.equals(key, "UF")) {
			this.uf.setString(value);
			return;
		}
		if (UString.equals(key, "cidade")) {
			this.cidade.setString(value);
			return;
		}
		if (UString.equals(key, "Cidade")) {
			this.cidade.setString(value);
			return;
		}
		if (UString.equals(key, "bairro")) {
			this.bairro.setString(value);
			return;
		}
		if (UString.equals(key, "Bairro")) {
			this.bairro.setString(value);
			return;
		}
		if (UString.equals(key, "logradouro")) {
			this.logradouro.setString(value);
			return;
		}
		if (UString.equals(key, "Logradouro")) {
			this.logradouro.setString(value);
			return;
		}
		if (UString.equals(key, "complemento")) {
			this.complemento.setString(value);
			return;
		}
		if (UString.equals(key, "Complemento")) {
			this.complemento.setString(value);
			return;
		}
		if (UString.equals(key, "telefones")) {
			this.telefones.setString(value);
			return;
		}
		if (UString.equals(key, "Telefones")) {
			this.telefones.setString(value);
			return;
		}
		if (UString.equals(key, "emails")) {
			this.emails.setString(value);
			return;
		}
		if (UString.equals(key, "Emails")) {
			this.emails.setString(value);
			return;
		}
		let message = "Campo inválido: " + key;
		throw new Error(message);
	}

	checkInstance() {
		Sessao.checkInstance("ClienteCampos", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteCampos", () => new ClienteCampos(), o => o.init());
	}

}
