/* crud-java */
import BindingString from '../../campos/support/BindingString';
import UCep from '../../misc/utils/UCep';
import UString from '../../misc/utils/UString';

export default class BindingCep extends BindingString {

	constructor() {
		super("Cep", 10);
	}

	getInvalidMessagePrivate() {
		let s = this.get();
		s = UString.mantemSomenteNumeros(s);
		if (UString.length(s) < 8) {
			return "Deve conter 8 números";
		}
		return null;
	}

	formatParcial(s) {
		return UCep.formatParcial(s);
	}

}
