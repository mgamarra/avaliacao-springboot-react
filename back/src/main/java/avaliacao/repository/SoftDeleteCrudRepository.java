package avaliacao.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import avaliacao.model.BasicEntity;

@NoRepositoryBean
public interface SoftDeleteCrudRepository<T extends BasicEntity, ID extends Integer> extends CrudRepository<T, ID> {
  @Override
  @Transactional
  @Query("select e from #{#entityName} e where e.isActive = true")
  List<T> findAll();

  @Transactional
  @Query("select e from #{#entityName} e where e.id in ?1 and e.isActive = true")
  Iterable<T> findAll(Iterable<ID> ids);

  @Transactional
  @Query("select e from #{#entityName} e where e.id = ?1 and e.isActive = true")
  T findOne(ID id);

  //Look up deleted entities
  @Query("select e from #{#entityName} e where e.isActive = false")
  @Transactional
  List<T> findInactive();

  @Override
  @Transactional
  @Query("select count(e) from #{#entityName} e where e.isActive = true")
  long count();

  @Transactional
  default boolean exists(ID id) {
      return findOne(id) != null;
  }

  @Query("update #{#entityName} e set e.isActive=false where e.id = ?1")
  @Transactional
  @Modifying
  void delete(Integer id);

  @Override
  @Transactional
  default void deleteById(ID id) {
	  delete(id);
  }

  @Override
  @Transactional
  default void delete(T entity) {
      delete(entity.getId());
  }

  @Transactional
  default void delete(Iterable<? extends T> entities) {
      entities.forEach(entitiy -> delete(entitiy.getId()));
  }

  @Override
  @Query("update #{#entityName} e set e.isActive=false")
  @Transactional
  @Modifying
  void deleteAll();
}