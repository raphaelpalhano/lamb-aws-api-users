<h2 align="center">API de Usuário</h2>

---------------------------------------------------------------

##### :zap: Tecnologias

* Typescript
* NestJS
* TypeORM
* SQS
* MySQL
* Jest

---------------------------------------------------------------

##### :zap: Premissas

* utilize os padrões (diretórios) do Micro Serviço `invoices-service` adotados no `MS8` x
* todas as regras de negócio deverá estar coberta por testes unitários x
* todas as rotas deverão ter pelo menos um test e2e x
* cada registro salvo deverá gerar uma mensagem em uma fila SQS ?
  * Utilize o localstack para isso ?
  * Fila: `SQS_USERS` ?
  * Utilize o`@ssut/nestjs-sqs` para controlar a fila ?

---------------------------------------------------------------

<h4 align="center">CRUD</h4>

##### :zap:  CREATE User

[x ] - rota: `POST /users`

[ x] - payload válido
```ts
{
  name: string,
  email: string,
  password: string,
  birthDate: Date
}
```

[x ] - validar se e-mail é válido (regex ou class validator)

[ x] - não permitir cadastrar e-mail duplicado

[x ] - não permitir cadastro de usuários menores de 18 anos

[x ] - password deverá ter pelo menos 8 caracteres

[ x] - usuário deverá ser salvo com password criptografado

[ x] - retornar o usuário cadastrado

[ x] - retorno válido: User

* não exibir campo password x
* exibir idade calculada do usuário em anosx

[ x] - controller não deverá aceitar campos diferentes do payload válido

---------------------------------------------------------------


##### :zap:  RETRIEVE User

[x ] - rota: `GET /users/:id`

[x ] - retorno válido: User

* não exibir campo password x
* exibir idade calculada do usuário em anos x

[x ] - retornar um erro caso o usuário não seja encontrado

---------------------------------------------------------------

##### :zap:  LIST Users

[ x] - rota: `GET /users`

[x ] - retorno válido: User[]

* não exibir campo password  x
* exibir idade calculada do usuário em anos x

---------------------------------------------------------------

##### :zap: UPDATE User

[x ] - rota: `PATCH /users/:id`

[ x] - payload válido
```ts
{
  name: string,
  password: string,
  birthDate: Date
}
```

[ x] - usuário poderá atualizar um ou mais campos de uma vez

[x ] - retornar o usuário atualizado

[ x] - retorno válido: User

* não exibir campo password x
* exibir idade calculada do usuário em anos x

[x ] - retornar um erro caso o usuário não seja encontrado

[x ] - controller não deverá aceitar campos diferentes do payload válido

---------------------------------------------------------------

##### :zap:  DELETE User

[ x] - rota: `DELETE /users/:id`

[ x ] - retornar o usuário excluído

[ x] - retorno válido: User

* não exibir campo password 
* exibir idade calculada do usuário em anos

[ x] - retornar um erro caso o usuário não seja encontrado

---------------------------------------------------------------

## Consumir as rotas

command: docker compose up -d

command: npm run start:dev

Acessar pasta postman e importar o arquivo no postman

## Responsabilidade de Servicos

### Auth

**Logar**
O usuario precisa passar o email e password

{
	"email: "string",
	"password":  "string" -> hash,

}

Generate Token: 21312asdsajo12je102j12djos

Passar token no header: Berear: Token




URL: http://localhost:3000/api/v1/auth

Payload:
{
    "email": "rafaelo122@gmail.com",
    "password": "ADss431122.1"
}


## Localstack

### Configurations

#### SQS PRODUCERS

AWS_SQS_URL_READY=http://localhost:4566/000000000000/AWS_SQS_URL_READY
AWS_SQS_URL_READY_CREATED_USER=http://localhost:4566/000000000000/AWS_SQS_URL_READY_CREATED_USER
AWS_SQS_URL_READY_DELETED_USER=http://localhost:4566/000000000000/AWS_SQS_URL_READY_DELETED_USER
AWS_SQS_URL_READY_UPDATED_USER=http://localhost:4566/000000000000/AWS_SQS_URL_READY_UPDATED_USER

**Create queue:**
AWS_SQS_URL_READY_CREATED_USER
AWS_SQS_URL_READY_DELETED_USER
AWS_SQS_URL_READY_UPDATED_USER


**start:**
docker compose up -d


## Swagger

URL: http://localhost:3000/api/doc#/

Possui a detalhes e estrutura para validar cada rota.

## Admin user

INSERT INTO `users` ('name', 'email', 'password', 'birth_date', 'age', 'role'), 
VALUES 
('Rafa', 'rafa1Avare@gmail.com', 
'$2a$11$QVWHsZhocLwwckAcYl/gvuFA5muXgyHI8Rb/1QovrgzhFyvWOKHka', '1998-05-22', '23', 'admin');


$2a$11$QVWHsZhocLwwckAcYl/gvuFA5muXgyHI8Rb/1QovrgzhFyvWOKHka
rootUser5662@.


## Novos Desafios

`lambda function, microsservico rodando. Localstack. Request HTTP aciona a lambda (function valida payload e envia o payload para SQS), users pega a mensagem enviada pelo lambda consome a fila e salva o usuario no banco banco.`


`Lambda recebe request manda mensagem no microsservico, o microsservico recebe a mensagem via SQS para gerar o arquivo e manda para o S3, rota para listar os arquivos.`


## AWS CLI

**Create QUEUE SQS**

```sh

echo "Create SQS queue testQueue"
aws \
  sqs create-queue \
  --queue-name AWS_SQS_URL_READY_CREATED_USER \
  --endpoint-url http://localhost:4566/000000000000/


```
