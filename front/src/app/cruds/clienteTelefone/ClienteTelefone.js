/* crud-java */
import EntityFront from '../../../fc/components/EntityFront';
import UBoolean from '../../misc/utils/UBoolean';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class ClienteTelefone extends EntityFront {

	original;
	cliente = null;
	tipo = null;
	numero = null;
	excluido = false;
	registroBloqueado = false;
	setId(value) {
		super.setId(value);
	}
	getText() {
		return this.getNumero();
	}
	asString() {
		let s = "{";
		s += "\"id\":"+this.getId()+",";
		if (UCommons.notEmpty(this.tipo)) {
			s += "\"tipo\":{\"id\":"+this.tipo.id+"},";
		}
		if (UCommons.notEmpty(this.numero)) {
			s += "\"numero\":\""+UString.mantemSomenteNumeros(this.numero)+"\",";
		}
		s += "\"excluido\":"+UBoolean.isTrue(this.excluido)+",";
		s += "}";
		return s;
	}
	getOriginal() {
		return this.original;
	}
	setOriginal(value) {
		this.original = value;
	}
	getCliente() {
		return this.cliente;
	}
	setCliente(value) {
		this.cliente = value;
	}
	getTipo() {
		return this.tipo;
	}
	setTipo(value) {
		this.tipo = value;
	}
	getNumero() {
		return this.numero;
	}
	setNumero(value) {
		this.numero = value;
	}
	getExcluido() {
		return this.excluido;
	}
	setExcluido(value) {
		this.excluido = value;
	}
	getRegistroBloqueado() {
		return this.registroBloqueado;
	}
	setRegistroBloqueado(value) {
		this.registroBloqueado = value;
	}
}
