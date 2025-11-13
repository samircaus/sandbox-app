# Sandbox App

A simple sandbox application with REST and GraphQL APIs built with Hono and Cloudflare Workers.

## Setup

```txt
npm install
npm run dev
```

## Deploy

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## GraphQL GET Persisted Queries

The API supports GraphQL queries via HTTP GET requests using query parameters. This is useful for:
- Caching queries at the CDN level
- Bookmarking queries
- Sharing queries via URLs
- Browser-based testing without tools

### Usage

GraphQL queries can be sent via GET request using the `query` parameter:

```
GET /graphql?query={hello}
```

### Examples

#### 1. Hello Query
```
GET /graphql?query={hello}
```

Response:
```json
{
  "data": {
    "hello": "Hello from GraphQL!"
  }
}
```

#### 2. All Users
```
GET /graphql?query={users{id name email role}}
```

Response:
```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Alice",
        "email": "alice@example.com",
        "role": "admin"
      }
    ]
  }
}
```

#### 3. User by ID
```
GET /graphql?query={user(id:"1"){id name email role}}
```

#### 4. All Products
```
GET /graphql?query={products{id name price category inStock}}
```

#### 5. Products by Category
```
GET /graphql?query={products(category:"Electronics"){id name price inStock}}
```

#### 6. Product by ID
```
GET /graphql?query={product(id:"1"){id name price category inStock}}
```

### Complex Queries

You can also use named queries and multiple fields:

```
GET /graphql?query=query GetUserData { user(id:"1") { name email } products { name price } }
```

### Testing

Visit the GraphQL Playground at `/graphql-playground` to:
- Browse all available GET query examples
- Copy ready-to-use URLs
- Test queries interactively
- See formatted responses

Or test directly from the home page where clickable GET query examples are provided.

### URL Encoding

When using special characters in your queries, make sure to properly URL-encode them:

- Spaces: `%20`
- Quotes: `%22` or use single quotes
- Curly braces: `%7B` and `%7D` (though most browsers handle these automatically)

Example:
```
/graphql?query={user(id:%221%22){name}}
```
