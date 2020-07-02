/* front-constructor */
import BindingDecimal from '../../../app/campos/support/BindingDecimal';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';

export default class CampoConsultaDecimal extends CampoConsulta {

	a;
	b;

	constructor(nomeCampoP, titulo, inteiros, decimais, notNull) {
		super(nomeCampoP, titulo, CampoConsultaDecimal.OPERADORES_POSSIVEIS, notNull);
		this.a = new BindingDecimal("", inteiros, decimais);
		this.b = new BindingDecimal("", inteiros, decimais);
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
CampoConsultaDecimal.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.IGUAL
	, ConsultaOperadorConstantes.MAIOR_OU_IGUAL
	, ConsultaOperadorConstantes.MENOR_OU_IGUAL
	, ConsultaOperadorConstantes.ENTRE
];
