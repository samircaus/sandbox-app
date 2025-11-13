import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productTemplates, users, products } from './data'
import { homePageHtml } from './pages/home'
import { restPlaygroundHtml } from './pages/rest-playground'
import { graphqlPlaygroundHtml } from './pages/graphql-playground'
import { openapiYaml } from './schemas/openapi'

const app = new Hono()

// Configure CORS to allow requests from localhost and other origins
app.use('/*', cors({
  origin: (origin) => {
    // Allow localhost on any port
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return origin
    }
    // Allow your deployed domain
    if (origin.includes('samircaus.workers.dev')) {
      return origin
    }
    // For development, allow all origins (you can restrict this in production)
    return '*'
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

app.get('/', (c) => {
  return c.html(homePageHtml)
})

app.get('/product/:id', (c) => {
  const id = c.req.param('id')
  
  // Randomly select a product template
  const template = productTemplates[Math.floor(Math.random() * productTemplates.length)]
  
  // Randomize various properties
  const randomPrice = (Math.random() * 200 + 10).toFixed(2)
  const randomRating = (Math.random() * 2 + 3).toFixed(1) // 3.0 to 5.0
  const randomReviews = Math.floor(Math.random() * 500 + 10)
  const randomQuantity = Math.floor(Math.random() * 200 + 1)
  const inStock = randomQuantity > 0
  
  const product = {
    id: id,
    name: template.name,
    description: template.description,
    price: parseFloat(randomPrice),
    currency: 'USD',
    category: template.category,
    inStock: inStock,
    quantity: randomQuantity,
    imageUrl: `https://example.com/products/${id}.jpg`,
    rating: parseFloat(randomRating),
    reviews: randomReviews,
    specifications: template.specifications,
    tags: template.tags
  }
  
  return c.json(product)
})

// OpenAPI YAML Schema endpoint
app.get('/openapi.yaml', (c) => {
  c.header('Content-Type', 'text/yaml')
  return c.text(openapiYaml)
})

// REST Playground endpoint
app.get('/rest-playground', (c) => {
  return c.html(restPlaygroundHtml)
})

// GraphQL Playground endpoint
app.get('/graphql-playground', (c) => {
  return c.html(graphqlPlaygroundHtml)
})

// Simple GraphQL handler endpoint (GET for introspection)
app.get('/graphql', async (c) => {
  try {
    const query = c.req.query('query')
    
    if (!query) {
      // Return schema info for basic GET requests
      return c.json({
        data: {
          message: 'GraphQL endpoint is active. Use POST requests with a query or add ?query=... for GET requests.'
        }
      })
    }
    
    // Simple query parser and executor
    const result = executeGraphQLQuery(query)
    console.log('📥 GET Incoming:', query, '| ✅ Outgoing:', JSON.stringify(result))
    return c.json(result)
  } catch (error) {
    const errorResponse = { 
      errors: [{ 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }] 
    }
    console.log('❌ GET Error:', JSON.stringify(errorResponse))
    return c.json(errorResponse)
  }
})

// Simple GraphQL handler endpoint (POST for mutations and queries)
app.post('/graphql', async (c) => {
  let body: any = {}
  try {
    body = await c.req.json()
    
    // Handle batch requests (array of queries)
    if (Array.isArray(body)) {
      console.log('📦 Batch request with', body.length, 'queries')
      const results = body.map((item, index) => {
        const query = item.query
        if (!query) {
          return { errors: [{ message: 'No query provided' }] }
        }
        const result = executeGraphQLQuery(query, index)
        return result
      })
      console.log('📥 Batch Incoming:', JSON.stringify(body), '| ✅ Batch Outgoing:', JSON.stringify(results))
      return c.json(results)
    }
    
    // Handle single query
    const query = body.query
    
    if (!query) {
      const errorResponse = { errors: [{ message: 'No query provided' }] }
      console.log('📥 Incoming:', JSON.stringify(body), '| ❌ Outgoing:', JSON.stringify(errorResponse))
      return c.json(errorResponse)
    }
    
    // Check if batch index is provided in query
    const batchIndex = body.batchIndex
    
    // Simple query parser and executor
    const result = executeGraphQLQuery(query, batchIndex)
    console.log('📥 Incoming:', JSON.stringify(body), '| ✅ Outgoing:', JSON.stringify(result))
    return c.json(result)
  } catch (error) {
    const errorResponse = { 
      errors: [{ 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }] 
    }
    console.log('📥 Incoming:', JSON.stringify(body), '| ❌ Outgoing:', JSON.stringify(errorResponse))
    return c.json(errorResponse)
  }
})

// GraphQL Schema Definition for Introspection
const graphqlSchema = {
  __schema: {
    queryType: { name: 'Query' },
    mutationType: null,
    subscriptionType: null,
    types: [
      {
        kind: 'OBJECT',
        name: 'Query',
        description: 'The root query type',
        fields: [
          {
            name: 'hello',
            description: 'Returns a greeting message',
            args: [],
            type: { kind: 'SCALAR', name: 'String', ofType: null },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'user',
            description: 'Get a single user by ID',
            args: [
              {
                name: 'id',
                description: 'User ID',
                type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
                defaultValue: null
              }
            ],
            type: { kind: 'OBJECT', name: 'User', ofType: null },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'users',
            description: 'Get all users',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'LIST', name: null, ofType: { kind: 'OBJECT', name: 'User' } } },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'product',
            description: 'Get a single product by ID',
            args: [
              {
                name: 'id',
                description: 'Product ID',
                type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
                defaultValue: null
              }
            ],
            type: { kind: 'OBJECT', name: 'Product', ofType: null },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'products',
            description: 'Get all products, optionally filtered by category',
            args: [
              {
                name: 'category',
                description: 'Filter by category',
                type: { kind: 'SCALAR', name: 'String', ofType: null },
                defaultValue: null
              }
            ],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'LIST', name: null, ofType: { kind: 'OBJECT', name: 'Product' } } },
            isDeprecated: false,
            deprecationReason: null
          }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'User',
        description: 'A user object',
        fields: [
          {
            name: 'id',
            description: 'User ID',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'name',
            description: 'User name',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'email',
            description: 'User email',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'role',
            description: 'User role',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
            isDeprecated: false,
            deprecationReason: null
          }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'Product',
        description: 'A product object',
        fields: [
          {
            name: 'id',
            description: 'Product ID',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'name',
            description: 'Product name',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'price',
            description: 'Product price',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'Float' } },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'category',
            description: 'Product category',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'String' } },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: 'inStock',
            description: 'Whether product is in stock',
            args: [],
            type: { kind: 'NON_NULL', name: null, ofType: { kind: 'SCALAR', name: 'Boolean' } },
            isDeprecated: false,
            deprecationReason: null
          }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'SCALAR',
        name: 'String',
        description: 'The `String` scalar type represents textual data',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'SCALAR',
        name: 'Float',
        description: 'The `Float` scalar type represents signed double-precision fractional values',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'SCALAR',
        name: 'Boolean',
        description: 'The `Boolean` scalar type represents `true` or `false`',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      }
    ],
    directives: []
  }
}

// Helper function to add batch prefix to keys
function addBatchPrefix(data: any, batchIndex?: number): any {
  if (batchIndex === undefined || batchIndex === null) {
    return data
  }
  
  const prefix = `_${batchIndex}_`
  const prefixedData: any = {}
  
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      prefixedData[prefix + key] = data[key]
    }
  }
  
  return prefixedData
}

// Simple GraphQL query executor
function executeGraphQLQuery(query: string, batchIndex?: number) {
  try {
    // Remove query wrapper and extract field names
    const cleanQuery = query.replace(/query\s+\w*\s*{/, '{').trim()
    
    // Handle introspection queries (no prefix for introspection)
    if (query.includes('__schema') || query.includes('IntrospectionQuery')) {
      return { data: graphqlSchema }
    }
    
    // Handle __type introspection (no prefix for introspection)
    if (query.includes('__type')) {
      const typeMatch = query.match(/__type\s*\(\s*name:\s*"(\w+)"\s*\)/)
      if (typeMatch) {
        const typeName = typeMatch[1]
        const type = graphqlSchema.__schema.types.find(t => t.name === typeName)
        return { data: { __type: type || null } }
      }
    }
    
    // Collect all query results
    const data: any = {}
    
    // Check for hello
    if (cleanQuery.includes('hello')) {
      data.hello = graphqlApp.Query.hello()
    }
    
    // Check for users query
    if (cleanQuery.match(/users\s*{/)) {
      data.users = graphqlApp.Query.users()
    }
    
    // Check for single user query
    const userMatch = cleanQuery.match(/user\s*\(\s*id:\s*"(\w+)"\s*\)/)
    if (userMatch) {
      const userId = userMatch[1]
      data.user = graphqlApp.Query.user(userId)
    }
    
    // Check for products query with optional category
    const productsMatch = cleanQuery.match(/products(?:\s*\(\s*category:\s*"(\w+)"\s*\))?/)
    if (productsMatch && !cleanQuery.match(/product\s*\(\s*id:/)) {
      const category = productsMatch[1]
      data.products = graphqlApp.Query.products(category)
    }
    
    // Check for single product query
    const productMatch = cleanQuery.match(/product\s*\(\s*id:\s*"(\w+)"\s*\)/)
    if (productMatch) {
      const productId = productMatch[1]
      data.product = graphqlApp.Query.product(productId)
    }
    
    // Apply batch prefix if provided
    const finalData = addBatchPrefix(data, batchIndex)
    
    return { data: finalData }
  } catch (error) {
    return { 
      errors: [{ 
        message: error instanceof Error ? error.message : 'Query execution failed' 
      }] 
    }
  }
}

export const graphqlApp = {
  Query: {
    hello: () => {
      return 'Hello from GraphQL!'
    },
    
    user: (id: string) => {
      return users.find(u => u.id === id) || null
    },
    
    users: () => {
      return users
    },
    
    product: (id: string) => {
      return products.find(p => p.id === id) || null
    },
    
    products: (category?: string) => {
      if (category) {
        return products.filter(p => p.category === category)
      }
      return products
    }
  }
}

export default app
