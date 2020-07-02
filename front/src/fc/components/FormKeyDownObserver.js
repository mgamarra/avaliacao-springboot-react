/* front-constructor */
import KeyDownObservers from '../../web/misc/KeyDownObservers';
import SuperComponent from '../../app/misc/components/SuperComponent';
import UCommons from '../../app/misc/utils/UCommons';

export default class FormKeyDownObserver extends SuperComponent {

	componentDidMount() {
		KeyDownObservers.add(this);
		this.componentDidMount1();
		FormKeyDownObserver.formulariosAbertos.add(this);
	}

	onKeyDown(e) {
		if (UCommons.neq(FormKeyDownObserver.getFormularioAberto(), this)) {
			return;
		} else {
			this.onKeyDown0(e);
		}
	}

	componentWillUnmount2() {
		KeyDownObservers.remove(this);
		this.componentWillUnmount2a();
		FormKeyDownObserver.formulariosAbertos.removeObject(this);
	}

	componentWillUnmount2a() {}

	static getFormularioAberto() {
		return FormKeyDownObserver.formulariosAbertos.getLast();
	}
	componentDidMount1() {}

}
FormKeyDownObserver.formulariosAbertos = [];

FormKeyDownObserver.defaultProps = SuperComponent.defaultProps;
