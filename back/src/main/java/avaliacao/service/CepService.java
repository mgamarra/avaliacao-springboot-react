package avaliacao.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import avaliacao.dto.CepDTO;
import avaliacao.exception.NotFoundException;

@Service
public class CepService {
	private static Map<Integer, CepDTO> cepCache = new HashMap<Integer, CepDTO>(); 
	
	public CepDTO findByNumero(Integer numeroCep) {
		CepDTO cep = cepCache.get(numeroCep);
		if (cep == null) {
			RestTemplate restTemplate = new RestTemplate();
			String resourceUrl = "https://viacep.com.br/ws/%s/json/";
			
			try {
				cep = restTemplate.getForObject(String.format(resourceUrl, numeroCep), CepDTO.class);
			} catch (Exception e) {
				throw new NotFoundException("CEP não encontrado " + numeroCep + " "+ e.getMessage());
			}
			if ((cep.getCep() == null) || (cep.getCep().trim().isEmpty())) {
				throw new NotFoundException("CEP não encontrado " + numeroCep);
			}
			cepCache.put(numeroCep, cep);
		}
		return cep;
	}
}
