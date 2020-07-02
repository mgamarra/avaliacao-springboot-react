/* react */
import Console from '../../misc/utils/Console';
import StartPrototypes from '../../misc/utils/StartPrototypes';
import UCommons from '../../misc/utils/UCommons';
import Uncycle from '../../misc/components/Uncycle';

export default class BindingObserver {

	static idComponentCount = 0;
	idComponent = BindingObserver.idComponentCount++;
	thisClassName;

	constructor() {
		StartPrototypes.exec();
		this.thisClassName = UCommons.getClassName(this);
	}

	stringify = () => this.toString();

	getIdComponent() {
		return this.idComponent;
	}
	notify0(o) {}

	focusController;

	focus() {
		Uncycle.setSelectedCombo(null);
		if (UCommons.notEmpty(this.focusController)) {
			const focused = this.focusController.get();
			if (UCommons.eqeqeq(focused, this)) {
				return;
			}
			this.focusController.set(this);
			if (UCommons.notEmpty(this.onFocus)) {
				this.onFocus();
			}
			if (UCommons.notEmpty(focused) && UCommons.notEmpty(focused.onBlur)) {
				focused.onBlur();
			}
		}
	}

	onFocus;
	onBlur;
	showTeclado = false;

	notifyObservers() {}

	log(o) {
		Console.log(this.thisClassName, o);
	}

	logRrror(o) {
		Console.error(this.thisClassName, o);
	}

	toString() {
		return UCommons.getClassName(this)+"-"+this.idComponent;
	}
}
