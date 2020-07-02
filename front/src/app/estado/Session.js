/* front-constructor */
import Binding from '../campos/support/Binding';
import BindingBoolean from '../campos/support/BindingBoolean';
import BindingSenha from '../campos/support/BindingSenha';
import BindingString from '../campos/support/BindingString';
import HttpMethod from '../../projeto/HttpMethod';
import LocalStorage from '../../web/misc/LocalStorage';
import Sessao from '../../projeto/Sessao';
import SessionStorage from '../../web/misc/SessionStorage';
import UCommons from '../misc/utils/UCommons';
import UString from '../misc/utils/UString';
import {message} from 'antd';

export default class Session {

	localStorage = new LocalStorage();
	sessionStorage = new SessionStorage();

	token;
	nomeUsuario;
	login;
	senha;
	lembrarme;
	loading;

	permissoes;

	efetuaLogin() {
		if (this.login.isValid() && this.senha.isValid()) {
			this.loading.set(true);
			const authentication = {login: this.login.get(), pass: this.senha.get()};
			HttpMethod.post("users/signin?password="+this.senha.get()+"&username="+this.login.get(), null, res => {
				this.callBackLogin(authentication, res);
				this.token.notifyObservers();
			}).setOnError(error => {
				message.error(error, 3);
				this.loading.set(false);
			}).run();
		} else {
			this.login.setVirgin(false);
			this.senha.setVirgin(false);
		}
	}

	callBackLogin(authentication, res) {

		Binding.notificacoesDesligadasInc();

		let json = res.body;

		this.setRole(json.role);

		this.token.set(json.token);
		this.nomeUsuario.set(authentication.login);

		this.sessionStorage.set("usuario.token", this.token.get());
		this.sessionStorage.set("usuario.nome", this.nomeUsuario.get());

		if (UCommons.notEmpty(authentication)) {
			if (this.lembrarme.isTrue()) {
				this.localStorage.set("login", authentication.login);
				this.localStorage.set("pass", authentication.pass);
			} else {
				this.localStorage.remove("login");
				this.localStorage.remove("pass");
			}
		}

		Binding.notificacoesDesligadasDec();

		this.loading.set(false);
		this.nomeUsuario.notifyObservers();

	}

	setRole(role) {

		let comandos;

		if (UString.equals("ROLE_ADMIN", role)) {
			comandos = ["read","insert","delete","update"];
		} else {
			comandos = ["read"];
		}

		this.permissoes = [
			{nome: "Cliente", comandos: comandos},
			{nome: "ClienteTelefone", comandos: comandos},
			{nome: "ClienteEmail", comandos: comandos}
		];

		this.sessionStorage.set("usuario.role", role);

	}

	efetuaLogout() {
		this.token.set(null);
		this.sessionStorage.clear();
		Sessao.clear();
		Sessao.set("Session", this);
		window.location.pathname = "/";
	}

	init() {

		this.login = new BindingString("Login", 255);
		this.senha = new BindingSenha("Senha", 50, false);
		this.lembrarme = BindingBoolean.novo("Lembrar-me neste computador");
		this.nomeUsuario = new BindingString("Nome do Usuario", 250);
		this.token = new BindingString("Token", 5000);
		this.loading = BindingBoolean.novo("Loading");

		this.loadLembreme();
		this.loadSession();
		this.loadRole();
	}

	loadRole() {
		let s = this.sessionStorage.get("usuario.role");
		if (UString.notEmpty(s)) {
			this.setRole(s);
		}
	}

	loadSession() {
		const tk = this.sessionStorage.get("usuario.token");
		if (UString.notEmpty(tk)) {
			this.token.set(tk);
			this.nomeUsuario.set(this.sessionStorage.get("usuario.nome"));
			this.sessionStorage.set("usuario.nome", this.nomeUsuario.get());
		}
	}

	loadLembreme() {
		const loginStorage = this.localStorage.get("login");
		if (UString.notEmpty(loginStorage)) {
			this.login.set(loginStorage);
			this.senha.set(this.localStorage.get("pass"));
			this.lembrarme.set(true);
		}
	}

	isLogado() {
		return !this.token.isEmpty();
	}

	static getInstance() {
		return Sessao.getInstance("Session", () => new Session(), o => o.init());
	}

	getPermissao(entidade) {
		let o = this.permissoes.unique(item => UString.equals(entidade, item.nome));
		if (o === null) {
			o = {};
			o.nome = entidade;
			o.comandos = [];
		}
		return o;
	}
	hasPermissao(entidade, comando) {
		return this.getPermissao(entidade).comandos.contains(comando);
	}
	static canRead(entidade) {
		return Session.getInstance().hasPermissao(entidade, "read");
	}
	static canInsert(entidade) {
		return Session.getInstance().hasPermissao(entidade, "insert");
	}
	static canDelete(entidade) {
		return Session.getInstance().hasPermissao(entidade, "delete");
	}
	static canUpdate(entidade) {
		return Session.getInstance().hasPermissao(entidade, "update");
	}
}
