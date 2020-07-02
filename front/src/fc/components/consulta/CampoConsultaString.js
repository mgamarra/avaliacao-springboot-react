/* front-constructor */
import BindingString from '../../../app/campos/support/BindingString';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';

export default class CampoConsultaString extends CampoConsulta {

	a;

	constructor(nomeCampoP, titulo, size, notNull) {
		super(nomeCampoP, titulo, CampoConsultaString.OPERADORES_POSSIVEIS, notNull);
		this.a = new BindingString("", size);
		this.setDefaultValue(ConsultaOperadorConstantes.COMECA_COM);
	}

	bindInicial() {
		return this.a;
	}

}
CampoConsultaString.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.COMECA_COM
	, ConsultaOperadorConstantes.CONTEM
	, ConsultaOperadorConstantes.TERMINA_COM
	, ConsultaOperadorConstantes.IGUAL
];
