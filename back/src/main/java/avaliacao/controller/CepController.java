package avaliacao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import avaliacao.service.CepService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("/cep")
@Api(tags = "cep")
public class CepController extends BaseController {
	@Autowired
	private CepService cepService;


	@GetMapping("/{numeroCep}")
	public ResponseEntity<Object> getByNumeroCep(@PathVariable("numeroCep") Integer numeroCep) {
		return ok(() -> {
			return cepService.findByNumero(numeroCep);
		});
	}


}
