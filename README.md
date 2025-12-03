# Sandbox App

A comprehensive sandbox application with REST and GraphQL APIs featuring advanced filtering, pagination, and schema introspection. Built with Hono and Cloudflare Workers.

## Features

- ✅ **REST API** with OpenAPI specification
- ✅ **Advanced GraphQL API** with filtering, pagination, and introspection
- ✅ **Content Fragment Models** (Cities, Persons, Companies, Awards, Adventures)
- ✅ **Schema Discovery** via JSON endpoints
- ✅ **Interactive Playgrounds** for testing
- ✅ **GET and POST** support for GraphQL queries

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:9000` to explore the API.

## Deploy

```bash
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```bash
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## API Endpoints

### Documentation & Schema

| Endpoint | Description |
|----------|-------------|
| `/` | Home page with links to all endpoints |
| `/openapi.yaml` | OpenAPI/Swagger schema for REST API |
| `/graphql/schema.json` | GraphQL schema introspection (JSON) |
| `/graphql/endpoint.json` | GraphQL endpoint info with examples |

### Playgrounds

| Endpoint | Description |
|----------|-------------|
| `/rest-playground` | Interactive REST API testing interface |
| `/graphql-playground` | Interactive GraphQL testing with 25+ sample queries |

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/product/:id` | GET | Get product by ID (REST) |
| `/graphql` | GET, POST | GraphQL endpoint |

## GraphQL API

### Schema Discovery

Get the complete GraphQL schema and endpoint information:

```bash
# Full schema introspection
curl http://localhost:9000/graphql/schema.json

# Endpoint info with examples
curl http://localhost:9000/graphql/endpoint.json

# Introspect via GraphQL query
curl 'http://localhost:9000/graphql?query={__schema{types{name description}}}'
```

### Advanced Features

#### 1. **Schema Introspection**
Query the schema to discover available types, fields, and operations:

```graphql
{
  __schema {
    types {
      name
      description
    }
  }
}
```

#### 2. **Advanced Filtering**

Support for multiple filter operators:

```graphql
# Case-insensitive contains
query {
  cityList(filter: {
    name: {
      _expressions: [
        {
          value: "SAN"
          _operator: CONTAINS
          _ignoreCase: true
        }
      ]
    }
  }) {
    items {
      name
      country
    }
  }
}
```

**Supported Operators:**
- `EQUALS`, `EQUALS_NOT`
- `CONTAINS`, `STARTS_WITH`
- `GREATER_EQUAL`, `GREATER`, `LOWER`, `LOWER_EQUAL`

**Logical Operators:**
- `AND` (default), `OR`

**Array Operators:**
- `_apply: AT_LEAST_ONCE` (default)
- `_apply: ALL`
- `_apply: NONE`

#### 3. **Nested Filtering**

Filter on nested objects and arrays:

```graphql
# Find companies where ALL employees won the "GS" award
query {
  companyList(filter: {
    employees: {
      _apply: ALL
      _match: {
        awards: {
          _match: {
            id: {
              _expressions: [{ value: "GS", _operator: EQUALS }]
            }
          }
        }
      }
    }
  }) {
    items {
      name
      employees {
        name
        awards {
          title
        }
      }
    }
  }
}
```

#### 4. **Pagination**

**Offset/Limit:**
```graphql
{
  cityList(offset: 5, limit: 5) {
    items {
      name
    }
  }
}
```

**Cursor-based:**
```graphql
{
  adventurePaginated(first: 5, after: "cursor_string") {
    edges {
      cursor
      node {
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
```

### Content Fragment Models

Available models with sample data:

- **Cities** (7 items): Basel, Berlin, Bucharest, San Francisco, San Jose, Stuttgart, Zurich
- **Persons** (8 items): Steve Jobs, Adam Smith, Lara Croft, and more
- **Companies** (3 items): Apple Inc., Little Pony Inc., NextStep Inc.
- **Awards** (2 items): Gameblitz, Gamestar
- **Adventures** (3 items): Cycling tours and surf camps

### GET Queries (Persisted)

GraphQL queries via HTTP GET for CDN caching and bookmarking:

```bash
# Schema introspection
GET /graphql?query={__schema{types{name}}}

# All cities
GET /graphql?query={cityList{items{name country population}}}

# Single city by path
GET /graphql?query={cityByPath(_path:"/content/dam/sample-content-fragments/cities/berlin"){item{name country}}}

# All persons
GET /graphql?query={personList{items{firstName name}}}

# Companies with CEO
GET /graphql?query={companyList{items{name ceo{firstName name}}}}

# Adventures
GET /graphql?query={adventureList{items{title adventureType price}}}
```

### POST Queries

Send complex queries with filters via POST:

```bash
curl -X POST http://localhost:9000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { cityList(filter: { population: { _expressions: [{ value: 400000, _operator: GREATER_EQUAL }] } }) { items { name population } } }"
  }'
```

### Batch Query Mode

Execute multiple queries and get automatically prefixed responses for easier handling.

Add the `X-GraphQL-Batch-Mode: true` header to any request:

```bash
curl -X POST http://localhost:9000/graphql \
  -H "Content-Type: application/json" \
  -H "X-GraphQL-Batch-Mode: true" \
  -d '{
    "query": "{ cityList(limit: 3) { items { name } } personList { items { firstName } } }"
  }'
```

**Response:**
```json
{
  "data": {
    "_0_cityList": { "items": [...] },
    "_1_personList": { "items": [...] }
  }
}
```

**How it works:**
- Add `X-GraphQL-Batch-Mode: true` as a header (like any other header)
- Each root-level query field is automatically prefixed with `_0_`, `_1_`, `_2_`, etc.
- Works with both GET and POST requests

**Benefits:**
- Easier to merge multiple query responses
- Compatible with systems expecting prefixed field names (e.g., AEM GraphQL)
- Automatic field indexing
- No query rewriting needed

### Testing

Visit `/graphql-playground` to explore 25+ pre-configured queries including:
- Schema introspection examples
- Basic and filtered queries
- Nested fragment queries
- Pagination examples
- Advanced filtering demonstrations
