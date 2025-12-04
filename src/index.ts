import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productTemplates, users, products, categories, cities, persons, companies, awards, adventures } from './data'
import { homePageHtml } from './pages/home'
import { restPlaygroundHtml } from './pages/rest-playground'
import { graphqlPlaygroundHtml } from './pages/graphql-playground'
import { graphqlSimplePlaygroundHtml } from './pages/graphql-simple'
import { openapiYaml } from './schemas/openapi'
import { countriesSchema } from './schemas/countries'

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

// REST endpoint: Get all categories
app.get('/categories', (c) => {
  return c.json(categories)
})

// REST endpoint: Get category by ID
app.get('/category/:id', (c) => {
  const id = c.req.param('id')
  const category = categories.find(cat => cat.id === id)
  
  if (!category) {
    return c.json({ error: 'Category not found' }, 404)
  }
  
  return c.json(category)
})

// REST endpoint: Get all products with optional category filter
app.get('/products', (c) => {
  const category = c.req.query('category')
  
  let filteredProducts = products
  
  if (category) {
    filteredProducts = products.filter(p => p.category === category)
  }
  
  return c.json(filteredProducts)
})

// REST endpoint: Get product by ID - Main content only (no price, no rating)
app.get('/product/:id', (c) => {
  const id = c.req.param('id')
  
  // First check if it's a known product ID
  const knownProduct = products.find(p => p.id === id)
  if (knownProduct) {
    // Return only main content (exclude price, inStock, quantity, rating, reviews)
    const { price, inStock, quantity, rating, reviews, ...mainContent } = knownProduct
    return c.json(mainContent)
  }
  
  // Otherwise, randomly select a product template for unknown IDs
  const template = productTemplates[Math.floor(Math.random() * productTemplates.length)]
  
  const product = {
    id: id,
    name: template.name,
    description: template.description,
    currency: 'USD',
    category: template.category,
    imageUrl: `https://example.com/products/${id}.jpg`,
    specifications: template.specifications,
    tags: template.tags
  }
  
  return c.json(product)
})

// REST endpoint: Get product price and availability by ID
app.get('/product/:id/price', (c) => {
  const id = c.req.param('id')
  
  // First check if it's a known product ID
  const knownProduct = products.find(p => p.id === id)
  if (knownProduct) {
    return c.json({
      id: knownProduct.id,
      price: knownProduct.price,
      currency: knownProduct.currency,
      inStock: knownProduct.inStock,
      quantity: knownProduct.quantity
    })
  }
  
  // Otherwise, generate random price data
  const randomPrice = (Math.random() * 200 + 10).toFixed(2)
  const randomQuantity = Math.floor(Math.random() * 200 + 1)
  const inStock = randomQuantity > 0
  
  return c.json({
    id: id,
    price: parseFloat(randomPrice),
    currency: 'USD',
    inStock: inStock,
    quantity: randomQuantity
  })
})

// REST endpoint: Get product rating by ID
app.get('/product/:id/rating', (c) => {
  const id = c.req.param('id')
  
  // First check if it's a known product ID
  const knownProduct = products.find(p => p.id === id)
  if (knownProduct) {
    return c.json({
      id: knownProduct.id,
      rating: knownProduct.rating,
      reviews: knownProduct.reviews
    })
  }
  
  // Otherwise, generate random rating data
  const randomRating = (Math.random() * 2 + 3).toFixed(1) // 3.0 to 5.0
  const randomReviews = Math.floor(Math.random() * 500 + 10)
  
  return c.json({
    id: id,
    rating: parseFloat(randomRating),
    reviews: randomReviews
  })
})

// OpenAPI YAML Schema endpoint
app.get('/openapi.yaml', (c) => {
  c.header('Content-Type', 'text/yaml')
  return c.text(openapiYaml)
})

// GraphQL Schema JSON endpoints
app.get('/graphql/schema.json', (c) => {
  return c.json(graphqlSchema)
})

app.get('/graphql/schema', (c) => {
  return c.json(graphqlSchema)
})

// Countries GraphQL Schema endpoint
app.get('/graphql/countries-schema.json', (c) => {
  return c.json(countriesSchema)
})

// GraphQL endpoint info (lists available queries)
app.get('/graphql/endpoint.json', (c) => {
  const endpointInfo = {
    endpoint: '/graphql',
    methods: ['GET', 'POST'],
    batchModeHeader: 'X-GraphQL-Batch-Mode: true',
    schemaUrl: '/graphql/schema.json',
    playgroundUrl: '/graphql-playground',
    introspectionQuery: '{ __schema { types { name description } } }',
    features: [
      'Schema Introspection',
      'Advanced Filtering (EQUALS, CONTAINS, STARTS_WITH, etc.)',
      'Nested Fragment Queries',
      'Pagination (offset/limit and cursor-based)',
      'Metadata Queries',
      'Tag-based Filtering',
      'Path-based Queries',
      'Batch Query Mode (via X-GraphQL-Batch-Mode header)',
      'Auto-prefixed Batch Responses (_0_, _1_, _2_, etc.)'
    ],
    batchMode: {
      description: 'Automatically prefix each root-level query field with _0_, _1_, _2_, etc.',
      header: 'X-GraphQL-Batch-Mode: true',
      example: 'Add X-GraphQL-Batch-Mode: true header to GET or POST requests',
      exampleQuery: '{ cityList { items { name } } personList { items { firstName } } }',
      exampleResponse: '{ "data": { "_0_cityList": {...}, "_1_personList": {...} } }'
    },
    availableQueries: graphqlSchema.__schema.types
      .find((t: any) => t.name === 'Query')
      ?.fields?.map((f: any) => ({
        name: f.name,
        description: f.description
      })) || [],
    exampleQueries: {
      introspection: '{ __schema { types { name } } }',
      cities: '{ cityList { items { name country population } } }',
      filteredCities: '{ cityList(filter: { country: { _expressions: [{ value: "USA" }] } }) { items { name } } }',
      persons: '{ personList { items { firstName name } } }',
      companies: '{ companyList { items { name ceo { firstName name } } } }',
      pagination: '{ cityList(offset: 0, limit: 5) { items { name } } }'
    }
  }
  return c.json(endpointInfo)
})

// REST Playground endpoint
app.get('/rest-playground', (c) => {
  return c.html(restPlaygroundHtml)
})

// GraphQL Simple Playground endpoint (new simplified version)
app.get('/gql', (c) => {
  return c.html(graphqlSimplePlaygroundHtml)
})

// GraphQL Playground endpoint (old full-featured version - hidden from navigation)
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
    
    // Check for batch mode header
    const batchMode = c.req.header('X-GraphQL-Batch-Mode') === 'true'
    
    // Simple query parser and executor
    const result = executeGraphQLQuery(query, batchMode)
    console.log('📥 GET Incoming:', query, `| Batch Mode: ${batchMode ? 'ON' : 'OFF'} | ✅ Outgoing:`, JSON.stringify(result))
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
    
    // Check for batch mode header
    const batchMode = c.req.header('X-GraphQL-Batch-Mode') === 'true'
    
    // Handle single query
    const query = body.query
    
    if (!query) {
      const errorResponse = { errors: [{ message: 'No query provided' }] }
      console.log('📥 Incoming:', JSON.stringify(body), '| ❌ Outgoing:', JSON.stringify(errorResponse))
      return c.json(errorResponse)
    }
    
    // Execute query with batch mode if header is set
    const result = executeGraphQLQuery(query, batchMode)
    
    console.log('📥 Incoming:', JSON.stringify(body), `| Batch Mode: ${batchMode ? 'ON' : 'OFF'} | ✅ Outgoing:`, JSON.stringify(result))
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

// Import GraphQL utilities
import { graphqlSchema } from './graphql-schema'
import { applyFilters, applyPagination, applyCursorPagination } from './graphql-utils'

// Helper function to apply batch prefix to each root-level field
function applyBatchPrefix(data: any): any {
  const prefixedData: any = {}
  let index = 0
  
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      prefixedData[`_${index}_${key}`] = data[key]
      index++
    }
  }
  
  return prefixedData
}

// Advanced GraphQL query executor with filtering and pagination
// batchMode: if true, automatically prefixes all root fields with _0_, _1_, _2_, etc.
function executeGraphQLQuery(query: string, batchMode: boolean = false) {
  try {
    // Remove query wrapper and extract field names
    const cleanQuery = query.replace(/query\s+\w*\s*{/, '{').trim()
    
    // Handle introspection queries (no prefix for introspection)
    if (query.includes('__schema') || query.includes('IntrospectionQuery')) {
      return { data: graphqlSchema }
    }
    
    // Handle __type introspection (no prefix for introspection)
    if (query.includes('__type')) {
      const typeMatch = query.match(/__type\s*\(\s*name:\s*"([^"]+)"\s*\)/)
      if (typeMatch) {
        const typeName = typeMatch[1]
        const type = graphqlSchema.__schema.types.find((t: any) => t.name === typeName)
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
    if (cleanQuery.match(/users\s*[{(]/)) {
      data.users = graphqlApp.Query.users()
    }
    
    // Check for single user query
    const userMatch = cleanQuery.match(/user\s*\(\s*id:\s*"([^"]+)"\s*\)/)
    if (userMatch) {
      const userId = userMatch[1]
      data.user = graphqlApp.Query.user(userId)
    }
    
    // Check for products query with optional category
    // Updated pattern to handle both with and without spaces/newlines
    const productsMatch = cleanQuery.match(/\bproducts\s*(?:\(\s*category:\s*"(\w+)"\s*\))?[\s{]/)
    if (productsMatch) {
      const category = productsMatch[1]
      data.products = graphqlApp.Query.products(category)
    }
    
    // Check for single product query (getProductById)
    const productMatch = cleanQuery.match(/\bgetProductById\s*\(\s*id:\s*"([^"]+)"\s*\)/)
    if (productMatch) {
      const productId = productMatch[1]
      data.getProductById = graphqlApp.Query.getProductById(productId)
    }
    
    // Check for categories query
    if (cleanQuery.match(/\bcategories\s*[\s{]/)) {
      data.categories = graphqlApp.Query.categories()
    }
    
    // Check for single category query (getCategoryById)
    const categoryMatch = cleanQuery.match(/\bgetCategoryById\s*\(\s*id:\s*"([^"]+)"\s*\)/)
    if (categoryMatch) {
      const categoryId = categoryMatch[1]
      data.getCategoryById = graphqlApp.Query.getCategoryById(categoryId)
    }
    
    // NEW: City queries
    if (cleanQuery.includes('cityList')) {
      const offsetMatch = cleanQuery.match(/offset:\s*(\d+)/)
      const limitMatch = cleanQuery.match(/limit:\s*(\d+)/)
      const offset = offsetMatch ? parseInt(offsetMatch[1]) : undefined
      const limit = limitMatch ? parseInt(limitMatch[1]) : undefined
      
      // Extract filter if present (simplified parsing)
      let filters: any = {}
      if (cleanQuery.includes('filter:')) {
        // Parse population filters
        if (cleanQuery.includes('population:')) {
          filters.population = { _expressions: [] }
          const greaterMatch = cleanQuery.match(/value:\s*(\d+)\s+_operator:\s*GREATER_EQUAL/)
          const lowerMatch = cleanQuery.match(/value:\s*(\d+)\s+_operator:\s*LOWER/)
          if (greaterMatch) {
            filters.population._expressions.push({ value: parseInt(greaterMatch[1]), _operator: 'GREATER_EQUAL' })
          }
          if (lowerMatch) {
            filters.population._expressions.push({ value: parseInt(lowerMatch[1]), _operator: 'LOWER' })
          }
        }
        
        // Parse country filters
        if (cleanQuery.includes('country:')) {
          const logOpMatch = cleanQuery.match(/country:\s*{\s*_logOp:\s*(\w+)/)
          filters.country = {
            _logOp: logOpMatch ? logOpMatch[1] : 'AND',
            _expressions: []
          }
          const countryMatches = cleanQuery.matchAll(/value:\s*"([^"]+)"/g)
          for (const match of countryMatches) {
            if (cleanQuery.indexOf(match[0]) > cleanQuery.indexOf('country:')) {
              filters.country._expressions.push({ value: match[1] })
            }
          }
        }
        
        // Parse name filters with CONTAINS and _ignoreCase
        if (cleanQuery.includes('name:')) {
          const nameValueMatch = cleanQuery.match(/name:\s*{[^}]*value:\s*"([^"]+)"/)
          const containsMatch = cleanQuery.match(/_operator:\s*CONTAINS/)
          const ignoreCaseMatch = cleanQuery.match(/_ignoreCase:\s*true/)
          if (nameValueMatch) {
            filters.name = {
              _expressions: [{
                value: nameValueMatch[1],
                _operator: containsMatch ? 'CONTAINS' : 'EQUALS',
                _ignoreCase: !!ignoreCaseMatch
              }]
            }
          }
        }
        
        // Parse categories filters
        if (cleanQuery.includes('categories:')) {
          const categoryValueMatch = cleanQuery.match(/categories:[^}]*value:\s*"([^"]+)"/)
          const applyMatch = cleanQuery.match(/_apply:\s*(\w+)/)
          if (categoryValueMatch) {
            filters.categories = {
              _expressions: [{
                value: categoryValueMatch[1],
                _apply: applyMatch ? applyMatch[1] : 'AT_LEAST_ONCE'
              }]
            }
          }
          
          // Check for exact array values match
          const valuesMatch = cleanQuery.match(/values:\s*\[([^\]]+)\]/)
          if (valuesMatch) {
            const values = valuesMatch[1].split(',').map((v: string) => v.trim().replace(/"/g, ''))
            filters.categories._expressions = [{ values }]
          }
        }
        
        // Parse _tags filters
        if (cleanQuery.includes('_tags:')) {
          const tagValueMatch = cleanQuery.match(/_tags:[^}]*value:\s*"([^"]+)"/)
          const operatorMatch = cleanQuery.match(/_tags:[^}]*_operator:\s*(\w+)/)
          if (tagValueMatch) {
            filters._tags = {
              _expressions: [{
                value: tagValueMatch[1],
                _operator: operatorMatch ? operatorMatch[1] : 'CONTAINS'
              }]
            }
          }
        }
      }
      
      data.cityList = graphqlApp.Query.cityList(filters, offset, limit)
    }
    
    // City by path
    const cityByPathMatch = cleanQuery.match(/cityByPath\s*\(\s*_path:\s*"([^"]+)"\s*\)/)
    if (cityByPathMatch) {
      data.cityByPath = graphqlApp.Query.cityByPath(cityByPathMatch[1])
    }
    
    // Person queries
    if (cleanQuery.includes('personList')) {
      let filters: any = {}
      if (cleanQuery.includes('filter:')) {
        // Parse name filters for persons
        if (cleanQuery.includes('name:')) {
          const logOpMatch = cleanQuery.match(/name:\s*{\s*_logOp:\s*(\w+)/)
          filters.name = {
            _logOp: logOpMatch ? logOpMatch[1] : 'AND',
            _expressions: []
          }
          
          // Match all value expressions for name
          const nameMatches = cleanQuery.matchAll(/{\s*value:\s*"([^"]+)"\s*(?:,?\s*_operator:\s*(\w+))?\s*}/g)
          for (const match of nameMatches) {
            if (cleanQuery.indexOf(match[0]) > cleanQuery.indexOf('name:')) {
              filters.name._expressions.push({
                value: match[1],
                _operator: match[2] || 'EQUALS'
              })
            }
          }
        }
      }
      
      data.personList = graphqlApp.Query.personList(filters)
    }
    
    const personByPathMatch = cleanQuery.match(/personByPath\s*\(\s*_path:\s*"([^"]+)"\s*\)/)
    if (personByPathMatch) {
      data.personByPath = graphqlApp.Query.personByPath(personByPathMatch[1])
    }
    
    // Company queries
    if (cleanQuery.includes('companyList')) {
      let filters: any = {}
      if (cleanQuery.includes('filter:')) {
        // Parse nested employee filters
        if (cleanQuery.includes('employees:')) {
          const applyMatch = cleanQuery.match(/employees:\s*{\s*_apply:\s*(\w+)/)
          filters.employees = {
            _apply: applyMatch ? applyMatch[1] : 'AT_LEAST_ONCE',
            _match: {}
          }
          
          // Parse nested name filter
          if (cleanQuery.includes('name:')) {
            const nameValueMatch = cleanQuery.match(/name:\s*{[^}]*value:\s*"([^"]+)"/)
            if (nameValueMatch) {
              filters.employees._match.name = {
                _expressions: [{ value: nameValueMatch[1] }]
              }
            }
          }
          
          // Parse nested awards filter
          if (cleanQuery.includes('awards:')) {
            const awardIdMatch = cleanQuery.match(/id:\s*{[^}]*value:\s*"([^"]+)"/)
            const operatorMatch = cleanQuery.match(/id:[^}]*_operator:\s*(\w+)/)
            if (awardIdMatch) {
              filters.employees._match.awards = {
                _match: {
                  id: {
                    _expressions: [{
                      value: awardIdMatch[1],
                      _operator: operatorMatch ? operatorMatch[1] : 'EQUALS'
                    }]
                  }
                }
              }
            }
          }
        }
      }
      
      data.companyList = graphqlApp.Query.companyList(filters)
    }
    
    // Award queries
    if (cleanQuery.includes('awardList')) {
      let filters: any = {}
      if (cleanQuery.includes('filter:')) {
        const idMatch = cleanQuery.match(/id:\s*{[^}]*value:\s*"([^"]+)"/)
        if (idMatch) {
          filters.id = {
            _expressions: [{ value: idMatch[1] }]
          }
        }
      }
      
      data.awardList = graphqlApp.Query.awardList(filters)
    }
    
    // Adventure queries
    if (cleanQuery.includes('adventureList')) {
      let filters: any = {}
      if (cleanQuery.includes('filter:')) {
        // Parse _path STARTS_WITH filter
        if (cleanQuery.includes('_path:')) {
          const pathMatch = cleanQuery.match(/_path:[^}]*value:\s*"([^"]+)"/)
          const operatorMatch = cleanQuery.match(/_path:[^}]*_operator:\s*(\w+)/)
          if (pathMatch) {
            filters._path = {
              _expressions: [{
                value: pathMatch[1],
                _operator: operatorMatch ? operatorMatch[1] : 'EQUALS'
              }]
            }
          }
        }
      }
      
      data.adventureList = graphqlApp.Query.adventureList(filters)
    }
    
    const adventureByPathMatch = cleanQuery.match(/adventureByPath\s*\(\s*_path:\s*"([^"]+)"\s*\)/)
    if (adventureByPathMatch) {
      data.adventureByPath = graphqlApp.Query.adventureByPath(adventureByPathMatch[1])
    }
    
    // Adventure pagination
    if (cleanQuery.includes('adventurePaginated')) {
      const firstMatch = cleanQuery.match(/first:\s*(\d+)/)
      const afterMatch = cleanQuery.match(/after:\s*"([^"]+)"/)
      const first = firstMatch ? parseInt(firstMatch[1]) : undefined
      const after = afterMatch ? afterMatch[1] : undefined
      
      data.adventurePaginated = graphqlApp.Query.adventurePaginated(first, after)
    }
    
    // Apply batch prefix if batch mode is enabled
    const finalData = batchMode ? applyBatchPrefix(data) : data
    
    return { data: finalData }
  } catch (error) {
    return { 
      errors: [{ 
        message: error instanceof Error ? error.message : 'Query execution failed',
        stack: error instanceof Error ? error.stack : undefined
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
    
    getProductById: (id: string) => {
      return products.find(p => p.id === id) || null
    },
    
    products: (category?: string) => {
      if (category) {
        return products.filter(p => p.category === category)
      }
      return products
    },
    
    // Category queries
    categories: () => {
      return categories
    },
    
    getCategoryById: (id: string) => {
      return categories.find(c => c.id === id) || null
    },
    
    // City queries
    cityList: (filters?: any, offset?: number, limit?: number) => {
      let result = [...cities]
      
      // Apply filters
      if (filters && Object.keys(filters).length > 0) {
        result = applyFilters(result, filters)
      }
      
      // Apply pagination
      if (offset !== undefined || limit !== undefined) {
        result = applyPagination(result, offset, limit)
      }
      
      return { items: result }
    },
    
    cityByPath: (_path: string) => {
      const city = cities.find(c => c._path === _path)
      return { item: city || null }
    },
    
    // Person queries
    personList: (filters?: any) => {
      let result = [...persons]
      
      if (filters && Object.keys(filters).length > 0) {
        result = applyFilters(result, filters)
      }
      
      return { items: result }
    },
    
    personByPath: (_path: string) => {
      const person = persons.find(p => p._path === _path)
      return { item: person || null }
    },
    
    // Company queries
    companyList: (filters?: any) => {
      let result = [...companies]
      
      if (filters && Object.keys(filters).length > 0) {
        result = applyFilters(result, filters)
      }
      
      return { items: result }
    },
    
    // Award queries
    awardList: (filters?: any) => {
      let result = [...awards]
      
      if (filters && Object.keys(filters).length > 0) {
        result = applyFilters(result, filters)
      }
      
      return { items: result }
    },
    
    // Adventure queries
    adventureList: (filters?: any) => {
      let result = [...adventures]
      
      if (filters && Object.keys(filters).length > 0) {
        result = applyFilters(result, filters)
      }
      
      return { items: result }
    },
    
    adventureByPath: (_path: string) => {
      const adventure = adventures.find(a => a._path === _path)
      return { item: adventure || null }
    },
    
    adventurePaginated: (first?: number, after?: string) => {
      return applyCursorPagination(adventures, first, after)
    }
  }
}

export default app
