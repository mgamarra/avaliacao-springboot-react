/* crud-java */
import Binding from '../../campos/support/Binding';
import EntityCampos from '../../../fc/components/EntityCampos';
import Sessao from '../../../projeto/Sessao';
import TipoDeTelefoneUtils from './TipoDeTelefoneUtils';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class TipoDeTelefoneCampos extends EntityCampos {

	nome;
	original;
	to;

	getEntidade() {
		return "TipoDeTelefone";
	}

	getEntidadePath() {
		return "tipo-de-telefone";
	}

	initImpl() {
		this.nome = this.newString("Nome", 11, true, "Geral");
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
		this.to = TipoDeTelefoneUtils.getInstance().clonar(o);
		this.id.clear();
		this.id.set(this.to.getId());
		this.nome.set(this.to.getNome());
		this.excluido.set(this.to.getExcluido());
		this.registroBloqueado.set(this.to.getRegistroBloqueado());
		this.id.setStartValue(this.to.getId());
		this.nome.setStartValue(this.nome.get());
		this.excluido.setStartValue(this.excluido.get());
		this.registroBloqueado.setStartValue(this.registroBloqueado.get());
		let readOnly = this.isReadOnly();
		this.nome.setDisabled(readOnly);
		this.setCampos2(o);
		this.reiniciar();
	}

	setCampos2(o) {}

	getTo() {
		this.checkInstance();
		this.to.setId(this.id.get());
		this.to.setNome(this.nome.get());
		this.to.setExcluido(this.excluido.get());
		this.to.setRegistroBloqueado(this.registroBloqueado.get());
		return this.to;
	}

	setJson(obj) {
		this.checkInstance();
		let json = obj;
		let o = TipoDeTelefoneUtils.getInstance().fromJson(json);
		this.setCampos(o);
		return o;
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
		return !TipoDeTelefoneUtils.getInstance().equals(this.original, this.getTo());
	}

	camposAlterados() {
		return TipoDeTelefoneUtils.getInstance().camposAlterados(this.original, this.getTo());
	}

	cancelarAlteracoes() {
		this.setCampos(this.original);
	}

	getOriginal() {
		return this.original;
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
		let message = "Campo inválido: " + key;
		throw new Error(message);
	}

	init2() {}

	checkInstance() {
		Sessao.checkInstance("TipoDeTelefoneCampos", this);
	}
	static getInstance() {
		return Sessao.getInstance("TipoDeTelefoneCampos", () => new TipoDeTelefoneCampos(), o => o.init());
	}
}
