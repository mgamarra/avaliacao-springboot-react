package avaliacao.repository;

import avaliacao.model.Cliente;
import avaliacao.model.User;

public interface ClienteRepository extends SoftDeleteCrudRepository<Cliente, Integer> {


  User findByNome(String nome);



}
