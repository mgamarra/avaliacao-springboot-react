/* crud-java */
import Binding from '../../campos/support/Binding';
import ClienteEmailConsulta from './ClienteEmailConsulta';
import ClienteEmailUtils from './ClienteEmailUtils';
import EntityCampos from '../../../fc/components/EntityCampos';
import Sessao from '../../../projeto/Sessao';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class ClienteEmailCampos extends EntityCampos {

	cliente;
	email;
	original;
	to;

	getEntidade() {
		return "ClienteEmail";
	}

	getEntidadePath() {
		return "cliente-e-mail";
	}

	initImpl() {
		this.cliente = this.newFk("Cliente","cliente", true, "Geral").setDisabled(true);
		this.email = this.newEmail("E-mail", true, "Geral");
		this.init2();
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
		this.to = ClienteEmailUtils.getInstance().clonar(o);
		this.id.clear();
		this.id.set(this.to.getId());
		this.cliente.setUnique(this.to.getCliente());
		this.email.set(this.to.getEmail());
		this.excluido.set(this.to.getExcluido());
		this.registroBloqueado.set(this.to.getRegistroBloqueado());
		this.id.setStartValue(this.to.getId());
		this.cliente.setStartValue(this.cliente.get());
		this.email.setStartValue(this.email.get());
		this.excluido.setStartValue(this.excluido.get());
		this.registroBloqueado.setStartValue(this.registroBloqueado.get());
		let readOnly = this.isReadOnly();
		this.email.setDisabled(readOnly);
		this.setCampos2(o);
		this.reiniciar();
	}

	setCampos2(o) {}

	getTo() {
		this.checkInstance();
		this.to.setId(this.id.get());
		this.to.setCliente(this.cliente.get());
		this.to.setEmail(this.email.get());
		this.to.setExcluido(this.excluido.get());
		this.to.setRegistroBloqueado(this.registroBloqueado.get());
		return this.to;
	}

	setJson(obj) {
		this.checkInstance();
		let json = obj;
		let o = ClienteEmailUtils.getInstance().fromJson(json);
		this.setCampos(o);
		let itensGrid = ClienteEmailConsulta.getInstance().getDataSource();
		if (UCommons.notEmpty(itensGrid)) {
			let itemGrid = itensGrid.byId(o.getId());
			if (UCommons.notEmpty(itemGrid)) {
				ClienteEmailUtils.getInstance().merge(o, itemGrid);
			}
		}
		return o;
	}

	static getText(o) {
		if (UCommons.isEmpty(o)) {
			return null;
		}
		return o.getEmail();
	}

	houveMudancas() {
		if (UCommons.isEmpty(this.original)) {
			return false;
		}
		return !ClienteEmailUtils.getInstance().equals(this.original, this.getTo());
	}

	camposAlterados() {
		return ClienteEmailUtils.getInstance().camposAlterados(this.original, this.getTo());
	}

	cancelarAlteracoes() {
		this.setCampos(this.original);
	}

	getOriginal() {
		return this.original;
	}

	setAttr(key, value) {
		if (UString.equals(key, "cliente")) {
			this.cliente.setString(value);
			return;
		}
		if (UString.equals(key, "Cliente")) {
			this.cliente.setString(value);
			return;
		}
		if (UString.equals(key, "email")) {
			this.email.setString(value);
			return;
		}
		if (UString.equals(key, "E-mail")) {
			this.email.setString(value);
			return;
		}
		let message = "Campo inválido: " + key;
		throw new Error(message);
	}

	init2() {}

	checkInstance() {
		Sessao.checkInstance("ClienteEmailCampos", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteEmailCampos", () => new ClienteEmailCampos(), o => o.init());
	}
}
