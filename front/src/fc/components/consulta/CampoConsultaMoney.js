/* front-constructor */
import BindingMoney from '../../../app/campos/support/BindingMoney';
import CampoConsulta from './CampoConsulta';
import ConsultaOperadorConstantes from './ConsultaOperadorConstantes';

export default class CampoConsultaMoney extends CampoConsulta {

	a;
	b;

	constructor(nomeCampoP, titulo, inteiros, notNull) {
		super(nomeCampoP, titulo, CampoConsultaMoney.OPERADORES_POSSIVEIS, notNull);
		this.a = new BindingMoney("", inteiros);
		this.b = new BindingMoney("", inteiros);
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
CampoConsultaMoney.OPERADORES_POSSIVEIS = [
	ConsultaOperadorConstantes.IGUAL
	, ConsultaOperadorConstantes.MAIOR_OU_IGUAL
	, ConsultaOperadorConstantes.MENOR_OU_IGUAL
	, ConsultaOperadorConstantes.ENTRE
];
