package avaliacao.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class BasicDTO {
	@ApiModelProperty(position = 0)
	private boolean excluido = false;

}
