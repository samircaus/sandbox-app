// Category data for GraphQL Mesh federation
export const categories = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    description: 'Cutting-edge electronic devices and gadgets',
    slug: 'electronics',
    imageUrl: 'https://example.com/categories/electronics.jpg',
    parentId: null
  },
  {
    id: 'cat-wearables',
    name: 'Wearables',
    description: 'Smart wearable technology for fitness and lifestyle',
    slug: 'wearables',
    imageUrl: 'https://example.com/categories/wearables.jpg',
    parentId: null
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    description: 'Essential accessories for your tech setup',
    slug: 'accessories',
    imageUrl: 'https://example.com/categories/accessories.jpg',
    parentId: null
  }
]

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
  { 
    id: '1', 
    name: 'Wireless Headphones', 
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life.',
    categoryId: 'cat-electronics',
    category: 'Electronics', 
    text: 'This is {{description}} from category. Perfect for {{name}} enthusiasts!',
    price: 99.99, 
    currency: 'USD',
    inStock: true,
    quantity: 42,
    imageUrl: 'https://example.com/products/1.jpg',
    rating: 4.5,
    reviews: 123,
    specifications: {
      weight: '250g',
      dimensions: '18 x 16 x 8 cm',
      color: 'Black',
      brand: 'AudioTech'
    },
    tags: ['featured', 'wireless', 'audio']
  },
  { 
    id: '2', 
    name: 'Smart Watch', 
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    categoryId: 'cat-wearables',
    category: 'Wearables',
    text: 'Explore the world of {{description}}. This {{name}} product is designed for active lifestyles.',
    price: 249.99, 
    currency: 'USD',
    inStock: true,
    quantity: 28,
    imageUrl: 'https://example.com/products/2.jpg',
    rating: 4.7,
    reviews: 89,
    specifications: {
      weight: '45g',
      dimensions: '4 x 4 x 1 cm',
      color: 'Silver',
      brand: 'TechFit'
    },
    tags: ['popular', 'fitness', 'smartwatch']
  },
  { 
    id: '3', 
    name: 'Laptop Stand', 
    description: 'Ergonomic aluminum laptop stand with adjustable height.',
    categoryId: 'cat-accessories',
    category: 'Accessories',
    text: 'Discover {{description}} in our {{name}} collection. Enhance your workspace!',
    price: 49.99, 
    currency: 'USD',
    inStock: false,
    quantity: 0,
    imageUrl: 'https://example.com/products/3.jpg',
    rating: 4.2,
    reviews: 56,
    specifications: {
      weight: '1.2 kg',
      dimensions: '26 x 23 x 6 cm',
      color: 'Space Gray',
      brand: 'DeskPro'
    },
    tags: ['ergonomic', 'office', 'aluminum']
  },
  { 
    id: '4', 
    name: 'Mechanical Keyboard', 
    description: 'RGB backlit mechanical gaming keyboard with blue switches.',
    categoryId: 'cat-electronics',
    category: 'Electronics',
    text: 'Experience {{description}} with this premium {{name}} item. Built for gamers and professionals.',
    price: 129.99, 
    currency: 'USD',
    inStock: true,
    quantity: 15,
    imageUrl: 'https://example.com/products/4.jpg',
    rating: 4.8,
    reviews: 234,
    specifications: {
      weight: '900g',
      dimensions: '44 x 13 x 4 cm',
      color: 'Black',
      brand: 'GameKeys'
    },
    tags: ['gaming', 'rgb', 'mechanical']
  },
  { 
    id: '5', 
    name: 'USB-C Hub', 
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.',
    categoryId: 'cat-accessories',
    category: 'Accessories',
    text: 'Browse our {{name}} offerings. This product exemplifies {{description}}.',
    price: 39.99, 
    currency: 'USD',
    inStock: true,
    quantity: 67,
    imageUrl: 'https://example.com/products/5.jpg',
    rating: 4.4,
    reviews: 178,
    specifications: {
      weight: '85g',
      dimensions: '11 x 4 x 1.5 cm',
      color: 'Gray',
      brand: 'ConnectPlus'
    },
    tags: ['usb-c', 'hub', 'portable']
  }
]

// Extended sample data for advanced GraphQL queries
export const cities = [
  {
    _path: '/content/dam/sample-content-fragments/cities/basel',
    name: 'Basel',
    country: 'Switzerland',
    population: 172258,
    categories: ['city:emea']
  },
  {
    _path: '/content/dam/sample-content-fragments/cities/berlin',
    name: 'Berlin',
    country: 'Germany',
    population: 3669491,
    categories: ['city:capital', 'city:emea'],
    _tags: ['tourism:city-break', 'tourism:business']
  },
  {
    _path: '/content/dam/sample-content-fragments/cities/bucharest',
    name: 'Bucharest',
    country: 'Romania',
    population: 1821000,
    categories: ['city:capital', 'city:emea']
  },
  {
    _path: '/content/dam/sample-content-fragments/cities/san-francisco',
    name: 'San Francisco',
    country: 'USA',
    population: 883306,
    categories: ['city:beach', 'city:na']
  },
  {
    _path: '/content/dam/sample-content-fragments/cities/san-jose',
    name: 'San Jose',
    country: 'USA',
    population: 1026350,
    categories: ['city:na']
  },
  {
    _path: '/content/dam/sample-content-fragments/cities/stuttgart',
    name: 'Stuttgart',
    country: 'Germany',
    population: 634830,
    categories: ['city:emea']
  },
  {
    _path: '/content/dam/sample-content-fragments/cities/zurich',
    name: 'Zurich',
    country: 'Switzerland',
    population: 415367,
    categories: ['city:emea'],
    _tags: ['tourism:city-break', 'tourism:business']
  }
]

export const persons = [
  {
    _path: '/content/dam/sample-content-fragments/persons/steve-jobs',
    name: 'Jobs',
    firstName: 'Steve',
    awards: []
  },
  {
    _path: '/content/dam/sample-content-fragments/persons/adam-smith',
    name: 'Smith',
    firstName: 'Adam',
    awards: []
  },
  {
    _path: '/content/dam/sample-content-fragments/persons/joe-smith',
    name: 'Smith',
    firstName: 'Joe',
    awards: []
  },
  {
    _path: '/content/dam/sample-content-fragments/persons/lara-croft',
    name: 'Croft',
    firstName: 'Lara',
    awards: [
      { id: 'GS', title: 'Gamestar' }
    ]
  },
  {
    _path: '/content/dam/sample-content-fragments/persons/cutter-slade',
    name: 'Slade',
    firstName: 'Cutter',
    awards: [
      { id: 'GB', title: 'Gameblitz' },
      { id: 'GS', title: 'Gamestar' }
    ]
  },
  {
    _path: '/content/dam/sample-content-fragments/persons/duke-marsh',
    name: 'Marsh',
    firstName: 'Duke',
    awards: []
  },
  {
    _path: '/content/dam/sample-content-fragments/persons/max-caulfield',
    name: 'Caulfield',
    firstName: 'Max',
    awards: [
      { id: 'GB', title: 'Gameblitz' }
    ]
  },
  {
    _path: '/content/dam/sample-content-fragments/persons/abraham-lincoln',
    name: 'Lincoln',
    firstName: 'Abraham',
    awards: []
  }
]

export const companies = [
  {
    _path: '/content/dam/sample-content-fragments/companies/apple',
    name: 'Apple Inc.',
    ceo: persons[0], // Steve Jobs
    employees: [persons[5], persons[6]] // Duke Marsh, Max Caulfield
  },
  {
    _path: '/content/dam/sample-content-fragments/companies/little-pony',
    name: 'Little Pony, Inc.',
    ceo: persons[1], // Adam Smith
    employees: [persons[3], persons[4]] // Lara Croft, Cutter Slade
  },
  {
    _path: '/content/dam/sample-content-fragments/companies/nextstep',
    name: 'NextStep Inc.',
    ceo: persons[0], // Steve Jobs
    employees: [persons[2], persons[7]] // Joe Smith, Abraham Lincoln
  }
]

export const awards = [
  {
    _path: '/content/dam/sample-content-fragments/awards/gameblitz',
    id: 'GB',
    title: 'Gameblitz',
    _metadata: {
      stringMetadata: [
        { name: 'title', value: 'Gameblitz Award' },
        { name: 'description', value: '' }
      ]
    }
  },
  {
    _path: '/content/dam/sample-content-fragments/awards/gamestar',
    id: 'GS',
    title: 'Gamestar',
    _metadata: {
      stringMetadata: [
        { name: 'title', value: 'Gamestar Award' },
        { name: 'description', value: 'Prestigious gaming industry award' }
      ]
    }
  }
]

export const adventures = [
  {
    _path: '/content/dam/wknd/en/adventures/cycling-southern-utah/cycling-southern-utah',
    title: 'Cycling Southern Utah',
    description: 'Explore the stunning red rock landscapes of Southern Utah on a multi-day cycling adventure.',
    adventureType: 'Cycling',
    price: 1200,
    tripLength: '4 days',
    groupSize: 8,
    difficulty: 'Intermediate',
    primaryImage: {
      _path: '/content/dam/wknd/en/adventures/cycling-southern-utah/cycling-hero.jpg'
    }
  },
  {
    _path: '/content/dam/wknd/en/adventures/cycling-tuscany/cycling-tuscany',
    title: 'Cycling Tuscany',
    description: 'Bike through rolling hills, vineyards, and historic villages in the heart of Italy.',
    adventureType: 'Cycling',
    price: 1500,
    tripLength: '6 days',
    groupSize: 10,
    difficulty: 'Easy',
    primaryImage: {
      _path: '/content/dam/wknd/en/adventures/cycling-tuscany/cycling-hero.jpg'
    }
  },
  {
    _path: '/content/dam/wknd/en/adventures/bali-surf-camp/bali-surf-camp',
    title: 'Bali Surf Camp',
    description: 'Learn to surf or improve your skills at this tropical surf camp in Bali.',
    adventureType: 'Surfing',
    price: 800,
    tripLength: '5 days',
    groupSize: 12,
    difficulty: 'Beginner',
    primaryImage: {
      _path: '/content/dam/wknd/en/adventures/bali-surf-camp/surf-hero.jpg'
    }
  }
]

