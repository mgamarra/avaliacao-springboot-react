package avaliacao.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class CepDTO extends BasicDTO {

	@ApiModelProperty(position = 0)
	private String cep;

	@ApiModelProperty(position = 1)
	private String logradouro;

	@ApiModelProperty(position = 2)
	private String complemento;

	@ApiModelProperty(position = 3)
	private String bairro;

	@ApiModelProperty(position = 4)
	private String localidade;

	@ApiModelProperty(position = 5)
	private String uf;

	@ApiModelProperty(position = 6)
	private String unidade;
	
	@ApiModelProperty(position = 7)
	private String ibge;

	@ApiModelProperty(position = 8)
	private String gia;

}
