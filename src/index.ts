import { Hono } from 'hono'
import { productTemplates, users, products } from './data'

const app = new Hono()

app.get('/', (c) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple Sandbox App</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          line-height: 1.6;
        }
        h1 {
          color: #333;
        }
        a {
          color: #0066cc;
          text-decoration: none;
          font-weight: 500;
        }
        a:hover {
          text-decoration: underline;
        }
        .product-links {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      </style>
    </head>
    <body>
      <h1>Simple Sandbox App</h1>
      <p>Welcome! This is a sample product API.</p>
      <div class="product-links">
        <p>Try these sample REST endpoints:</p>
        <a href="/product/1">→ Product 1</a>
        <a href="/product/42">→ Product 42</a>
        <a href="/product/xyz">→ Product XYZ</a>
      </div>
      <div class="product-links">
        <p>GraphQL Endpoint:</p>
        <a href="/graphql-playground">→ GraphQL Playground</a>
      </div>
    </body>
    </html>
  `
  return c.html(html)
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

// GraphQL Playground endpoint
app.get('/graphql-playground', (c) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GraphQL Playground</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
        }
        h1 {
          color: #333;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #666;
          margin-bottom: 30px;
        }
        .layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .sidebar {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
          font-size: 18px;
          margin-bottom: 15px;
          color: #333;
        }
        h3 {
          font-size: 14px;
          margin-bottom: 10px;
          color: #666;
          font-weight: 600;
        }
        .query-list {
          list-style: none;
        }
        .query-item {
          padding: 10px;
          margin-bottom: 8px;
          background: #f8f9fa;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .query-item:hover {
          background: #e9ecef;
        }
        .query-item.active {
          background: #0066cc;
          color: white;
        }
        .query-name {
          font-weight: 600;
          margin-bottom: 4px;
        }
        .query-desc {
          font-size: 12px;
          color: #666;
        }
        .query-item.active .query-desc {
          color: #e3f2fd;
        }
        textarea {
          width: 100%;
          min-height: 200px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 13px;
          resize: vertical;
          background: #f8f9fa;
        }
        button {
          background: #0066cc;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: background 0.2s;
        }
        button:hover {
          background: #0052a3;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .response {
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
          min-height: 200px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 13px;
          white-space: pre-wrap;
          overflow-x: auto;
        }
        .response.error {
          background: #fff5f5;
          border-color: #fc8181;
          color: #c53030;
        }
        .response.success {
          background: #f0fdf4;
          border-color: #86efac;
        }
        .button-group {
          display: flex;
          gap: 10px;
        }
        .info-section {
          background: #e3f2fd;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 15px;
          font-size: 14px;
          line-height: 1.6;
        }
        .endpoint-url {
          font-family: monospace;
          background: white;
          padding: 8px 12px;
          border-radius: 4px;
          margin-top: 8px;
          display: inline-block;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>GraphQL Playground</h1>
        <p class="subtitle">Test your GraphQL API with sample queries</p>
        
        <div class="layout">
          <div class="sidebar">
            <h2>Sample Queries</h2>
            <ul class="query-list" id="queryList"></ul>
            
            <h2 style="margin-top: 30px;">Persisted Queries</h2>
            <ul class="query-list" id="persistedQueryList"></ul>
          </div>
          
          <div class="main-content">
            <div class="card">
              <div class="info-section">
                <strong>GraphQL Endpoint:</strong>
                <div class="endpoint-url">/graphql</div>
              </div>
              
              <h2>Query Editor</h2>
              <textarea id="queryEditor" placeholder="Enter your GraphQL query here..."></textarea>
              
              <div style="margin-top: 15px;" class="button-group">
                <button onclick="executeQuery()">Execute Query</button>
                <button onclick="clearQuery()">Clear</button>
                <button onclick="formatQuery()">Format</button>
              </div>
            </div>
            
            <div class="card">
              <h2>Response</h2>
              <div id="response" class="response">Response will appear here...</div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        const sampleQueries = [
          {
            name: 'Hello Query',
            description: 'Simple greeting query',
            query: \`query {
  hello
}\`
          },
          {
            name: 'All Users',
            description: 'Fetch all users',
            query: \`query {
  users {
    id
    name
    email
    role
  }
}\`
          },
          {
            name: 'Single User',
            description: 'Fetch user by ID',
            query: \`query {
  user(id: "1") {
    id
    name
    email
    role
  }
}\`
          },
          {
            name: 'All Products',
            description: 'Fetch all products',
            query: \`query {
  products {
    id
    name
    price
    category
    inStock
  }
}\`
          },
          {
            name: 'Products by Category',
            description: 'Filter products by category',
            query: \`query {
  products(category: "Electronics") {
    id
    name
    price
    inStock
  }
}\`
          },
          {
            name: 'Single Product',
            description: 'Fetch product by ID',
            query: \`query {
  product(id: "1") {
    id
    name
    price
    category
    inStock
  }
}\`
          }
        ];
        
        const persistedQueries = [
          {
            name: 'Dashboard Query',
            description: 'Combined query for dashboard',
            query: \`query DashboardData {
  users {
    id
    name
    role
  }
  products {
    id
    name
    price
    inStock
  }
  hello
}\`
          },
          {
            name: 'User Products View',
            description: 'User info with products',
            query: \`query UserProductsView {
  user(id: "1") {
    name
    email
  }
  products(category: "Electronics") {
    name
    price
  }
}\`
          },
          {
            name: 'Inventory Check',
            description: 'Check product inventory',
            query: \`query InventoryCheck {
  products {
    id
    name
    category
    inStock
  }
}\`
          }
        ];
        
        function renderQueryList() {
          const queryList = document.getElementById('queryList');
          queryList.innerHTML = sampleQueries.map((q, idx) => \`
            <li class="query-item" onclick="loadQuery(\${idx}, false, event)">
              <div class="query-name">\${q.name}</div>
              <div class="query-desc">\${q.description}</div>
            </li>
          \`).join('');
          
          const persistedList = document.getElementById('persistedQueryList');
          persistedList.innerHTML = persistedQueries.map((q, idx) => \`
            <li class="query-item" onclick="loadQuery(\${idx}, true, event)">
              <div class="query-name">\${q.name}</div>
              <div class="query-desc">\${q.description}</div>
            </li>
          \`).join('');
        }
        
        function loadQuery(index, isPersisted, evt) {
          const queries = isPersisted ? persistedQueries : sampleQueries;
          const query = queries[index];
          document.getElementById('queryEditor').value = query.query;
          
          // Update active state
          document.querySelectorAll('.query-item').forEach(item => {
            item.classList.remove('active');
          });
          if (evt) {
            evt.target.closest('.query-item').classList.add('active');
          }
        }
        
        async function executeQuery() {
          const query = document.getElementById('queryEditor').value;
          const responseDiv = document.getElementById('response');
          
          if (!query.trim()) {
            responseDiv.className = 'response error';
            responseDiv.textContent = 'Please enter a query';
            return;
          }
          
          responseDiv.className = 'response';
          responseDiv.textContent = 'Executing query...';
          
          try {
            const response = await fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query })
            });
            
            const data = await response.json();
            
            if (data.errors) {
              responseDiv.className = 'response error';
              responseDiv.textContent = JSON.stringify(data, null, 2);
            } else {
              responseDiv.className = 'response success';
              responseDiv.textContent = JSON.stringify(data, null, 2);
            }
          } catch (error) {
            responseDiv.className = 'response error';
            responseDiv.textContent = 'Error: ' + error.message;
          }
        }
        
        function clearQuery() {
          document.getElementById('queryEditor').value = '';
          document.getElementById('response').className = 'response';
          document.getElementById('response').textContent = 'Response will appear here...';
          document.querySelectorAll('.query-item').forEach(item => {
            item.classList.remove('active');
          });
        }
        
        function formatQuery() {
          const query = document.getElementById('queryEditor').value;
          // Basic formatting - can be enhanced
          const formatted = query
            .replace(/\\{/g, ' {\\n  ')
            .replace(/\\}/g, '\\n}')
            .replace(/\\n\\s*\\n/g, '\\n');
          document.getElementById('queryEditor').value = formatted;
        }
        
        // Initialize
        renderQueryList();
        loadQuery(0, false);
      </script>
    </body>
    </html>
  `
  return c.html(html)
})

// Simple GraphQL handler endpoint
app.post('/graphql', async (c) => {
  try {
    const body = await c.req.json()
    const query = body.query
    
    if (!query) {
      return c.json({ errors: [{ message: 'No query provided' }] })
    }
    
    // Simple query parser and executor
    const result = executeGraphQLQuery(query)
    return c.json(result)
  } catch (error) {
    return c.json({ 
      errors: [{ 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }] 
    })
  }
})

// Simple GraphQL query executor
function executeGraphQLQuery(query: string) {
  try {
    // Remove query wrapper and extract field names
    const cleanQuery = query.replace(/query\s+\w*\s*{/, '{').trim()
    
    // Check for hello
    if (cleanQuery.includes('hello')) {
      const helloResult = graphqlApp.Query.hello()
      return { data: { hello: helloResult } }
    }
    
    // Check for users query
    if (cleanQuery.match(/users\s*{/)) {
      const usersResult = graphqlApp.Query.users()
      return { data: { users: usersResult } }
    }
    
    // Check for single user query
    const userMatch = cleanQuery.match(/user\s*\(\s*id:\s*"(\w+)"\s*\)/)
    if (userMatch) {
      const userId = userMatch[1]
      const userResult = graphqlApp.Query.user(userId)
      return { data: { user: userResult } }
    }
    
    // Check for products query with optional category
    const productsMatch = cleanQuery.match(/products(?:\s*\(\s*category:\s*"(\w+)"\s*\))?/)
    if (productsMatch) {
      const category = productsMatch[1]
      const productsResult = graphqlApp.Query.products(category)
      return { data: { products: productsResult } }
    }
    
    // Check for single product query
    const productMatch = cleanQuery.match(/product\s*\(\s*id:\s*"(\w+)"\s*\)/)
    if (productMatch) {
      const productId = productMatch[1]
      const productResult = graphqlApp.Query.product(productId)
      return { data: { product: productResult } }
    }
    
    // Handle multiple queries in one request
    const data: any = {}
    
    if (cleanQuery.includes('hello')) {
      data.hello = graphqlApp.Query.hello()
    }
    if (cleanQuery.match(/users\s*{/)) {
      data.users = graphqlApp.Query.users()
    }
    if (cleanQuery.match(/user\s*\(/)) {
      const match = cleanQuery.match(/user\s*\(\s*id:\s*"(\w+)"\s*\)/)
      if (match) data.user = graphqlApp.Query.user(match[1])
    }
    if (cleanQuery.match(/products/)) {
      const match = cleanQuery.match(/products\s*\(\s*category:\s*"(\w+)"\s*\)/)
      data.products = graphqlApp.Query.products(match ? match[1] : undefined)
    }
    if (cleanQuery.match(/product\s*\(/)) {
      const match = cleanQuery.match(/product\s*\(\s*id:\s*"(\w+)"\s*\)/)
      if (match) data.product = graphqlApp.Query.product(match[1])
    }
    
    return { data }
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
