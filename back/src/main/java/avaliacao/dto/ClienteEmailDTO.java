package avaliacao.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ClienteEmailDTO extends BasicDTO {

	@ApiModelProperty(position = 0)
	private Integer id;

	@ApiModelProperty(position = 1)
	private String email;
	
	@ApiModelProperty(position = 0)
	private boolean excluido = false;

}
