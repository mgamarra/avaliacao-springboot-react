/* react */
import React from 'react';
import BoxComponent from './BoxComponent';
import Console from '../utils/Console';
import StartPrototypes from '../utils/StartPrototypes';
import UArray from '../utils/UArray';
import UCommons from '../utils/UCommons';
import UNative from '../utils/UNative';

export default class SuperComponent extends React.PureComponent {
	static countComponents = 0;
	idCount = 0;
	stringId;
	itensQueObservo;
	thisClassName;

	constructor(props) {
		super(props);
		this.state = {};
		this.idCount = SuperComponent.countComponents++;
		this.thisClassName = UCommons.getClassName(this);
		this.stringId = this.thisClassName + this.idCount;
	}

	componentWillUnmount() {
		if (UCommons.notEmpty(this.itensQueObservo)) {
			this.itensQueObservo.forEach(o => o.removeRenderObserver(this));
		}
		this.componentWillUnmount2();
	}

	newBox(startValue) {
		return new BoxComponent(this, startValue);
	}

	componentWillUnmount2() {}

	observar(o) {

		if (UNative.inJava) {
			/*verificar se esta vindo de um didMount*/
		}

		if (UCommons.isEmpty(this.itensQueObservo)) {
			this.itensQueObservo = [];
		}
		this.itensQueObservo.add(o);
		o.addRenderObserver(this);
	}

	log(o) {
		Console.log(this.thisClassName, o);
	}

	logRrror(o) {
		Console.error(this.thisClassName, o);
	}

	map(array,funcao) {
		if (UArray.isEmpty(array)) {
			return null;
		} else {
			return array.map(funcao);
		}
	}

}
SuperComponent.start = StartPrototypes.exec();

SuperComponent.defaultProps = React.PureComponent.defaultProps;
