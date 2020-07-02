/* front-constructor */
import BindingServiceList from './BindingServiceList';
import UCommons from '../../app/misc/utils/UCommons';

export default class BindingSubList extends BindingServiceList {

	id;

	funcGetInvalidMessage;

	constructor(titleP,mergeFunctionP, carragarCallBackP, idP, uriP) {
		super(titleP, mergeFunctionP, carragarCallBackP, uriP);
		this.id = idP;
	}

	getParametros() {
		return this.id.get();
	}

	preparadoParaBusca() {
		if (this.id.isEmpty() || this.id.eq(-1)) {
			this.start();
			return false;
		} else {
			return true;
		}
	}

	setDisabled(value) {
		super.setDisabled(value);
		return this;
	}

	getInvalidMessagePrivate() {
		if (UCommons.notEmpty(this.funcGetInvalidMessage)) {
			return this.funcGetInvalidMessage();
		} else {
			return null;
		}
	}

	isEmpty() {
		return false;
	}

}
