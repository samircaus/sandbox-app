// Static array of product templates for REST endpoint
export const productTemplates = [
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

// Sample data for GraphQL
export const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Moderator' }
]

export const products = [
  { id: '1', name: 'Wireless Headphones', price: 99.99, category: 'Electronics', inStock: true },
  { id: '2', name: 'Smart Watch', price: 249.99, category: 'Wearables', inStock: true },
  { id: '3', name: 'Laptop Stand', price: 49.99, category: 'Accessories', inStock: false },
  { id: '4', name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics', inStock: true },
  { id: '5', name: 'USB-C Hub', price: 39.99, category: 'Accessories', inStock: true }
]

