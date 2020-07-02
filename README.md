# Diretrizes

- Foi utilizado o banco H2 in memory;
- A aplicação foi desenvolida utilzando o conceito de SOFT DELETE onde os registros não são excluídos fisicamente do banco e sim marcados como excluídos e desconsiderados das consultas possibilitando assim a a recuperação dos mesmos;
- O registro das operações no banco de dados foi implementado utilizando o EnableJpaAuditing e o Envers para versionamento de registros;
- A segurança foi implementada através de JWT
- Foi incluído um teste JMETTER ;
- Para facilitar os testes, é gerada uma carga de clientes na inicialização da aplicação.


## Back

### Compilar  
./mvnw clean package

### executar
java -jar target/back-0.0.1-SNAPSHOT.war 

## Front

### Compilar  
npm install

### executar
npm start

