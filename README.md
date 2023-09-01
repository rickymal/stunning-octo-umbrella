# API de Filmes

## Descrição

Uma API RESTful para gerenciar informações sobre filmes. As funcionalidades incluem operações CRUD (Criação, Recuperação, Atualização, Deleção) para filmes.

## Estrutura do Projeto

### Tecnologias Usadas
- Linguagem de Programação: Typescripts
- Bibliotecas
  - framework Nest.js

## Configuração e Instalação

```bash
# Clone este repositório
git clone git@github.com:rickymal/stunning-octo-umbrella.git

# Navegue até o diretório do projeto
cd stunning-octo-umbrella

# Instale as dependências
# (Isso pode variar dependendo de sua stack tecnológica)

# Execute o aplicativo
go get .
got run main.go

nota: é necessário tem o Go instalado!
```

## API Endpoints

### Criar um novo filme

- **URL:** `/movies`
- **Método:** `POST`

**Corpo da Requisição**

```json
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010
}
```

**Resposta**

```json
{
  "id": "1",
  "message": "Movie created successfully"
}
```

### Listar todos os filmes

- **URL:** `/movies`
- **Método:** `GET`

**Resposta**

```json
[
  {
    "id": "1",
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010
  }
]
```

### Obter um filme pelo ID

- **URL:** `/movies/{id}`
- **Método:** `GET`

**Resposta**

```json
{
  "id": "1",
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010
}
```

### Atualizar um filme

- **URL:** `/movies/{id}`
- **Método:** `PUT`

**Corpo da Requisição**

```json
{
  "title": "New Title",
  "director": "New Director",
  "year": 2022
}
```

**Resposta**

```json
{
  "message": "Movie updated successfully"
}
```

### Deletar um filme

- **URL:** `/movies/{id}`
- **Método:** `DELETE`

**Resposta**

```json
{
  "message": "Movie deleted successfully"
}
```
