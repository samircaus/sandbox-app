export const openapiYaml = `openapi: 3.0.3
info:
  title: Simple Sandbox API
  description: A sample product API with REST and GraphQL endpoints
  version: 1.0.0
  contact:
    name: API Support
    url: https://example.com/support
servers:
  - url: https://sandbox.samircaus.workers.dev
    description: Production server
  - url: http://localhost:9000
    description: Development server
paths:
  /product/{id}:
    get:
      summary: Get product by ID
      description: Returns a product with randomized properties based on templates
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
                $ref: '#/components/schemas/Product'
              examples:
                wireless_headphones:
                  summary: Wireless Headphones
                  value:
                    id: "1"
                    name: "Wireless Headphones"
                    description: "Premium noise-canceling wireless headphones with 30-hour battery life."
                    price: 99.99
                    currency: "USD"
                    category: "Electronics"
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
components:
  schemas:
    Product:
      type: object
      required:
        - id
        - name
        - description
        - price
        - currency
        - category
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
        price:
          type: number
          format: float
          description: Product price
          example: 99.99
        currency:
          type: string
          description: Currency code
          example: "USD"
        category:
          type: string
          description: Product category
          enum:
            - Electronics
            - Wearables
            - Accessories
          example: "Electronics"
        inStock:
          type: boolean
          description: Whether product is in stock
          example: true
        quantity:
          type: integer
          description: Available quantity
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
          description: Number of reviews
          example: 123
        specifications:
          type: object
          description: Product specifications
          additionalProperties: true
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
`

