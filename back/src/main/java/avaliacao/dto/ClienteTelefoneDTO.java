package avaliacao.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ClienteTelefoneDTO extends BasicDTO  {

	@ApiModelProperty(position = 0)
	private Integer id;

	@ApiModelProperty(position = 0)
	private String numero;

	@ApiModelProperty(position = 0)
	private IdTextDTO tipo = new IdTextDTO();
	

	
}
