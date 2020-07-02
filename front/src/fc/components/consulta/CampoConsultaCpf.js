/* front-constructor */
import BindingCpf from '../../../app/campos/support/BindingCpf';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';

export default class CampoConsultaCpf extends CampoConsulta {

	a = new BindingCpf("");

	constructor(nomeCampoP, titulo, notNull) {
		super(nomeCampoP, titulo, CampoConsultaCpf.OPERADORES_POSSIVEIS, notNull);
	}

	bindInicial() {
		return this.a;
	}

}
CampoConsultaCpf.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.IGUAL
];
