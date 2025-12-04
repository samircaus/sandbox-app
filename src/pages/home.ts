import { navigationHeader } from '../components/navigation'

export const homePageHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Sandbox App</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      background: #f5f5f5;
    }
    .content-wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background: white;
      min-height: calc(100vh - 70px);
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
  ${navigationHeader}
  <div class="content-wrapper">
    <h1>Simple Sandbox App</h1>
    <p>Welcome! This is a sample product API with REST and GraphQL endpoints.</p>
    
  <div class="product-links">
    <p><strong>🎮 API Playgrounds:</strong></p>
    <a href="/rest-playground">→ REST Playground (OpenAPI)</a>
    <a href="/gql">→ GraphQL Playground</a>
  </div>
  
  <div class="product-links">
    <p><strong>📋 API Documentation:</strong></p>
    <a href="/openapi.yaml" target="_blank">→ OpenAPI Schema (YAML)</a>
    <a href="/graphql/schema.json" target="_blank">→ GraphQL Schema (JSON)</a>
    <a href="/graphql/endpoint.json" target="_blank">→ GraphQL Endpoint Info (JSON)</a>
  </div>
  
  <div class="product-links">
    <p><strong>🛍️ REST Product Examples:</strong></p>
    <a href="/rest-playground?endpoint=0">→ Product Main Info</a>
    <a href="/rest-playground?endpoint=1">→ Product Price & Availability</a>
    <a href="/rest-playground?endpoint=2">→ Product Rating</a>
    <a href="/rest-playground?endpoint=3">→ All Products</a>
    <a href="/rest-playground?endpoint=4">→ Products by Category (Electronics)</a>
  </div>
  
  <div class="product-links">
    <p><strong>⚡ GraphQL Product Examples:</strong></p>
    <a href="/gql?category=0&query=0">→ All Products Query</a>
    <a href="/gql?category=0&query=1">→ Product by ID Query</a>
    <a href="/gql?category=0&query=2">→ Products by Category (Electronics)</a>
    <a href="/gql?category=0&query=3">→ Products with Specifications</a>
  </div>
  
  <div class="product-links">
    <p><strong>🌍 GraphQL Countries Examples:</strong></p>
    <a href="/gql?category=1&query=0">→ All Countries Query</a>
    <a href="/gql?category=1&query=1">→ Country by Code (US)</a>
    <a href="/gql?category=1&query=2">→ Countries with Languages</a>
    <a href="/gql?category=1&query=4">→ Continent with Countries (Europe)</a>
  </div>
  </div>
</body>
</html>
`

