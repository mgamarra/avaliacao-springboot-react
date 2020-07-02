/* crud-java */
import EntityFront from '../../../fc/components/EntityFront';
import UBoolean from '../../misc/utils/UBoolean';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class Cliente extends EntityFront {

	original;
	nome = null;
	cpf = null;
	cep = null;
	uf = null;
	cidade = null;
	bairro = null;
	logradouro = null;
	complemento = null;
	telefones = null;
	telefonesHouveMudancas = false;
	emails = null;
	emailsHouveMudancas = false;
	excluido = false;
	registroBloqueado = false;
	setId(value) {
		super.setId(value);
	}
	getText() {
		return this.getNome();
	}
	asString() {
		let s = "{";
		s += "\"id\":"+this.getId()+",";
		if (UCommons.notEmpty(this.nome)) {
			s += "\"nome\":\""+this.nome+"\",";
		}
		if (UCommons.notEmpty(this.cpf)) {
			s += "\"cpf\":\""+UString.mantemSomenteNumeros(this.cpf)+"\",";
		}
		if (UCommons.notEmpty(this.cep)) {
			s += "\"cep\":\""+UString.mantemSomenteNumeros(this.cep)+"\",";
			s += "\"uf\":\""+this.uf+"\",";
			s += "\"cidade\":\""+this.cidade+"\",";
			s += "\"bairro\":\""+this.bairro+"\",";
			s += "\"logradouro\":\""+this.logradouro+"\",";
		}
		if (UCommons.notEmpty(this.complemento)) {
			s += "\"complemento\":\""+this.complemento+"\",";
		}
		if (this.telefones !== null) {
			s += "\"telefones\":[";
			s += this.telefones.reduce((ss, o) => ss + o.asString() + ",", "");
			s += "],";
		}
		if (this.emails !== null) {
			s += "\"emails\":[";
			s += this.emails.reduce((ss, o) => ss + o.asString() + ",", "");
			s += "],";
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
	getNome() {
		return this.nome;
	}
	setNome(value) {
		this.nome = value;
	}
	getCpf() {
		return this.cpf;
	}
	setCpf(value) {
		this.cpf = value;
	}
	getCep() {
		return this.cep;
	}
	setCep(value) {
		this.cep = value;
	}
	getUf() {
		return this.uf;
	}
	setUf(value) {
		this.uf = value;
	}
	getCidade() {
		return this.cidade;
	}
	setCidade(value) {
		this.cidade = value;
	}
	getBairro() {
		return this.bairro;
	}
	setBairro(value) {
		this.bairro = value;
	}
	getLogradouro() {
		return this.logradouro;
	}
	setLogradouro(value) {
		this.logradouro = value;
	}
	getComplemento() {
		return this.complemento;
	}
	setComplemento(value) {
		this.complemento = value;
	}
	getTelefones() {
		return this.telefones;
	}
	setTelefones(value) {
		this.telefones = value;
	}
	getTelefonesHouveMudancas() {
		return this.telefonesHouveMudancas;
	}
	setTelefonesHouveMudancas(value) {
		this.telefonesHouveMudancas = value;
	}
	getEmails() {
		return this.emails;
	}
	setEmails(value) {
		this.emails = value;
	}
	getEmailsHouveMudancas() {
		return this.emailsHouveMudancas;
	}
	setEmailsHouveMudancas(value) {
		this.emailsHouveMudancas = value;
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
