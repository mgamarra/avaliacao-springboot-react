/* crud-java */
import EntityFront from '../../../fc/components/EntityFront';
import UBoolean from '../../misc/utils/UBoolean';
import UCommons from '../../misc/utils/UCommons';

export default class ClienteEmail extends EntityFront {

	original;
	cliente = null;
	email = null;
	excluido = false;
	registroBloqueado = false;
	setId(value) {
		super.setId(value);
	}
	getText() {
		return this.getEmail();
	}
	asString() {
		let s = "{";
		s += "\"id\":"+this.getId()+",";
		if (UCommons.notEmpty(this.email)) {
			s += "\"email\":\""+this.email+"\",";
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
	getEmail() {
		return this.email;
	}
	setEmail(value) {
		this.email = value;
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
