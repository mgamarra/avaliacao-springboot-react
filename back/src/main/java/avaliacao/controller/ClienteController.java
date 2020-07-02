package avaliacao.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import avaliacao.dto.ClienteDTO;
import avaliacao.dto.ResultadoConsultaDTO;
import avaliacao.model.Cliente;
import avaliacao.service.ClienteService;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("/clientes")
@Api(tags = "clientes")
public class ClienteController extends BaseController {
	@Autowired
	private ClienteService clienteService;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping
	public ResponseEntity<Object> getAllClientes() {
		return ok(() -> {
			List<Cliente> l = clienteService.findAll();
			ResultadoConsultaDTO result = new ResultadoConsultaDTO();
			result.pagina = 1;
			result.paginas = 1;
			result.registros = l.size();
			result.dados = mapList(l, ClienteDTO.class);
			return result;
		});
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> getClienteById(@PathVariable("id") Integer id) {
		return ok(() -> {
			Cliente o = clienteService.findById(id);
			return (modelMapper.map(o, ClienteDTO.class));
		});
	}

	@PostMapping
	public ResponseEntity<Object> createCliente(@RequestBody ClienteDTO o) {
		return ok(() -> {
			Cliente c = clienteService.save(modelMapper.map(o, Cliente.class));
			return modelMapper.map(c, ClienteDTO.class);
		});
		
	}

	@PutMapping
	public ResponseEntity<Object> updateCliente(@RequestBody ClienteDTO o) {
		return ok(() -> {
			Cliente c = clienteService.update(modelMapper.map(o, Cliente.class));
			return modelMapper.map(c, ClienteDTO.class);
		});
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteCliente(@PathVariable("id") Integer id) {
		return ok(() -> {
			clienteService.deleteById(id);
			Map<String, String> map = new HashMap<String, String>();
			map.put("message", "Registro deletado");
			return map;
		});
	}


}
