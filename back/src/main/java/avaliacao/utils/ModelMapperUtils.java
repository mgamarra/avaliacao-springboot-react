package avaliacao.utils;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;

import avaliacao.dto.IdTextDTO;

public class ModelMapperUtils {

	public static void registerMappers(ModelMapper mm) {
		
		mm.addConverter(
			new Converter<Integer, IdTextDTO>() {
				public IdTextDTO convert(MappingContext<Integer, IdTextDTO> context) {
					Integer s = context.getSource();
					if (s == null) {
						return null;
					} else {
						IdTextDTO o = new IdTextDTO();
						o.setId(s);
						return o;
					}
				}
			}
		);

		mm.addConverter(
			new Converter<IdTextDTO, Integer>() {
				public Integer convert(MappingContext<IdTextDTO, Integer> context) {
					IdTextDTO s = context.getSource();
					if (s == null || s.getId() == null) {
						return null;
					} else {
						return s.getId();
					}
				}
			}
		);
		
//		Converter<ClienteTelefone, ClienteTelefoneDTO> myConverter = new Converter<ClienteTelefone, ClienteTelefoneDTO>() {
//			public ClienteTelefoneDTO convert(MappingContext<ClienteTelefone, ClienteTelefoneDTO> context) {
//				ClienteTelefone s = context.getSource();
//				ClienteTelefoneDTO d = context.getDestination();
//				if (d == null) {
//					d =new ClienteTelefoneDTO();	
//				}
//				d.setId(s.getId());
//				d.setNumero(s.getNumero());
//				d.setTipo(new IdTextDTO(s.getTipo(), s.getTipo().toString()));
//				return d;
//			}
//		};

//		mm.addConverter(myConverter);
	}
}
