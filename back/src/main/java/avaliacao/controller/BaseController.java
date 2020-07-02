package avaliacao.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import avaliacao.exception.NegocioException;
import avaliacao.exception.NotFoundException;
import avaliacao.utils.FT;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BaseController {
	@Autowired
	private ModelMapper modelMapper;

	protected <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
		return source.stream().map(element -> modelMapper.map(element, targetClass)).collect(Collectors.toList());
	}

	@SuppressWarnings("unchecked")
	protected ResponseEntity<Object> ok(FT<Object> func) {
		try {
			Object o = func.call();
			if (o instanceof ResponseEntity) {
				return (ResponseEntity<Object>) o;
			} else {
				return ResponseEntity.ok(o);
			}
		} catch (NegocioException e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return erro(e.getMessage(), 500);
		} catch ( NotFoundException e ) {
			e.printStackTrace();
			log.error(e.getMessage());
			return erro(e.getMessage(), 404);			
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			return erro("Ocorreu um erro no Servidor! Contacte a área de desenvolvimento.", 500);
		}
	}

	protected ResponseEntity<Object> erro(String message, Integer statusCode) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("message", message);
		return ResponseEntity.status(statusCode).body(map);
	}

}
