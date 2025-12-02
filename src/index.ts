import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productTemplates, users, products, cities, persons, companies, awards, adventures } from './data'
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

// Import GraphQL utilities
import { graphqlSchema } from './graphql-schema'
import { applyFilters, applyPagination, applyCursorPagination } from './graphql-utils'

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

// Parse filter arguments from query (simplified parser)
function parseFilterArgs(queryStr: string): any {
  const filter: any = {}
  
  // Extract filter patterns (simplified)
  const patterns = [
    // Match: fieldName: { _expressions: [{ value: "X", _operator: Y }] }
    /(\w+):\s*{\s*_expressions:\s*\[\s*{\s*value:\s*"([^"]+)"\s*(?:,\s*_operator:\s*(\w+))?\s*}\s*\]\s*}/g,
    // Match: fieldName: { value: "X" }
    /(\w+):\s*{\s*value:\s*"([^"]+)"\s*}/g
  ]
  
  return filter
}

// Advanced GraphQL query executor with filtering and pagination
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
    const productsMatch = cleanQuery.match(/products(?:\s*\(\s*category:\s*"(\w+)"\s*\))?/)
    if (productsMatch && !cleanQuery.match(/(?:getProduct|product\s*\()/)) {
      const category = productsMatch[1]
      data.products = graphqlApp.Query.products(category)
    }
    
    // Check for single product query
    const productMatch = cleanQuery.match(/(?:getProductById|product)\s*\(\s*id:\s*"([^"]+)"\s*\)/)
    if (productMatch) {
      const productId = productMatch[1]
      data.getProductById = graphqlApp.Query.getProductById(productId)
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
    
    // Apply batch prefix if provided
    const finalData = addBatchPrefix(data, batchIndex)
    
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
