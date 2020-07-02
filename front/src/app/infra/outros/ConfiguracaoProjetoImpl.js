/* crud-java */
import ConfiguracaoProjeto from '../../../fc/outros/ConfiguracaoProjeto';
import UCommons from '../../misc/utils/UCommons';

export default class ConfiguracaoProjetoImpl extends ConfiguracaoProjeto {
	getMock(entidade) {
		return null;
	}
	startEntidades() {
		return [
			"Arquivo",
			"Cep",
			"Cliente",
			"ClienteEmail",
			"ClienteTelefone",
			"ConsultaOperador",
			"EsqueciSenha",
			"ImportacaoArquivo",
			"ImportacaoArquivoErro",
			"ImportacaoArquivoStatus",
			"MudarSenha",
			"Observacao",
			"Perfil",
			"PerfilEntidade",
			"TipoDeTelefone",
			"Usuario",
			"UsuarioPerfil"
		];
	}
	static start() {
		if (UCommons.isEmpty(ConfiguracaoProjeto.instance)) {
			new ConfiguracaoProjetoImpl();
		}
	}
}
