/* front-constructor */
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';

export default class CampoConsultaBoolean extends CampoConsulta {

	constructor(nomeCampoP, titulo, notNull) {
		super(nomeCampoP, titulo, CampoConsultaBoolean.OPERADORES_POSSIVEIS, notNull);
	}

	getOperadoresSemBinding() {
		return CampoConsultaBoolean.OPERADORES_POSSIVEIS;
	}

	bindInicial() {
		return null;
	}

}
CampoConsultaBoolean.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.TODOS
	, ConsultaOperadorConstantes.SIM
	, ConsultaOperadorConstantes.NAO
];
