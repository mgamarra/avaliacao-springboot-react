/* react */
import React from 'react';
import Console from '../utils/Console';
import UArray from '../utils/UArray';
import UString from '../utils/UString';
import {Fragment} from 'react';

export default class Foreach {

	array_;
	func_;
	getKey_ = o => UString.toString(o);
	list;
	copy;
	vez = 0;
	keys = [];

	ok() {
		return <Fragment>{this.getItens()}</Fragment>;
	}
	getItens() {
		if (UArray.isEmpty(this.array_)) {
			return [];
		} else {
			this.keys.clear();
			this.list = [];
			this.copy = this.array_.copy();
			this.vez = 0;
			this.monta();
			return this.list;
		}
	}

	monta () {
		/*
		* atencao!
		* nao substituir por while e nem colocar ||
		* pois o trace é utilizado como chave
		* */

		if (this.vez === 0) return this.next();
		if (this.vez === 1) return this.next();
		if (this.vez === 2) return this.next();
		if (this.vez === 3) return this.next();
		if (this.vez === 4) return this.next();
		if (this.vez === 5) return this.next();
		if (this.vez === 6) return this.next();
		if (this.vez === 7) return this.next();
		if (this.vez === 8) return this.next();
		if (this.vez === 9) return this.next();
		if (this.vez === 10) return this.next();
		if (this.vez === 11) return this.next();
		if (this.vez === 12) return this.next();
		if (this.vez === 13) return this.next();
		if (this.vez === 14) return this.next();
		if (this.vez === 15) return this.next();
		if (this.vez === 16) return this.next();
		if (this.vez === 17) return this.next();
		if (this.vez === 18) return this.next();
		if (this.vez === 19) return this.next();
		throw new Error("Colocar mais itens");
	}

	next() {

		/*
		* atencao!
		* nao substituir por while e nem colocar ||
		* pois o trace é utilizado como chave de identificacao do objeto
		* */

		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;
		if (this.finish()) return true;

		this.vez++;
		return this.monta();

	}

	finish() {
		const o = this.copy.remove(0);
		let key = this.getKey_(o);
		if (UString.isEmpty(key)) {
			key = UString.toString(o);
		}

		if (this.keys.contains(key)) {
			Console.log("Foreach", "KEY REPETIDA >>>> " + key);
		} else {
			this.keys.push(key);
		}

		this.list.add(<Fragment key={key}>{this.func_(o)}</Fragment>);
		return this.copy.isEmpty();
	}

	array(o){this.array_ = o; return this;}
	func(o){this.func_ = o; return this;}
	getKey(o){this.getKey_ = o; return this;}

}
