package avaliacao.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Audited
@AuditTable(value="auditoria_clienteemail") 
@EqualsAndHashCode(callSuper = false, of = "id")
public class ClienteEmail extends BasicEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 100)
	private String email;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cliente", nullable = true)
	private Cliente cliente;

}
