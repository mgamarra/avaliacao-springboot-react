/* crud-java */
import Binding from '../../campos/support/Binding';
import BindingTelefone from '../../infra/outros/BindingTelefone';
import ClienteTelefoneConsulta from './ClienteTelefoneConsulta';
import ClienteTelefoneUtils from './ClienteTelefoneUtils';
import EntityCampos from '../../../fc/components/EntityCampos';
import Sessao from '../../../projeto/Sessao';
import TipoDeTelefoneConstantes from '../tipoDeTelefone/TipoDeTelefoneConstantes';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class ClienteTelefoneCampos extends EntityCampos {

	cliente;
	tipo;
	numero;
	original;
	to;

	getEntidade() {
		return "ClienteTelefone";
	}

	getEntidadePath() {
		return "cliente-telefone";
	}

	initImpl() {
		this.cliente = this.newFk("Cliente","cliente", true, "Geral").setDisabled(true);
		this.tipo = this.newList("Tipo", TipoDeTelefoneConstantes.getList(), true, "Geral");
		this.numero = this.add(new BindingTelefone(), true, "Geral");
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
		this.to = ClienteTelefoneUtils.getInstance().clonar(o);
		this.id.clear();
		this.id.set(this.to.getId());
		this.cliente.setUnique(this.to.getCliente());
		this.tipo.set(this.to.getTipo());
		this.numero.set(this.to.getNumero());
		this.excluido.set(this.to.getExcluido());
		this.registroBloqueado.set(this.to.getRegistroBloqueado());
		this.id.setStartValue(this.to.getId());
		this.cliente.setStartValue(this.cliente.get());
		this.tipo.setStartValue(this.tipo.get());
		this.numero.setStartValue(this.numero.get());
		this.excluido.setStartValue(this.excluido.get());
		this.registroBloqueado.setStartValue(this.registroBloqueado.get());
		let readOnly = this.isReadOnly();
		this.tipo.setDisabled(readOnly);
		this.numero.setDisabled(readOnly);
		this.setCampos2(o);
		this.reiniciar();
	}

	setCampos2(o) {}

	getTo() {
		this.checkInstance();
		this.to.setId(this.id.get());
		this.to.setCliente(this.cliente.get());
		this.to.setTipo(this.tipo.get());
		this.to.setNumero(this.numero.get());
		this.to.setExcluido(this.excluido.get());
		this.to.setRegistroBloqueado(this.registroBloqueado.get());
		return this.to;
	}

	setJson(obj) {
		this.checkInstance();
		let json = obj;
		let o = ClienteTelefoneUtils.getInstance().fromJson(json);
		this.setCampos(o);
		let itensGrid = ClienteTelefoneConsulta.getInstance().getDataSource();
		if (UCommons.notEmpty(itensGrid)) {
			let itemGrid = itensGrid.byId(o.getId());
			if (UCommons.notEmpty(itemGrid)) {
				ClienteTelefoneUtils.getInstance().merge(o, itemGrid);
			}
		}
		return o;
	}

	static getText(o) {
		if (UCommons.isEmpty(o)) {
			return null;
		}
		return o.getNumero();
	}

	houveMudancas() {
		if (UCommons.isEmpty(this.original)) {
			return false;
		}
		return !ClienteTelefoneUtils.getInstance().equals(this.original, this.getTo());
	}

	camposAlterados() {
		return ClienteTelefoneUtils.getInstance().camposAlterados(this.original, this.getTo());
	}

	cancelarAlteracoes() {
		this.setCampos(this.original);
	}

	getOriginal() {
		return this.original;
	}

	tipoResidencial() {
		return this.tipo.eq(TipoDeTelefoneConstantes.RESIDENCIAL);
	}

	tipoComercial() {
		return this.tipo.eq(TipoDeTelefoneConstantes.COMERCIAL);
	}

	tipoCelular() {
		return this.tipo.eq(TipoDeTelefoneConstantes.CELULAR);
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
		if (UString.equals(key, "tipo")) {
			this.tipo.setString(value);
			return;
		}
		if (UString.equals(key, "Tipo")) {
			this.tipo.setString(value);
			return;
		}
		if (UString.equals(key, "numero")) {
			this.numero.setString(value);
			return;
		}
		if (UString.equals(key, "Número")) {
			this.numero.setString(value);
			return;
		}
		let message = "Campo inválido: " + key;
		throw new Error(message);
	}

	init2() {}

	checkInstance() {
		Sessao.checkInstance("ClienteTelefoneCampos", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteTelefoneCampos", () => new ClienteTelefoneCampos(), o => o.init());
	}
}
