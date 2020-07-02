/* front-constructor */
import CampoConsulta from './CampoConsulta';

export default class CampoConsultaSenha extends CampoConsulta {

	constructor(nomeCampoP, titulo, notNull) {
		super(nomeCampoP, titulo, CampoConsultaSenha.OPERADORES_POSSIVEIS, notNull);
	}

	bindInicial() {
		return null;
	}

}
CampoConsultaSenha.OPERADORES_POSSIVEIS = [];
