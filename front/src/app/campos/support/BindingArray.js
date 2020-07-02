/* react */
import Binding from './Binding';
import UArray from '../../misc/utils/UArray';

export default class BindingArray extends Binding {

	itens;

	constructor(label) {
		super(label);
		this.set([]);
	}

	castFromString(s) {
		return null;
	}

	setItens(itensP) {
		if (UArray.isEmpty(itensP)) {
			this.itens =  [];
		} else {
			this.itens = itensP;
		}
		this.notifyObservers();
	}

	getItens() {
		return this.itens;
	}

	beforeSet(value) {
		if (UArray.isEmpty(value)) {
			return [];
		} else {
			return super.beforeSet(value);
		}
	}

	getItensNaoSelecionados() {

		if (UArray.isEmpty(this.itens)) {
			return [];
		}

		let list = this.get();

		if (UArray.isEmpty(list)) {
			return this.itens.copy();
		} else {
			return this.itens.filter(o => !list.contains(o));
		}

	}

	isEmpty() {
		return UArray.isEmpty(this.get());
	}

}
