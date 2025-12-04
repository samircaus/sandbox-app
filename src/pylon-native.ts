/**
 * PYLON NATIVE GRAPHQL IMPLEMENTATION
 * 
 * This file uses Pylon's native GraphQL schema generation which automatically
 * creates a standard, spec-compliant GraphQL schema from TypeScript definitions.
 * 
 * Unlike the manual Hono implementation, this approach:
 * - Automatically generates proper GraphQL schemas
 * - Works with all GraphQL clients (Apollo, Relay, etc.)
 * - Provides full introspection support
 * - Follows GraphQL specification exactly
 * 
 * Compare to Countries API: https://countries.trevorblades.com/graphql
 * Both use automatic schema generation from type definitions.
 */

import { app } from '@getcronit/pylon'

// Type definitions (Pylon will automatically generate GraphQL types from these)
export interface User {
  id: string
  name: string
  email: string
  role: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  currency: string
  category: string
  categoryId?: string
  inStock: boolean
  quantity?: number
  imageUrl?: string
  rating?: number
  reviews?: number
  specifications?: ProductSpecifications
  tags?: string[]
  text?: string
}

export interface ProductSpecifications {
  weight?: string
  dimensions?: string
  color?: string
  brand?: string
}

export interface Category {
  id: string
  name: string
  description?: string
  slug?: string
  imageUrl?: string
  parentId?: string | null
}

export interface City {
  _path: string
  name: string
  country: string
  population: number
  categories?: string[]
  _tags?: string[]
}

export interface Person {
  _path: string
  name: string
  firstName: string
  awards?: Award[]
}

export interface Award {
  id: string
  title: string
  _path?: string
}

export interface Company {
  _path: string
  name: string
  ceo?: Person
  employees?: Person[]
}

export interface Adventure {
  _path: string
  title: string
  description?: string
  adventureType?: string
  price?: number
}

export interface Country {
  code: string
  name: string
  description: string
  capital?: string
  currency?: string
  emoji?: string
}

// Sample data
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user' }
]

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Laptop',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    currency: 'USD',
    category: 'Electronics',
    categoryId: 'cat-electronics',
    inStock: true,
    quantity: 15,
    imageUrl: 'https://example.com/laptop.jpg',
    rating: 4.5,
    reviews: 128,
    specifications: {
      brand: 'TechBrand',
      color: 'Silver',
      weight: '1.4kg',
      dimensions: '14 x 9.5 x 0.7 inches'
    },
    tags: ['premium', 'laptop', 'work'],
    text: 'Check out our {{categoryName}} section'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Feature-rich smartwatch with health tracking',
    price: 349.99,
    currency: 'USD',
    category: 'Wearables',
    categoryId: 'cat-wearables',
    inStock: true,
    quantity: 42,
    imageUrl: 'https://example.com/watch.jpg',
    rating: 4.7,
    reviews: 203,
    specifications: {
      brand: 'WearTech',
      color: 'Black',
      weight: '45g'
    },
    tags: ['smartwatch', 'fitness', 'health']
  },
  {
    id: 'xyz',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with noise cancellation',
    price: 199.99,
    currency: 'USD',
    category: 'Accessories',
    categoryId: 'cat-accessories',
    inStock: true,
    quantity: 67,
    imageUrl: 'https://example.com/earbuds.jpg',
    rating: 4.3,
    reviews: 89,
    specifications: {
      brand: 'AudioPro',
      color: 'White'
    },
    tags: ['wireless', 'audio', 'portable']
  }
]

const categories: Category[] = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    slug: 'electronics',
    imageUrl: 'https://example.com/electronics.jpg',
    parentId: null
  },
  {
    id: 'cat-wearables',
    name: 'Wearables',
    description: 'Smart wearable devices',
    slug: 'wearables',
    imageUrl: 'https://example.com/wearables.jpg',
    parentId: null
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    description: 'Tech accessories and peripherals',
    slug: 'accessories',
    imageUrl: 'https://example.com/accessories.jpg',
    parentId: null
  }
]

const cities: City[] = [
  {
    _path: '/content/dam/sample-content-fragments/cities/basel',
    name: 'Basel',
    country: 'Switzerland',
    population: 172000,
    categories: ['city:europe'],
    _tags: ['tourism:city-break', 'tourism:business']
  },
  {
    _path: '/content/dam/sample-content-fragments/cities/berlin',
    name: 'Berlin',
    country: 'Germany',
    population: 3645000,
    categories: ['city:europe'],
    _tags: ['tourism:city-break', 'tourism:culture']
  },
  {
    _path: '/content/dam/sample-content-fragments/cities/san-francisco',
    name: 'San Francisco',
    country: 'USA',
    population: 883305,
    categories: ['city:na'],
    _tags: ['tourism:city-break', 'tourism:beach']
  }
]

export const countries: Country[] = [
  {
    code: 'US',
    name: 'United States',
    description: 'The United States of America is a federal republic consisting of 50 states. Known for its diverse geography, economy, and culture.',
    capital: 'Washington, D.C.',
    currency: 'USD',
    emoji: '🇺🇸'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    description: 'The United Kingdom is a sovereign country consisting of England, Scotland, Wales, and Northern Ireland. Rich in history and cultural heritage.',
    capital: 'London',
    currency: 'GBP',
    emoji: '🇬🇧'
  },
  {
    code: 'DE',
    name: 'Germany',
    description: 'Germany is a Central European country known for its history, engineering excellence, and contributions to arts and philosophy.',
    capital: 'Berlin',
    currency: 'EUR',
    emoji: '🇩🇪'
  },
  {
    code: 'FR',
    name: 'France',
    description: 'France is a Western European nation celebrated for its art, cuisine, wine, and iconic landmarks like the Eiffel Tower.',
    capital: 'Paris',
    currency: 'EUR',
    emoji: '🇫🇷'
  },
  {
    code: 'JP',
    name: 'Japan',
    description: 'Japan is an island nation in East Asia known for its blend of ancient traditions and cutting-edge technology.',
    capital: 'Tokyo',
    currency: 'JPY',
    emoji: '🇯🇵'
  },
  {
    code: 'CA',
    name: 'Canada',
    description: 'Canada is the second-largest country by land area, known for its natural beauty, multiculturalism, and high quality of life.',
    capital: 'Ottawa',
    currency: 'CAD',
    emoji: '🇨🇦'
  },
  {
    code: 'AU',
    name: 'Australia',
    description: 'Australia is a country and continent surrounded by the Indian and Pacific oceans, famous for unique wildlife and natural wonders.',
    capital: 'Canberra',
    currency: 'AUD',
    emoji: '🇦🇺'
  },
  {
    code: 'CH',
    name: 'Switzerland',
    description: 'Switzerland is a mountainous Central European country known for its neutrality, banking sector, and premium chocolates.',
    capital: 'Bern',
    currency: 'CHF',
    emoji: '🇨🇭'
  }
]

/**
 * GraphQL Resolvers
 * 
 * Pylon automatically creates a GraphQL schema from these resolver functions.
 * Return types and parameters are used to generate the schema types.
 */
export const graphql = {
  Query: {
    /**
     * Simple hello query
     */
    hello: (): string => {
      return 'Hello from Pylon GraphQL!'
    },

    /**
     * Get all users
     */
    users: (): User[] => {
      return users
    },

    /**
     * Get user by ID
     */
    user: (id: string): User | null => {
      return users.find(u => u.id === id) || null
    },

    /**
     * Get all products, optionally filtered by category
     */
    products: (args?: { category?: string }): Product[] => {
      if (args?.category) {
        return products.filter(p => p.category === args.category)
      }
      return products
    },

    /**
     * Get product by ID
     */
    getProductById: (id: string): Product | null => {
      return products.find(p => p.id === id) || null
    },

    /**
     * Get all categories
     */
    categories: (): Category[] => {
      return categories
    },

    /**
     * Get category by ID
     */
    getCategoryById: (id: string): Category | null => {
      return categories.find(c => c.id === id) || null
    },

    /**
     * Get all cities
     */
    cities: (): City[] => {
      return cities
    },

    /**
     * Get city by path
     */
    cityByPath: (_path: string): City | null => {
      return cities.find(c => c._path === _path) || null
    },

    /**
     * Get all countries
     */
    countries: (): Country[] => {
      return countries
    },

    /**
     * Get country by code (e.g., "US", "GB", "DE")
     */
    country: (code: string): Country | null => {
      return countries.find(c => c.code === code) || null
    }
  },

  Mutation: {
    /**
     * Create a new user
     */
    createUser: (input: { name: string; email: string; role?: string }): User => {
      const newUser: User = {
        id: String(users.length + 1),
        name: input.name,
        email: input.email,
        role: input.role || 'user'
      }
      users.push(newUser)
      return newUser
    },

    /**
     * Update product stock
     */
    updateProductStock: (input: { id: string; quantity: number }): Product | null => {
      const product = products.find(p => p.id === input.id)
      if (product) {
        product.quantity = input.quantity
        product.inStock = input.quantity > 0
        return product
      }
      return null
    }
  }
}

// Export the Pylon app
export default app


