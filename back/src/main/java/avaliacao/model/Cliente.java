package avaliacao.model;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;

import envers.CustomAuditRevisionListener;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Audited
@AuditTable(value="auditoria_cliente") 
@EntityListeners(CustomAuditRevisionListener.class)
@EqualsAndHashCode(callSuper = false, of = "id")
public class Cliente extends BasicEntity{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Size(min = 3, max = 100, message = "Minimo 3 máximo 100")
  @Column(unique = true, nullable = false)
  private String nome;

  @Column(nullable = false, length = 11)
  private String cpf;

  @Column(nullable = false, length = 10)
  private String cep;

  @Column(nullable = false, length = 100)
  private String logradouro;

  @Column(nullable = false, length = 100)
  private String bairro; 
 
  @Column(nullable = false, length = 100)
  private String cidade;
  
  @Column(nullable = false, length = 2)
  private String uf;  
  
  @Column(length = 100)
  private String complemento;
  
  @Transient
  List<ClienteTelefone> telefones = new LinkedList<>();
  
  @Transient
  List<ClienteEmail> emails = new LinkedList<>();

  
  public void addTelefone(ClienteTelefone o) {
      this.telefones.add(o);
  }

  public void addEmail(ClienteEmail o) {
      this.emails.add(o);
  }
  
  
}
