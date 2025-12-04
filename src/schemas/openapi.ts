export const openapiYaml = `openapi: 3.0.3
info:
  title: Simple Sandbox API
  description: |
    A sample product API with REST and GraphQL endpoints.
    
    Product information is split across microservices-style endpoints:
    - /product/{id} - Main product information (content, specifications, tags)
    - /product/{id}/price - Pricing and availability (price, stock, quantity)
    - /product/{id}/rating - Customer ratings and reviews
  version: 1.0.0
  contact:
    name: API Support
    url: https://example.com/support
servers:
  - url: https://sandbox.samircaus.workers.dev
    description: Production server
  - url: http://localhost:9000
    description: Development server
  - url: https://edge-sandbox-graph.adobe.io/api/28492762-049d-4c0d-8f4a-e0b17d988d40/graphql
    description: Adobe GraphQL Mesh Sandbox
paths:
  /categories:
    get:
      summary: Get all categories
      description: Returns all product categories
      operationId: getCategories
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Category'
              examples:
                all_categories:
                  summary: All Categories
                  value:
                    - id: "cat-electronics"
                      name: "Electronics"
                      description: "Cutting-edge electronic devices and gadgets"
                      slug: "electronics"
                      imageUrl: "https://example.com/categories/electronics.jpg"
                      parentId: null
                    - id: "cat-wearables"
                      name: "Wearables"
                      description: "Smart wearable technology for fitness and lifestyle"
                      slug: "wearables"
                      imageUrl: "https://example.com/categories/wearables.jpg"
                      parentId: null
                    - id: "cat-accessories"
                      name: "Accessories"
                      description: "Essential accessories for your tech setup"
                      slug: "accessories"
                      imageUrl: "https://example.com/categories/accessories.jpg"
                      parentId: null
  /category/{id}:
    get:
      summary: Get category by ID
      description: Returns a single category by its ID
      operationId: getCategoryById
      parameters:
        - name: id
          in: path
          required: true
          description: Category ID
          schema:
            type: string
          examples:
            electronics:
              value: "cat-electronics"
              summary: Electronics Category
            wearables:
              value: "cat-wearables"
              summary: Wearables Category
            accessories:
              value: "cat-accessories"
              summary: Accessories Category
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Category'
              examples:
                electronics_category:
                  summary: Electronics Category
                  value:
                    id: "cat-electronics"
                    name: "Electronics"
                    description: "Cutting-edge electronic devices and gadgets"
                    slug: "electronics"
                    imageUrl: "https://example.com/categories/electronics.jpg"
                    parentId: null
        '404':
          description: Category not found
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: "Category not found"
  /products:
    get:
      summary: Get all products
      description: Returns all products, optionally filtered by category
      operationId: getProducts
      parameters:
        - name: category
          in: query
          required: false
          description: Filter products by category
          schema:
            type: string
            enum:
              - Electronics
              - Wearables
              - Accessories
          examples:
            electronics:
              value: "Electronics"
              summary: Get Electronics products
            wearables:
              value: "Wearables"
              summary: Get Wearables products
            accessories:
              value: "Accessories"
              summary: Get Accessories products
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'
              examples:
                all_products:
                  summary: All Products
                  value:
                    - id: "1"
                      name: "Wireless Headphones"
                      description: "Premium noise-canceling wireless headphones with 30-hour battery life."
                      categoryId: "cat-electronics"
                      category: "Electronics"
                      text: "This is {{description}} from category. Perfect for {{name}} enthusiasts!"
                      price: 99.99
                      currency: "USD"
                      inStock: true
                      quantity: 42
                      imageUrl: "https://example.com/products/1.jpg"
                      rating: 4.5
                      reviews: 123
                      specifications:
                        weight: "250g"
                        dimensions: "18 x 16 x 8 cm"
                        color: "Black"
                        brand: "AudioTech"
                      tags:
                        - featured
                        - wireless
                        - audio
                    - id: "2"
                      name: "Smart Watch"
                      description: "Fitness tracking smartwatch with heart rate monitor and GPS."
                      categoryId: "cat-wearables"
                      category: "Wearables"
                      text: "Explore the world of {{description}}. This {{name}} product is designed for active lifestyles."
                      price: 249.99
                      currency: "USD"
                      inStock: true
                      quantity: 28
                      imageUrl: "https://example.com/products/2.jpg"
                      rating: 4.7
                      reviews: 89
                      specifications:
                        weight: "45g"
                        dimensions: "4 x 4 x 1 cm"
                        color: "Silver"
                        brand: "TechFit"
                      tags:
                        - popular
                        - fitness
                        - smartwatch
  /product/{id}:
    get:
      summary: Get product main information by ID
      description: Returns product main content without pricing and rating information
      operationId: getProductById
      parameters:
        - name: id
          in: path
          required: true
          description: Product ID
          schema:
            type: string
          examples:
            numeric:
              value: "1"
              summary: Numeric ID
            alphanumeric:
              value: "xyz"
              summary: Alphanumeric ID
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductMainInfo'
              examples:
                wireless_headphones:
                  summary: Wireless Headphones
                  value:
                    id: "1"
                    name: "Wireless Headphones"
                    description: "Premium noise-canceling wireless headphones with 30-hour battery life."
                    categoryId: "cat-electronics"
                    category: "Electronics"
                    currency: "USD"
                    imageUrl: "https://example.com/products/1.jpg"
                    specifications:
                      weight: "250g"
                      dimensions: "18 x 16 x 8 cm"
                      color: "Black"
                      brand: "AudioTech"
                    tags:
                      - featured
                      - wireless
                      - audio
  /product/{id}/price:
    get:
      summary: Get product pricing and availability
      description: Returns price, stock status, and quantity information for a product
      operationId: getProductPrice
      parameters:
        - name: id
          in: path
          required: true
          description: Product ID
          schema:
            type: string
          examples:
            numeric:
              value: "1"
              summary: Numeric ID
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductPrice'
              examples:
                product_price:
                  summary: Product Price Information
                  value:
                    id: "1"
                    price: 99.99
                    currency: "USD"
                    inStock: true
                    quantity: 42
  /product/{id}/rating:
    get:
      summary: Get product rating and reviews
      description: Returns rating score and number of reviews for a product
      operationId: getProductRating
      parameters:
        - name: id
          in: path
          required: true
          description: Product ID
          schema:
            type: string
          examples:
            numeric:
              value: "1"
              summary: Numeric ID
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductRating'
              examples:
                product_rating:
                  summary: Product Rating Information
                  value:
                    id: "1"
                    rating: 4.5
                    reviews: 123
components:
  schemas:
    Category:
      type: object
      required:
        - id
        - name
        - description
        - slug
        - imageUrl
      properties:
        id:
          type: string
          description: Unique category identifier
          example: "cat-electronics"
        name:
          type: string
          description: Category name
          example: "Electronics"
        description:
          type: string
          description: Category description
          example: "Cutting-edge electronic devices and gadgets"
        slug:
          type: string
          description: URL-friendly slug
          example: "electronics"
        imageUrl:
          type: string
          format: uri
          description: Category image URL
          example: "https://example.com/categories/electronics.jpg"
        parentId:
          type: string
          nullable: true
          description: Parent category ID for nested categories
          example: null
    Product:
      type: object
      required:
        - id
        - name
        - description
        - categoryId
        - category
        - text
        - price
        - currency
        - inStock
        - quantity
        - imageUrl
        - rating
        - reviews
        - tags
      properties:
        id:
          type: string
          description: Unique product identifier
          example: "1"
        name:
          type: string
          description: Product name
          example: "Wireless Headphones"
        description:
          type: string
          description: Product description
          example: "Premium noise-canceling wireless headphones with 30-hour battery life."
        categoryId:
          type: string
          description: Category ID for federation/joins (GraphQL Mesh support)
          example: "cat-electronics"
        category:
          type: string
          description: Product category name
          enum:
            - Electronics
            - Wearables
            - Accessories
          example: "Electronics"
        text:
          type: string
          description: Template text with {{placeholders}} for category data
          example: "This is {{description}} from category. Perfect for {{name}} enthusiasts!"
        price:
          type: number
          format: float
          description: Product price
          example: 99.99
        currency:
          type: string
          description: Currency code
          example: "USD"
        inStock:
          type: boolean
          description: Whether product is in stock
          example: true
        quantity:
          type: integer
          format: int32
          description: Available quantity
          minimum: 0
          example: 42
        imageUrl:
          type: string
          format: uri
          description: Product image URL
          example: "https://example.com/products/1.jpg"
        rating:
          type: number
          format: float
          description: Product rating (3.0-5.0)
          minimum: 3.0
          maximum: 5.0
          example: 4.5
        reviews:
          type: integer
          format: int32
          description: Number of reviews
          minimum: 0
          example: 123
        specifications:
          type: object
          description: Product specifications
          properties:
            weight:
              type: string
              example: "250g"
            dimensions:
              type: string
              example: "18 x 16 x 8 cm"
            color:
              type: string
              example: "Black"
            brand:
              type: string
              example: "AudioTech"
        tags:
          type: array
          description: Product tags
          items:
            type: string
          example: ["featured", "wireless", "audio"]
    ProductMainInfo:
      type: object
      required:
        - id
        - name
        - description
        - currency
        - category
        - imageUrl
        - tags
      properties:
        id:
          type: string
          description: Unique product identifier
          example: "1"
        name:
          type: string
          description: Product name
          example: "Wireless Headphones"
        description:
          type: string
          description: Product description
          example: "Premium noise-canceling wireless headphones with 30-hour battery life."
        categoryId:
          type: string
          description: Category ID for federation/joins
          example: "cat-electronics"
        category:
          type: string
          description: Product category name
          enum:
            - Electronics
            - Wearables
            - Accessories
          example: "Electronics"
        currency:
          type: string
          description: Currency code
          example: "USD"
        imageUrl:
          type: string
          format: uri
          description: Product image URL
          example: "https://example.com/products/1.jpg"
        specifications:
          type: object
          description: Product specifications
          properties:
            weight:
              type: string
              example: "250g"
            dimensions:
              type: string
              example: "18 x 16 x 8 cm"
            color:
              type: string
              example: "Black"
            brand:
              type: string
              example: "AudioTech"
        tags:
          type: array
          description: Product tags
          items:
            type: string
          example: ["featured", "wireless", "audio"]
    ProductPrice:
      type: object
      required:
        - id
        - price
        - currency
        - inStock
        - quantity
      properties:
        id:
          type: string
          description: Product identifier
          example: "1"
        price:
          type: number
          format: float
          description: Product price
          example: 99.99
        currency:
          type: string
          description: Currency code
          example: "USD"
        inStock:
          type: boolean
          description: Whether product is in stock
          example: true
        quantity:
          type: integer
          format: int32
          description: Available quantity
          minimum: 0
          example: 42
    ProductRating:
      type: object
      required:
        - id
        - rating
        - reviews
      properties:
        id:
          type: string
          description: Product identifier
          example: "1"
        rating:
          type: number
          format: float
          description: Product rating (3.0-5.0)
          minimum: 3.0
          maximum: 5.0
          example: 4.5
        reviews:
          type: integer
          format: int32
          description: Number of reviews
          minimum: 0
          example: 123
`

