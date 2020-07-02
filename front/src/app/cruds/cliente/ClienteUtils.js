/* crud-java */
import CampoAlterado from '../../../fc/components/campoAlterado/CampoAlterado';
import Cliente from './Cliente';
import ClienteEmailUtils from '../clienteEmail/ClienteEmailUtils';
import ClienteTelefoneUtils from '../clienteTelefone/ClienteTelefoneUtils';
import EntityCampos from '../../../fc/components/EntityCampos';
import Sessao from '../../../projeto/Sessao';
import UArray from '../../misc/utils/UArray';
import UBoolean from '../../misc/utils/UBoolean';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class ClienteUtils {
	checkInstance() {
		Sessao.checkInstance("ClienteUtils", this);
	}
	init() {}
	equalsNome(a, b) {
		return UString.equals(a.getNome(), b.getNome());
	}
	equalsCpf(a, b) {
		return UString.equals(UString.mantemSomenteNumeros(a.getCpf()), UString.mantemSomenteNumeros(b.getCpf()));
	}
	equalsComplemento(a, b) {
		return UString.equals(a.getComplemento(), b.getComplemento());
	}
	equalsCep(a, b) {
		return UString.equals(UString.mantemSomenteNumeros(a.getCep()), UString.mantemSomenteNumeros(b.getCep()));
	}
	equalsTelefones(a, b) {
		return ClienteTelefoneUtils.getInstance().equalsList(a.getTelefones(), b.getTelefones());
	}
	equalsEmails(a, b) {
		return ClienteEmailUtils.getInstance().equalsList(a.getEmails(), b.getEmails());
	}
	equalsExcluido(a, b) {
		return UBoolean.eq(a.getExcluido(), b.getExcluido());
	}
	equals(a, b) {
		this.checkInstance();
		if (UCommons.isEmpty(a)) {
			return UCommons.isEmpty(b);
		}
		if (UCommons.isEmpty(b)) {
			return false;
		}
		if (!this.equalsNome(a, b)) {
			return false;
		}
		if (!this.equalsCpf(a, b)) {
			return false;
		}
		if (!this.equalsComplemento(a, b)) {
			return false;
		}
		if (!this.equalsTelefones(a, b)) {
			return false;
		}
		if (!this.equalsEmails(a, b)) {
			return false;
		}
		if (!this.equalsCep(a, b)) {
			return false;
		}
		if (!this.equalsExcluido(a, b)) {
			return false;
		}
		return true;
	}
	camposAlterados(a, b) {
		let list = [];
		if (!this.equalsNome(a, b)) {
			list.add(new CampoAlterado().setKey("nome").setCampo("Nome").setDe(a.getNome()).setPara(b.getNome()));
		}
		if (!this.equalsCpf(a, b)) {
			list.add(new CampoAlterado().setKey("cpf").setCampo("CPF").setDe(a.getCpf()).setPara(b.getCpf()));
		}
		if (!this.equalsComplemento(a, b)) {
			list.add(new CampoAlterado().setKey("complemento").setCampo("Complemento").setDe(a.getComplemento()).setPara(b.getComplemento()));
		}
		if (!this.equalsCep(a, b)) {
			list.add(new CampoAlterado().setKey("cep").setCampo("Cep").setDe(UString.toString(a.getCep())).setPara(UString.toString(b.getCep())));
		}
		if (!this.equalsTelefones(a, b)) {
			list.add(new CampoAlterado().setCampo("Telefones"));
		}
		if (!this.equalsEmails(a, b)) {
			list.add(new CampoAlterado().setCampo("Emails"));
		}
		if (!this.equalsExcluido(a, b)) {
			list.add(new CampoAlterado().setCampo("Excluído"));
		}
		return list;
	}
	equalsList(a, b) {
		return UArray.equals(a, b, (x, y) => this.equals(x, y));
	}
	fromJson(json) {
		if (UCommons.isEmpty(json)) return null;
		let o = new Cliente();
		o.setId(json.id);
		if (UCommons.notEmpty(json.nome)) {
			o.setNome(json.nome);
		}
		if (UCommons.notEmpty(json.cpf)) {
			o.setCpf(json.cpf);
		}
		if (UCommons.notEmpty(json.cep)) {
			o.setCep(json.cep);
		}
		if (UCommons.notEmpty(json.uf)) {
			o.setUf(json.uf);
		}
		if (UCommons.notEmpty(json.cidade)) {
			o.setCidade(json.cidade);
		}
		if (UCommons.notEmpty(json.bairro)) {
			o.setBairro(json.bairro);
		}
		if (UCommons.notEmpty(json.logradouro)) {
			o.setLogradouro(json.logradouro);
		}
		if (UCommons.notEmpty(json.complemento)) {
			o.setComplemento(json.complemento);
		}
		if (UCommons.notEmpty(json.telefones)) {
			o.setTelefones(ClienteTelefoneUtils.getInstance().fromJsonList(json.telefones));
		}
		if (UCommons.notEmpty(json.emails)) {
			o.setEmails(ClienteEmailUtils.getInstance().fromJsonList(json.emails));
		}
		o.setExcluido(json.excluido);
		o.setRegistroBloqueado(json.registroBloqueado);
		return o;
	}
	fromJsonList(jsons) {
		if (UCommons.isEmpty(jsons)) return null;
		return jsons.map(o => this.fromJson(o));
	}
	merge(de, para) {
		para.setId(de.getId());
		para.setNome(de.getNome());
		para.setCpf(de.getCpf());
		para.setCep(de.getCep());
		para.setUf(de.getUf());
		para.setCidade(de.getCidade());
		para.setBairro(de.getBairro());
		para.setLogradouro(de.getLogradouro());
		para.setComplemento(de.getComplemento());
		para.setTelefones(de.getTelefones());
		para.setEmails(de.getEmails());
		para.setExcluido(de.getExcluido());
		para.setRegistroBloqueado(de.getRegistroBloqueado());
		para.setTelefones(ClienteTelefoneUtils.getInstance().clonarList(de.getTelefones()));
		para.setEmails(ClienteEmailUtils.getInstance().clonarList(de.getEmails()));
	}
	clonar(obj) {
		if (UCommons.isEmpty(obj)) {
			return null;
		}
		let o = new Cliente();
		o.setOriginal(obj);
		this.merge(obj, o);
		return o;
	}
	clonarList(array) {
		if (UArray.isEmpty(array)) {
			return null;
		} else {
			return array.map(o => this.clonar(o));
		}
	}
	novo() {
		let o = new Cliente();
		o.setId(--EntityCampos.novos);
		o.setExcluido(false);
		o.setRegistroBloqueado(false);
		o.setTelefones([]);
		o.setEmails([]);
		return o;
	}
	static getInstance() {
		return Sessao.getInstance("ClienteUtils", () => new ClienteUtils(), o => o.init());
	}
}
