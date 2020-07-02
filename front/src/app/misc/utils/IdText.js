/* react */
import UInteger from './UInteger';

export default class IdText {
	stringify = () => this.toString();

	constructor(idx, textx, ox, iconx) {
		this.id = idx;
		this.text = textx;
		this.o = ox;
		this.icon = iconx;
		this.key = "" + this.id;
		this.label = textx;
		this.value = this.id;
	}

	id;
	text;
	o;
	icon;
	sigla;
	key;
	label;
	value;

	eq(valueP) {
		return UInteger.equals(this.id, valueP);
	}

	getId() {
		return this.id;
	}
	getText() {
		return this.text;
	}

	setSigla(siglaParam){this.sigla = siglaParam; return this;}

	toString() {
		return "" + this.id;
	}

}
IdText.VAZIO = new IdText(0, "");
