/* crud-java */
import CampoAlterado from '../../../fc/components/campoAlterado/CampoAlterado';
import ClienteTelefone from './ClienteTelefone';
import EntityCampos from '../../../fc/components/EntityCampos';
import IdText from '../../misc/utils/IdText';
import Sessao from '../../../projeto/Sessao';
import TipoDeTelefoneConstantes from '../tipoDeTelefone/TipoDeTelefoneConstantes';
import UArray from '../../misc/utils/UArray';
import UBoolean from '../../misc/utils/UBoolean';
import UCommons from '../../misc/utils/UCommons';
import UEntity from '../../../fc/components/UEntity';
import UString from '../../misc/utils/UString';

export default class ClienteTelefoneUtils {
	checkInstance() {
		Sessao.checkInstance("ClienteTelefoneUtils", this);
	}
	init() {}
	equalsNumero(a, b) {
		return UString.equals(UString.mantemSomenteNumeros(a.getNumero()), UString.mantemSomenteNumeros(b.getNumero()));
	}
	equalsTipo(a, b) {
		return UEntity.equalsId(a.getTipo(), b.getTipo());
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
		if (!this.equalsNumero(a, b)) {
			return false;
		}
		if (!this.equalsTipo(a, b)) {
			return false;
		}
		if (!this.equalsExcluido(a, b)) {
			return false;
		}
		return true;
	}
	camposAlterados(a, b) {
		let list = [];
		if (!this.equalsNumero(a, b)) {
			list.add(new CampoAlterado().setKey("numero").setCampo("Número").setDe(a.getNumero()).setPara(b.getNumero()));
		}
		if (!this.equalsTipo(a, b)) {
			list.add(new CampoAlterado().setKey("tipo").setCampo("Tipo").setDe(UString.toString(a.getTipo())).setPara(UString.toString(b.getTipo())));
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
		let o = new ClienteTelefone();
		o.setId(json.id);
		if (UCommons.notEmpty(json.cliente)) {
			o.setCliente(new IdText(json.cliente.id, json.cliente.text));
		}
		if (UCommons.notEmpty(json.tipo)) {
			o.setTipo(TipoDeTelefoneConstantes.getList().byId(json.tipo.id));
		}
		if (UCommons.notEmpty(json.numero)) {
			o.setNumero(json.numero);
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
		para.setTipo(de.getTipo());
		para.setNumero(de.getNumero());
		para.setExcluido(de.getExcluido());
		para.setRegistroBloqueado(de.getRegistroBloqueado());
	}
	clonar(obj) {
		if (UCommons.isEmpty(obj)) {
			return null;
		}
		let o = new ClienteTelefone();
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
		let o = new ClienteTelefone();
		o.setId(--EntityCampos.novos);
		o.setExcluido(false);
		o.setRegistroBloqueado(false);
		return o;
	}
	static getInstance() {
		return Sessao.getInstance("ClienteTelefoneUtils", () => new ClienteTelefoneUtils(), o => o.init());
	}
}
