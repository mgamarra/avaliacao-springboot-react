/* front-constructor */
import React from 'react';
import Botao from '../../../antd/Botao';
import BotaoSize from '../../../antd/BotaoSize';
import SuperComponent from '../../../app/misc/components/SuperComponent';

export default class BotaoDesfazerCampoAlterado extends SuperComponent {
	constructor(props){
		super(props);
		this.state.jaClicado = false;
	}

	render() {
		if (this.state.jaClicado) {
			return null;
		}
		return (
			<Botao
				title={"Desfazer"}
				size={BotaoSize.small}
				onClick={() => {
					this.setJaClicado(true);
					this.props.onClick();
				}}
			/>
		);
	}
	setJaClicado = o => this.setState({jaClicado:o});
}

BotaoDesfazerCampoAlterado.defaultProps = SuperComponent.defaultProps;
