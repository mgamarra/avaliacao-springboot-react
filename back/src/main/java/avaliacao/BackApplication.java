package avaliacao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.google.gson.Gson;

import avaliacao.model.Cliente;
import avaliacao.model.Role;
import avaliacao.model.User;
import avaliacao.service.ClienteService;
import avaliacao.service.UserService;
import avaliacao.utils.ModelMapperUtils;

@SpringBootApplication
public class BackApplication implements CommandLineRunner {

	@Autowired
	UserService userService;

	@Autowired
	ClienteService clienteService;

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper mm = new ModelMapper();
		ModelMapperUtils.registerMappers(mm);
		return mm;
	}

	@Override
	public void run(String... params) throws Exception {

		User admin = new User();
		admin.setUsername("admin");
		admin.setPassword("123456");
		admin.setEmail("admin@email.com");
		admin.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_ADMIN)));

		userService.signup(admin);

		User client = new User();
		client.setUsername("comum");
		client.setPassword("123456");
		client.setEmail("comum@email.com");
		client.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_COMUM)));

		userService.signup(client);

		Gson gson = new Gson();
		Random rnd = new Random();
		String JSON = "{\"nome\":\"nome random\",\"cpf\":\"<cpf>\",\"cep\":\"random\",\"logradouro\":\"logradouro random\",\"bairro\":\"bairro random\",\"cidade\":\"cidade random\",\"uf\":\"DF\",\"complemento\":\"complemento random\",\"telefones\":[{\"numero\":\"random\",\"tipo\":1}],\"emails\":[{\"email\":\"random@email.com\"}]}";    

		String[] cpfs = {"27475172090","45469098702","53312065909","38383069456","42260597785","15729479344","07717357232","78118325776","86713410979","35768316655"};
		
	    for (int i = 0; i < 10; i++) {
	        int n = 10000000 + rnd.nextInt(90000000);
			String s = JSON.replaceAll("random", String.valueOf(n)).replace("<cpf>", cpfs[i]);
			Cliente c = gson.fromJson(s , Cliente.class);
			clienteService.save(c);
		}
	}



}
