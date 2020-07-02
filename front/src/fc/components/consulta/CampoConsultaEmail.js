/* front-constructor */
import BindingEmail from '../../../app/campos/support/BindingEmail';
import BindingString from '../../../app/campos/support/BindingString';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';

export default class CampoConsultaEmail extends CampoConsulta {

	bString = new BindingString("", 60);
	bEmail = new BindingEmail("e-mail");

	constructor(nomeCampoP, titulo, notNull) {
		super(nomeCampoP, titulo, CampoConsultaEmail.OPERADORES_POSSIVEIS, notNull);
		this.bEmail.addFunctionObserver(() => this.validar());
		this.bEmail.addFunctionObserver(() => this.bString.set(this.bEmail.get()));
		this.bString.addFunctionObserver(() => this.bEmail.set(this.bString.get()));
	}

	bindInicial() {
		if (this.operador.eq(ConsultaOperadorConstantes.IGUAL)) {
			return this.bEmail;
		} else {
			return this.bString;
		}
	}

}
CampoConsultaEmail.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.COMECA_COM
	, ConsultaOperadorConstantes.CONTEM
	, ConsultaOperadorConstantes.TERMINA_COM
	, ConsultaOperadorConstantes.IGUAL
];
