/* crud-java */
import React from 'react';
import BarraSuperior from '../../infra/components/BarraSuperior';
import ClienteFormConsulta from '../cliente/ClienteFormConsulta';
import LoginView from '../../../fc/components/deslogado/LoginView';
import Session from '../../estado/Session';
import SuperComponent from '../../misc/components/SuperComponent';
import {Fragment} from 'react';

export default class FramePrincipal extends SuperComponent {

	render() {
		return (
			<Fragment>
				<BarraSuperior/>
				{this.getBody()}
			</Fragment>
		);
	}

	getBody() {
		if (Session.getInstance().isLogado()) {
			return <ClienteFormConsulta/>;
		} else {
			return <LoginView/>;
		}
	}

	componentDidMount() {
		this.observar(Session.getInstance().token);
	}

}

FramePrincipal.defaultProps = SuperComponent.defaultProps;
