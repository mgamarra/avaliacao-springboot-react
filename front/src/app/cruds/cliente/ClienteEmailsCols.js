/* crud-java */
import Coluna from '../../../fc/components/tabela/Coluna';
import Sessao from '../../../projeto/Sessao';
import TextAlign from '../../misc/consts/enums/TextAlign';
import UString from '../../misc/utils/UString';

export default class ClienteEmailsCols {

	EMAIL;
	list;
	grupos;

	init() {
		this.checkInstance();
		this.EMAIL = new Coluna(340, "E-mail", o => o.getEmail(), TextAlign.left).setSort((a, b) => UString.compare(a.getEmail(), b.getEmail())).setGrupo(false).setId("Cliente-EmailCols-email");
		this.list = [this.EMAIL];
		this.grupos = [];
		this.init2();
	}

	init2() {}

	checkInstance() {
		Sessao.checkInstance("ClienteEmailsCols", this);
	}
	static getInstance() {
		return Sessao.getInstance("ClienteEmailsCols", () => new ClienteEmailsCols(), o => o.init());
	}
}
