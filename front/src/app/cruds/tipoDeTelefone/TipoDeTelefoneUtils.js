/* crud-java */
import CampoAlterado from '../../../fc/components/campoAlterado/CampoAlterado';
import EntityCampos from '../../../fc/components/EntityCampos';
import Sessao from '../../../projeto/Sessao';
import TipoDeTelefone from './TipoDeTelefone';
import UArray from '../../misc/utils/UArray';
import UBoolean from '../../misc/utils/UBoolean';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';

export default class TipoDeTelefoneUtils {
	checkInstance() {
		Sessao.checkInstance("TipoDeTelefoneUtils", this);
	}
	init() {}
	equalsNome(a, b) {
		return UString.equals(a.getNome(), b.getNome());
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
		let o = new TipoDeTelefone();
		o.setId(json.id);
		if (UCommons.notEmpty(json.nome)) {
			o.setNome(json.nome);
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
		para.setExcluido(de.getExcluido());
		para.setRegistroBloqueado(de.getRegistroBloqueado());
	}
	clonar(obj) {
		if (UCommons.isEmpty(obj)) {
			return null;
		}
		let o = new TipoDeTelefone();
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
		let o = new TipoDeTelefone();
		o.setId(--EntityCampos.novos);
		o.setExcluido(false);
		o.setRegistroBloqueado(false);
		return o;
	}
	static getInstance() {
		return Sessao.getInstance("TipoDeTelefoneUtils", () => new TipoDeTelefoneUtils(), o => o.init());
	}
}
