
# Blossom Back Developer Test

Build a REST API that allows clients to fetch information from either the
Pokémon or Digimon franchise. The API must support versioning, include a
flexible metadata object in the request, and store all request outcomes.


## Tech Stack

**Server:** TypeScript, Node, Express

**Extras:** SQLite, PostgreSQL, Docker


## API Reference

#### Get Pokemon or Digimon

```http
  GET /api/:franchise/:version
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `metadata` | `string` | Object with id or name |
| `config:` | `string` | Generic object  |


## Run project

Install dependencies

```bash
  npm install
```

Build the project

```bash
  npm run build
```

Start the server

```bash
  npm run start
```


## Docker

To deploy with docker run

```bash
  docker compose up --build
```


## Autor

- [@Luis Herrera](https://github.com/luiferherrera)

