/* front-constructor */
import IdText from '../../../app/misc/utils/IdText';

export default class ConsultaOperadorConstantes {
	static getList() {
		return ConsultaOperadorConstantes.list;
	}
}
ConsultaOperadorConstantes.IGUAL = new IdText(1, "Igual");
ConsultaOperadorConstantes.COMECA_COM = new IdText(2, "Começa com");
ConsultaOperadorConstantes.CONTEM = new IdText(3, "Contém");
ConsultaOperadorConstantes.TERMINA_COM = new IdText(4, "Termina com");
ConsultaOperadorConstantes.MAIOR_OU_IGUAL = new IdText(5, "Maior ou igual");
ConsultaOperadorConstantes.MENOR_OU_IGUAL = new IdText(6, "Menor ou igual");
ConsultaOperadorConstantes.ENTRE = new IdText(7, "Entre");
ConsultaOperadorConstantes.EM = new IdText(8, "Em");
ConsultaOperadorConstantes.HOJE = new IdText(10, "Hoje");
ConsultaOperadorConstantes.HOJE_MENOS = new IdText(11, "Hoje menos");
ConsultaOperadorConstantes.HOJE_MAIS = new IdText(12, "Hoje mais");
ConsultaOperadorConstantes.VAZIOS = new IdText(13, "Vazios");
ConsultaOperadorConstantes.MAIS_OPCOES = new IdText(15, "Mais opções");
ConsultaOperadorConstantes.DESMEMBRAR = new IdText(16, "Desmembrar");
ConsultaOperadorConstantes.SIM = new IdText(17, "Sim");
ConsultaOperadorConstantes.NAO = new IdText(18, "Não");
ConsultaOperadorConstantes.TODOS = new IdText(9999, "Todos");
ConsultaOperadorConstantes.list = [
	ConsultaOperadorConstantes.IGUAL,
	ConsultaOperadorConstantes.COMECA_COM,
	ConsultaOperadorConstantes.CONTEM,
	ConsultaOperadorConstantes.TERMINA_COM,
	ConsultaOperadorConstantes.MAIOR_OU_IGUAL,
	ConsultaOperadorConstantes.MENOR_OU_IGUAL,
	ConsultaOperadorConstantes.ENTRE,
	ConsultaOperadorConstantes.EM,
	ConsultaOperadorConstantes.HOJE,
	ConsultaOperadorConstantes.HOJE_MENOS,
	ConsultaOperadorConstantes.HOJE_MAIS,
	ConsultaOperadorConstantes.VAZIOS,
	ConsultaOperadorConstantes.MAIS_OPCOES,
	ConsultaOperadorConstantes.DESMEMBRAR,
	ConsultaOperadorConstantes.SIM,
	ConsultaOperadorConstantes.NAO,
	ConsultaOperadorConstantes.TODOS
];
