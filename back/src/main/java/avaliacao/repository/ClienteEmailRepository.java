package avaliacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import avaliacao.model.Cliente;
import avaliacao.model.ClienteEmail;

public interface ClienteEmailRepository extends SoftDeleteCrudRepository<ClienteEmail, Integer> {

	@Query("select o from ClienteEmail o where o.cliente = ?1 and o.isActive = true" )
	List<ClienteEmail> findByCliente(Cliente o);

	@Override
	@Query("select o from ClienteEmail o join fetch o.cliente where o.isActive = true" )
	List<ClienteEmail> findAll();

}
