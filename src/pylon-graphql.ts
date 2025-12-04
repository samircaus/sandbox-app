import { app } from '@getcronit/pylon'

// Simple resolvers compatible with standard GraphQL clients
export const graphql = {
  Query: {
    hello: () => 'Hello from Pylon GraphQL!',
    
    // Users
    users: () => {
      return [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
      ]
    },
    
    user: (id: string) => {
      const users = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
      ]
      return users.find(u => u.id === id) || null
    },
    
    // Products
    products: (args?: { category?: string }) => {
      const allProducts = [
        {
          id: '1',
          name: 'Laptop',
          description: 'High-performance laptop',
          price: 999.99,
          currency: 'USD',
          category: 'Electronics',
          inStock: true
        },
        {
          id: '2',
          name: 'Smartwatch',
          description: 'Feature-rich smartwatch',
          price: 299.99,
          currency: 'USD',
          category: 'Wearables',
          inStock: true
        }
      ]
      
      if (args?.category) {
        return allProducts.filter(p => p.category === args.category)
      }
      
      return allProducts
    },
    
    product: (id: string) => {
      const products = [
        {
          id: '1',
          name: 'Laptop',
          description: 'High-performance laptop',
          price: 999.99,
          currency: 'USD',
          category: 'Electronics',
          inStock: true
        }
      ]
      return products.find(p => p.id === id) || null
    }
  }
}

export default app


