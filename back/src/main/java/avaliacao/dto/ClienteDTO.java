package avaliacao.dto;

import java.util.List;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ClienteDTO extends BasicDTO {

	@ApiModelProperty(position = 0)
	private Integer id;

	@ApiModelProperty(position = 1)
	private String nome;

	@ApiModelProperty(position = 2)
	private String cpf;

	@ApiModelProperty(position = 3)
	private String cep;

	@ApiModelProperty(position = 4)
	private String logradouro;

	@ApiModelProperty(position = 5)
	private String bairro;

	@ApiModelProperty(position = 6)
	private String cidade;

	@ApiModelProperty(position = 7)
	private String uf;

	@ApiModelProperty(position = 8)
	private String complemento;

	@ApiModelProperty(position = 9)
	List<ClienteTelefoneDTO> telefones;

	@ApiModelProperty(position = 10)
	List<ClienteEmailDTO> emails;

}
