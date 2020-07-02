/* front-constructor */
import Binding from '../../app/campos/support/Binding';
import BindingBoolean from '../../app/campos/support/BindingBoolean';
import BindingCep from '../../app/campos/support/BindingCep';
import BindingCpf from '../../app/campos/support/BindingCpf';
import BindingData from '../../app/campos/support/BindingData';
import BindingDecimal from '../../app/campos/support/BindingDecimal';
import BindingEmail from '../../app/campos/support/BindingEmail';
import BindingFk from '../../app/campos/support/BindingFk';
import BindingId from '../../app/campos/support/BindingId';
import BindingInteger from '../../app/campos/support/BindingInteger';
import BindingList from '../../app/campos/support/BindingList';
import BindingMoney from '../../app/campos/support/BindingMoney';
import BindingNomeProprio from '../../app/campos/support/BindingNomeProprio';
import BindingSenha from '../../app/campos/support/BindingSenha';
import BindingString from '../../app/campos/support/BindingString';
import BindingSubList from './BindingSubList';
import BindingTelefone from '../../app/campos/support/BindingTelefone';
import BindingVinculado from '../../app/campos/support/BindingVinculado';
import HttpMethod from '../../projeto/HttpMethod';
import Permissao from './Permissao';
import SearchService from './SearchService';
import UCommons from '../../app/misc/utils/UCommons';
import UInteger from '../../app/misc/utils/UInteger';
import {message} from 'antd';

export default class EntityCampos extends BindingBoolean {

	listBindings;
	controleVinculado;

	id;
	excluido;
	registroBloqueado;
	nivelPermissao;

	houveAlteracoes;
	disabledObservers = false;
	construido = false;

	static novos = 0;
	afterSaveObservers = [];

	constructor() {
		super();
		this.nivelPermissao = new Permissao(this.getEntidade());
	}

	init() {
		this.listBindings = [];
		this.controleVinculado = this.newBoolean("controleVinculado", true, "Sistema").setStartValue(false);
		this.id = new BindingId("id");
		this.add(this.id, false, "Geral").setMinimo(-999999999);
		this.houveAlteracoes = BindingBoolean.novo("houveAlteracoes").setStartValue(false);
		this.excluido = this.newBoolean("Excluído", true, "Sistema").setDisabled(true);
		this.registroBloqueado = this.newBoolean("Registro Bloqueado", true, "Sistema").setDisabled(true);
		this.initImpl();

	}

	isRascunho() {
		return this.id.isEmpty() || this.id.get() < 1;
	}

	static excluir(entidadePathP, idP, onSuccess) {
		HttpMethod.delete("clientes/" + idP, null, res => {
			if (UCommons.notEmpty(onSuccess)) {
				message.info("Registro excluído com sucesso!");
				onSuccess();
			}
		}).run();
	}

	pronto() {
		return !this.disabledObservers && this.construido;
	}

	isReadOnly() {
		if (this.excluido.get() || this.registroBloqueado.get()) {
			return true;
		}
		return !this.nivelPermissao.insert() && !this.nivelPermissao.update() && !this.nivelPermissao.delete();
	}

	calcChange(bind) {
		if (this.pronto()) {
			this.houveAlteracoes.set(this.houveMudancas());
		}
	}

	reiniciar() {
		this.houveAlteracoes.set(false);
		this.disabledObservers = false;
		Binding.notificacoesDesligadasDec();
		this.listBindings.forEach(o => o.setVirgin(true));
		this.notifyObservers();
	}

	notify(o) {
		this.notifyObservers();
	}

	touch() {
		this.listBindings.forEach(campo => campo.setVirgin(false));
	}
	haImpedimentos() {
		return this.listBindings.filter(campo => !campo.isValid()).length > 0;
	}
	getErros() {
		return this.listBindings.filter(campo => !campo.isValid() && !campo.isVirgin());
	}
	getImpedimentos() {
		return this.listBindings.filter(campo => !campo.isValid()).reduce((s, campo) => s + ";" + campo.getLabel() + ":" + campo.getInvalidMessage(), "");
	}
	add(campo, notNull, aba) {
		this.listBindings.add(campo);
		campo.setNotNull(notNull);
		campo.setAtribute("aba", aba);
		campo.addObserver(this);
		campo.addFunctionTObserver(bind => this.calcChange(bind));
		return campo;
	}

	newCpf(nomeP, notNull, aba) {
		return this.add(new BindingCpf(nomeP), notNull, aba);
	}
	newData(nomeP, notNull, aba) {
		return this.add(new BindingData(nomeP), notNull, aba);
	}
	newEmail(nomeP, notNull, aba) {
		return this.add(new BindingEmail(nomeP), notNull, aba);
	}
	newImagem(nomeP, notNull, aba) {
		return this.add(new BindingString(nomeP, 100), notNull, aba);
	}
	newBoolean(nomeP, notNull, aba) {
		return this.add(BindingBoolean.novo(nomeP), notNull, aba);
	}
	newBotaoFront(nomeP, onClick) {
		let o = BindingBoolean.novo(nomeP);
		o.setNotNull(false);
		o.setStartValue(false);
		o.addFunctionObserver(onClick);
		return o;
	}
	newBotao(nomeP, nomeMetodo, callBack) {
		let o = BindingBoolean.novo(nomeP);
		o.setNotNull(false);
		o.setStartValue(false);
		o.addFunctionObserver(() => {
			HttpMethod.post(this.getEntidadePath() + "/" + nomeMetodo, this.id.get(), res => {
				this.setJson(res.body);
				callBack();
			}).run();
		});
		return o;
	}
	newCep(nomeP, notNull, aba) {
		return this.add(new BindingCep(nomeP), notNull, aba);
	}
	newTelefone(nomeP, notNull, aba) {
		return this.add(new BindingTelefone(nomeP), notNull, aba);
	}
	newNomeProprio(nomeP, notNull, aba) {
		return this.add(new BindingNomeProprio(nomeP), notNull, aba);
	}
	newString(nomeP, size, notNull, aba) {
		return this.add(new BindingString(nomeP, size), notNull, aba);
	}
	newSenha(nomeP, size, notNull, aba) {
		return this.add(new BindingSenha(nomeP, size, false), notNull, aba);
	}
	newVinculado(nomeP, notNull, aba) {
		let o = this.add(BindingVinculado.novo(nomeP), notNull, aba);
		o.setStartValue(false);
		o.addFunctionObserver(() => this.controleVinculado.set(o.get()));
		return o;
	}
	newDecimal(nomeP, inteiros, decimais, nullIfZeroWhenDisabled, notNull, aba) {
		return this.add(new BindingDecimal(nomeP, inteiros, decimais).setNullIfZeroWhenDisabled(nullIfZeroWhenDisabled), notNull, aba);
	}
	newMoney(nomeP, inteirosP, nullIfZeroWhenDisabled, notNull, aba) {
		return this.add(new BindingMoney(nomeP, inteirosP).setNullIfZeroWhenDisabled(nullIfZeroWhenDisabled), notNull, aba);
	}
	newInteger(nomeP, maximo, notNull, aba) {
		return this.add(new BindingInteger(nomeP, maximo), notNull, aba);
	}
	newList(nomeP, itensP, notNull, aba) {
		return this.add(new BindingList(nomeP).setItens(itensP), notNull, aba);
	}
	createSubList(titleP, nomeCampoP,mergeFunction, carragarCallBack) {
		let o = new BindingSubList(titleP, mergeFunction, carragarCallBack, this.id, this.getEntidadePath() + "/get-" + nomeCampoP);
		o.setStartValue(false);
		o.addFunctionObserver(() => this.controleVinculado.set(o.get()));
		return o;
	}
	newSubList(titleP, nomeCampoP,mergeFunction, carragarCallBack, notNull, aba, disabled) {
		let o = this.createSubList(titleP, nomeCampoP, mergeFunction, carragarCallBack);
		this.add(o, notNull, aba);
		if (disabled) {
			o.setDisabled(true);
		}
		return o;
	}
	newFk(nomeP, entidadeP, notNull, aba) {
		return this.add(new BindingFk(nomeP, new SearchService(entidadeP + "/consulta-select", null)), notNull, aba);
	}
	save(vinculo, onSuccess) {
		if (this.haImpedimentos()) {
			this.touch();
			return false;
		} else {
			if (UCommons.notEmpty(vinculo)) {
				vinculo.confirm();
				this.afterSave(onSuccess);
			} else {
				if (this.id.isEmpty()) {
					HttpMethod.post("clientes", this.getTo(), res => {
						this.setJson(res.body);
						this.afterSave(onSuccess);
					}).setOnError(m => message.error(m)).run();
				} else {
					HttpMethod.put("clientes", this.getTo(), res => {
						this.setJson(res.body);
						this.afterSave(onSuccess);
					}).setOnError(m => message.error(m)).run();
				}
			}
			return true;
		}
	}

	afterSave(onSuccess) {
		if (UCommons.notEmpty(onSuccess)) {
			onSuccess();
		}
		this.afterSaveObservers.forEach(func => func());
	}

	buscarCampoLookup(entidadePath, campo, idP, onSuccess) {
		if (UInteger.isEmptyOrZero(idP)) {
			onSuccess(null);
		} else {
			HttpMethod.post(entidadePath + "/lookup-"+campo, idP, res => {
				onSuccess(res.body);
			}).run();
		}
	}

	edit(idP, onSuccess) {
		HttpMethod.get(this.getEntidadePath() + "/" + idP, null, res => {
			let o = this.setJson(res.body);
			if (UCommons.notEmpty(onSuccess)) onSuccess(o);
		}).run();
	}

	static idNovo = 0;

	setNovo() {
		let value = --EntityCampos.idNovo;
		this.getOriginal().setId(value);
		this.id.set(value);
	}

	post(uriP, params, onSuccess) {
		HttpMethod.post(this.getEntidadePath() + "/" + uriP, params, onSuccess).run();
	}

	round(bind, decimais, nullIfZero) {
		let o = bind.toJsNumeric(decimais);
		if (nullIfZero && o.isZero()) {
			return null;
		} else {
			return o;
		}
	}
	callComando(path) {
		HttpMethod.post(this.getEntidadePath() + "/" + path, this.id.get(), res => {
			this.setJson(res.body);
		}).setOnError(m => message.error(m)).run();
	}

}
