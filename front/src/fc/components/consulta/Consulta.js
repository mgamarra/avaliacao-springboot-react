/* front-constructor */
import BindingBoolean from '../../../app/campos/support/BindingBoolean';
import BindingInteger from '../../../app/campos/support/BindingInteger';
import BindingString from '../../../app/campos/support/BindingString';
import CampoConsultaBoolean from './CampoConsultaBoolean';
import CampoConsultaCpf from './CampoConsultaCpf';
import CampoConsultaDate from './CampoConsultaDate';
import CampoConsultaDecimal from './CampoConsultaDecimal';
import CampoConsultaEmail from './CampoConsultaEmail';
import CampoConsultaFk from './CampoConsultaFk';
import CampoConsultaInteger from './CampoConsultaInteger';
import CampoConsultaList from './CampoConsultaList';
import CampoConsultaMoney from './CampoConsultaMoney';
import CampoConsultaSenha from './CampoConsultaSenha';
import CampoConsultaString from './CampoConsultaString';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';
import UCommons from '../../../app/misc/utils/UCommons';
import UString from '../../../app/misc/utils/UString';
import {message} from 'antd';

export default class Consulta extends BindingBoolean {

	campos = [];

	busca = new BindingString("busca", 200);
	nomeEntidade;

	maisFiltros = false;

	pagina = new BindingInteger("Página", 9999).setMinimo(1);
	paginas = new BindingInteger("Páginas", 9999);
	registros = new BindingInteger("Registros", 9999);
	excluido;
	registroBloqueado;

	init() {
		this.excluido = this.newBoolean("excluido", "Excluído", true);
		this.excluido.setDefaultValue(ConsultaOperadorConstantes.NAO);
		this.registroBloqueado = this.newBoolean("registroBloqueado", "Registro Bloqueado", true);
		this.init2();
		this.campos.forEach(o => o.init());
	}

	refreshConsulta(resultadoConsulta) {

		if (UCommons.notEmpty(resultadoConsulta.paginas)) {
			this.paginas.set(resultadoConsulta.paginas);
			this.registros.set(resultadoConsulta.registros);
			if (this.paginas.intValue() === 0) {
				message.info("A consulta não retornou nenhum resultado!");
				this.pagina.clear();
				this.notifyObservers();
				return;
			}
		}

		this.pagina.set(resultadoConsulta.pagina);
		this.notifyObservers();
	}

	limparFiltros() {
		this.campos.forEach(o => o.clear());
	}

	changeMaisFiltros() {
		this.maisFiltros = !this.maisFiltros;
		this.notifyObservers();
	}

	isMaisFiltros() {
		return this.maisFiltros;
	}

	getBusca() {
		return this.busca;
	}

	consultar() {
		if (this.campos.exists(o => !o.isValid())) {
			message.error("Existem campos inválidos!");
			this.notifyObservers();
		} else {
			this.consultarImpl();
		}
	}

	add(campo) {
		this.campos.add(campo);
		return campo;
	}
	newString(nomeCampoP, nomeP, sizeP, notNull) {
		return this.add(new CampoConsultaString(nomeCampoP, nomeP, sizeP, notNull));
	}
	newEmail(nomeCampoP, nomeP, notNull) {
		return this.add(new CampoConsultaEmail(nomeCampoP, nomeP, notNull));
	}
	newSenha(nomeCampoP, nomeP, notNull) {
		return this.add(new CampoConsultaSenha(nomeCampoP, nomeP, notNull));
	}
	newCpf(nomeCampoP, nomeP, notNull) {
		return this.add(new CampoConsultaCpf(nomeCampoP, nomeP, notNull));
	}
	newList(nomeCampoP, nomeP, itensP, notNull) {
		return this.add(new CampoConsultaList(nomeCampoP, nomeP, itensP, notNull));
	}
	newFk(nomeCampoP, nomeP, entidadeP, notNull) {
		return this.add(new CampoConsultaFk(nomeCampoP, nomeP, entidadeP, notNull));
	}
	newData(nomeCampoP, nomeP, notNull) {
		return this.add(new CampoConsultaDate(nomeCampoP, nomeP, notNull));
	}
	newInteger(nomeCampoP, nomeP, max, notNull) {
		return this.add(new CampoConsultaInteger(nomeCampoP, nomeP, max, notNull));
	}
	newBoolean(nomeCampoP, nomeP, notNull) {
		return this.add(new CampoConsultaBoolean(nomeCampoP, nomeP, notNull));
	}
	newDecimal(nomeCampoP, nomeP, inteiros, decimais, notNull) {
		return this.add(new CampoConsultaDecimal(nomeCampoP, nomeP, inteiros, decimais, notNull));
	}
	newMoney(nomeCampoP, nomeP, inteiros, notNull) {
		return this.add(new CampoConsultaMoney(nomeCampoP, nomeP, inteiros, notNull));
	}

	toString() {

		let x = this.campos.reduce((s, o) => {

			if (o.isTodos()) {
				return s;
			}

			if (o.semBinding()) {}

			let s2 = o.toString();
			if (UString.notEmpty(s2)) {
				s += ", " + s2;
			}
			return s;

		}, "");

		let s = "{\"pagina\": " + this.pagina.get() + "";

		if (UString.notEmpty(x)) {
			s += x;
		}

		s += "}";

		s = s.replace("undefined", "null");

		return s;
	}

	priorPage() {
		if (this.pagina.intValue() < 2) {
			return;
		}
		this.pagina.set(this.pagina.get()-1);
		this.consultarImpl();
	}

	nextPage() {
		if (this.pagina.intValue() >= this.paginas.get()) {
			return;
		}
		this.pagina.set(this.pagina.get()+1);
		this.consultarImpl();
	}

	lastPage() {
		if (this.pagina.intValue() !== this.paginas.intValue()) {
			this.pagina.set(this.paginas.intValue());
			this.consultarImpl();
		}
	}

	firstPage() {
		if (this.pagina.intValue() > 1) {
			this.pagina.set(1);
			this.consultarImpl();
		}
	}

}
