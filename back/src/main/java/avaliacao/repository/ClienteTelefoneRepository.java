package avaliacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import avaliacao.model.Cliente;
import avaliacao.model.ClienteTelefone;

public interface ClienteTelefoneRepository extends SoftDeleteCrudRepository<ClienteTelefone, Integer> {

	@Query("select o from ClienteTelefone o where o.cliente = ?1 and o.isActive = true" )
	List<ClienteTelefone >findByCliente(Cliente o);

	@Query("select o from ClienteTelefone o join fetch o.cliente where o.isActive = true" )
	List<ClienteTelefone> findAll();
	
	
}
