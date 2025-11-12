import { Hono } from 'hono'

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
        <a href="/graphql">→ GraphQL Playground</a>
      </div>
    </body>
    </html>
  `
  return c.html(html)
})

// Static array of product templates
const productTemplates = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life.',
    category: 'Electronics',
    specifications: {
      weight: '250g',
      dimensions: '18 x 16 x 8 cm',
      color: 'Black',
      brand: 'AudioTech'
    },
    tags: ['featured', 'wireless', 'audio']
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    category: 'Wearables',
    specifications: {
      weight: '45g',
      dimensions: '4 x 4 x 1 cm',
      color: 'Silver',
      brand: 'TechFit'
    },
    tags: ['popular', 'fitness', 'smartwatch']
  },
  {
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand with adjustable height.',
    category: 'Accessories',
    specifications: {
      weight: '1.2 kg',
      dimensions: '26 x 23 x 6 cm',
      color: 'Space Gray',
      brand: 'DeskPro'
    },
    tags: ['ergonomic', 'office', 'aluminum']
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical gaming keyboard with blue switches.',
    category: 'Electronics',
    specifications: {
      weight: '900g',
      dimensions: '44 x 13 x 4 cm',
      color: 'Black',
      brand: 'GameKeys'
    },
    tags: ['gaming', 'rgb', 'mechanical']
  },
  {
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.',
    category: 'Accessories',
    specifications: {
      weight: '85g',
      dimensions: '11 x 4 x 1.5 cm',
      color: 'Gray',
      brand: 'ConnectPlus'
    },
    tags: ['usb-c', 'hub', 'portable']
  }
]

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

// Sample data for GraphQL
const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Moderator' }
]

const products = [
  { id: '1', name: 'Wireless Headphones', price: 99.99, category: 'Electronics', inStock: true },
  { id: '2', name: 'Smart Watch', price: 249.99, category: 'Wearables', inStock: true },
  { id: '3', name: 'Laptop Stand', price: 49.99, category: 'Accessories', inStock: false },
  { id: '4', name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics', inStock: true },
  { id: '5', name: 'USB-C Hub', price: 39.99, category: 'Accessories', inStock: true }
]

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
