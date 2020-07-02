/* front-constructor */
import BindingInteger from '../../../app/campos/support/BindingInteger';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';

export default class CampoConsultaInteger extends CampoConsulta {

	a;
	b;

	constructor(nomeCampoP, titulo, max, notNull) {
		super(nomeCampoP, titulo, CampoConsultaInteger.OPERADORES_POSSIVEIS, notNull);
		this.a = new BindingInteger("", max);
		this.b = new BindingInteger("", max);
	}

	bindInicial() {
		return this.a;
	}

	bindFinal() {
		return this.b;
	}

	valorInicialMaiorQueValorFinal() {
		return this.a.maiorQue(this.b);
	}

}
CampoConsultaInteger.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.IGUAL
	, ConsultaOperadorConstantes.MAIOR_OU_IGUAL
	, ConsultaOperadorConstantes.MENOR_OU_IGUAL
	, ConsultaOperadorConstantes.ENTRE
];
