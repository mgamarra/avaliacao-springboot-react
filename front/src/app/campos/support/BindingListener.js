/* react */
import SuperComponent from '../../misc/components/SuperComponent';
import UArray from '../../misc/utils/UArray';

export default class BindingListener extends SuperComponent {

	render() {
		return this.props.func();
	}

	componentDidMount() {
		if (!UArray.isEmpty(this.props.itens)) {
			this.props.itens.forEach(o => this.observar(o));
		}
	}

}

BindingListener.defaultProps = SuperComponent.defaultProps;
