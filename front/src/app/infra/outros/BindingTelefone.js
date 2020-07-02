/* crud-java */
import BindingString from '../../campos/support/BindingString';
import ClienteTelefoneCampos from '../../cruds/clienteTelefone/ClienteTelefoneCampos';
import TipoDeTelefoneConstantes from '../../cruds/tipoDeTelefone/TipoDeTelefoneConstantes';
import UCommons from '../../misc/utils/UCommons';
import UString from '../../misc/utils/UString';
import UTelefone from '../../misc/utils/UTelefone';

export default class BindingTelefone extends BindingString {

	constructor() {
		super("Número", 11);
		ClienteTelefoneCampos.getInstance().tipo.addFunctionObserver(() => this.set(this.get()));
	}

	formatParcial(s) {
		return BindingTelefone.format(s, ClienteTelefoneCampos.getInstance().tipo.get());
	}

	static format(s, tipo) {

		s = UString.mantemSomenteNumeros(s);

		if (UCommons.isEmpty(tipo)) {
			s = UString.maxLength(s, 9);
		} else if (tipo.eq(TipoDeTelefoneConstantes.CELULAR.id)) {
			s = UString.maxLength(s, 9);
		} else {
			s = UString.maxLength(s, 8);
		}

		s = UTelefone.formatComDdi(null, null, s);

		return s;

	}

}
