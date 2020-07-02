package avaliacao.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import avaliacao.exception.NegocioException;
import avaliacao.model.Cliente;
import avaliacao.model.ClienteEmail;
import avaliacao.model.ClienteTelefone;
import avaliacao.repository.ClienteEmailRepository;
import avaliacao.repository.ClienteRepository;
import avaliacao.repository.ClienteTelefoneRepository;
import avaliacao.utils.Validators;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository repository;

	@Autowired
	private ClienteTelefoneRepository clienteTelefoneRepository;

	@Autowired
	private ClienteEmailRepository clienteEmailRepository;

	@Transactional
	public Cliente save(Cliente o) {
		return saveOrUpdate(o);
	}

	@Transactional
	public Cliente update(Cliente o) {
		return saveOrUpdate(o);
	}

	private Cliente saveOrUpdate(Cliente o) {

		o.getTelefones().forEach(e -> {
			if (e.isExcluido()) {
				clienteTelefoneRepository.delete(e.getId());
				return;
			}
			e.setCliente(o);
		});

		o.getEmails().stream().forEach(e -> {
			if (e.isExcluido()) {
				clienteEmailRepository.delete(e.getId());
				return;
			}
			e.setCliente(o);	
		});
		
		o.getEmails().removeIf(item -> item.isExcluido());
		o.getTelefones().removeIf(item -> item.isExcluido());
		
		validar(o);

		repository.save(o);
		clienteEmailRepository.saveAll(o.getEmails());
		clienteTelefoneRepository.saveAll(o.getTelefones());
		return o;
	}

	private void validar(Cliente o) {
		List<String> erros = new ArrayList<String>();
		if (Validators.listVazia(o.getEmails())) {
			erros.add("Pelo menos um e-mail deve ser cadastrado");
		}

		if (Validators.listVazia(o.getTelefones())) {
			erros.add("Pelo menos um telefone deve ser cadastrado");
		}

		if (erros.size() > 0) {
			throw new NegocioException(erros.toString());
		}
	}

	public Cliente findById(Integer id) {
		Cliente c = repository.findOne(id);
		if (c == null) {
			throw new NegocioException("Cliente não existe");
		}
		recuperaRelacionamentos(c);
		return c;
	}

	private void recuperaRelacionamentos(Cliente o) {
		if (o == null) {
			return;
		}
		List<ClienteEmail> lemail = clienteEmailRepository.findByCliente(o);
		o.setEmails(lemail);

		List<ClienteTelefone> ltelefone = clienteTelefoneRepository.findByCliente(o);
		o.setTelefones(ltelefone);

	}

	public List<Cliente> findAll() {
		List<Cliente> lc = clienteEmailRepository.findAll().stream()
				.collect(Collectors.groupingBy(ClienteEmail::getCliente)).entrySet().stream().map(itemsByCliente -> {
					final List<ClienteEmail> items = itemsByCliente.getValue();
					final Cliente c = itemsByCliente.getKey();
					items.forEach(c::addEmail);
					return c;
				}).collect(Collectors.toList());

		clienteTelefoneRepository.findAll().stream().collect(Collectors.groupingBy(ClienteTelefone::getCliente))
				.entrySet().stream().map(itemsByCliente -> {
					final List<ClienteTelefone> items = itemsByCliente.getValue();
					final Cliente c = itemsByCliente.getKey();
					items.forEach(c::addTelefone);
					if (!lc.contains(c)) {
						lc.add(c);
					}
					return c;
				}).collect(Collectors.toList());
		return lc;
	}

	@Transactional
	public void deleteById(Integer id) {
		Cliente c = findById(id);
		clienteEmailRepository.delete(c.getEmails());
		clienteTelefoneRepository.delete(c.getTelefones());
		repository.delete(id);

	}

}
