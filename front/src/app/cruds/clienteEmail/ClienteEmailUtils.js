/* crud-java */
import CampoAlterado from '../../../fc/components/campoAlterado/CampoAlterado';
import ClienteEmail from './ClienteEmail';
import EntityCampos from '../../../fc/components/EntityCampos';
import IdText from '../../misc/utils/IdText';
import Sessao from '../../../projeto/Sessao';
import UArray from '../../misc/utils/UArray';
import UBoolean from '../../misc/utils/UBoolean';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class ClienteEmailUtils {
	checkInstance() {
		Sessao.checkInstance("ClienteEmailUtils", this);
	}
	init() {}
	equalsEmail(a, b) {
		return UString.equals(a.getEmail(), b.getEmail());
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
		if (!this.equalsEmail(a, b)) {
			return false;
		}
		if (!this.equalsExcluido(a, b)) {
			return false;
		}
		return true;
	}
	camposAlterados(a, b) {
		let list = [];
		if (!this.equalsEmail(a, b)) {
			list.add(new CampoAlterado().setKey("email").setCampo("E-mail").setDe(a.getEmail()).setPara(b.getEmail()));
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
		let o = new ClienteEmail();
		o.setId(json.id);
		if (UCommons.notEmpty(json.cliente)) {
			o.setCliente(new IdText(json.cliente.id, json.cliente.text));
		}
		if (UCommons.notEmpty(json.email)) {
			o.setEmail(json.email);
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
		para.setCliente(de.getCliente());
		para.setEmail(de.getEmail());
		para.setExcluido(de.getExcluido());
		para.setRegistroBloqueado(de.getRegistroBloqueado());
	}
	clonar(obj) {
		if (UCommons.isEmpty(obj)) {
			return null;
		}
		let o = new ClienteEmail();
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
		let o = new ClienteEmail();
		o.setId(--EntityCampos.novos);
		o.setExcluido(false);
		o.setRegistroBloqueado(false);
		return o;
	}
	static getInstance() {
		return Sessao.getInstance("ClienteEmailUtils", () => new ClienteEmailUtils(), o => o.init());
	}
}
