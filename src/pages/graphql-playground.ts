import { navigationHeader } from '../components/navigation'

export const graphqlPlaygroundHtml = `
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
      padding: 0;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
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
    .server-url-input {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    .server-url-input:focus {
      outline: none;
      border-color: #0066cc;
    }
    .server-preset-select {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      font-size: 14px;
      background: white;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .server-preset-select:focus {
      outline: none;
      border-color: #0066cc;
    }
    .headers-section {
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .header-row {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 10px;
      margin-bottom: 10px;
      align-items: center;
    }
    .header-input {
      padding: 8px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      font-size: 13px;
    }
    .header-input:focus {
      outline: none;
      border-color: #0066cc;
    }
    .btn-small {
      padding: 8px 12px;
      font-size: 12px;
      background: #dc2626;
    }
    .btn-small:hover {
      background: #b91c1c;
    }
    .btn-add {
      background: #059669;
      margin-top: 5px;
    }
    .btn-add:hover {
      background: #047857;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .copy-btn {
      background: #6b7280;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .copy-btn:hover {
      background: #4b5563;
    }
    .copy-btn.copied {
      background: #059669;
    }
    .copy-btn svg {
      width: 14px;
      height: 14px;
    }
    .headers-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 13px;
      background: white;
      border-radius: 4px;
      overflow: hidden;
    }
    .headers-table th {
      background: #f8f9fa;
      padding: 10px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #dee2e6;
    }
    .headers-table td {
      padding: 8px 10px;
      border-bottom: 1px solid #e9ecef;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 12px;
    }
    .headers-table tr:last-child td {
      border-bottom: none;
    }
    .headers-table tr:hover {
      background: #f8f9fa;
    }
    .header-key {
      color: #0066cc;
      font-weight: 600;
    }
    .header-value {
      color: #333;
      word-break: break-all;
    }
    .headers-container {
      background: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 15px;
      max-height: 300px;
      overflow-y: auto;
    }
    .no-headers {
      color: #999;
      font-style: italic;
      text-align: center;
      padding: 20px;
    }
    .query-category {
      margin-bottom: 20px;
    }
    .category-header {
      padding: 10px;
      background: #e9ecef;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.2s;
      user-select: none;
      margin-bottom: 0;
    }
    .category-header:hover {
      background: #dee2e6;
    }
    .category-header.expanded {
      margin-bottom: 0;
    }
    .category-toggle {
      font-size: 12px;
      transition: transform 0.2s;
      transform: rotate(-90deg);
    }
    .category-header.expanded .category-toggle {
      transform: rotate(0deg);
    }
    .category-queries {
      margin-top: 8px;
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
      opacity: 0;
      margin-top: 0;
    }
    .category-queries.expanded {
      max-height: 2000px;
      opacity: 1;
      margin-top: 8px;
    }
    .category-count {
      font-size: 11px;
      background: #6c757d;
      color: white;
      padding: 2px 8px;
      border-radius: 10px;
      font-weight: normal;
    }
  </style>
</head>
<body>
  ${navigationHeader}
  <div class="container">
    
    <div class="layout">
      <div class="sidebar">
        <h2 style="margin-bottom: 20px;">Query Library</h2>
        <div id="queryCategories"></div>
      </div>
      
      <div class="main-content">
        <div class="card">
          <div class="info-section">
            <strong>GraphQL Endpoint:</strong>
            <div style="margin-top: 10px;">
              <select id="serverPresets" class="server-preset-select" onchange="loadPresetUrl()">
                <option value="">Select a preset...</option>
                <option value="/graphql">(relative): /graphql</option>
                <option value="http://localhost:9000/graphql">localhost:9000</option>
                <option value="https://sandbox.samircaus.workers.dev/graphql">sandbox.samircaus.workers.dev/graphql</option>
                <option value="https://edge-sandbox-graph.adobe.io/api/28492762-049d-4c0d-8f4a-e0b17d988d40/graphql">Adobe GraphQL Mesh Sandbox</option>
                <option value="custom">Custom URL...</option>
              </select>
            </div>
            <div style="margin-top: 10px;">
              <input type="text" id="serverUrl" class="server-url-input" placeholder="Enter custom server URL (e.g., http://localhost:9000/graphql)" />
              <button onclick="saveServerUrl()" style="margin-left: 10px; padding: 8px 16px;">Update URL</button>
            </div>
          </div>
          
          <div class="section-header">
            <h2>Query Editor</h2>
            <button class="copy-btn" onclick="copyQuery()" id="copyQueryBtn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy Query
            </button>
          </div>
          <textarea id="queryEditor" placeholder="Enter your GraphQL query here..."></textarea>
          
          <div class="headers-section">
            <h3>Request Headers</h3>
            <div id="headersContainer"></div>
            <button class="btn-add" onclick="addHeaderRow()">+ Add Header</button>
          </div>
          
          <div style="margin-top: 15px;" class="button-group">
            <button onclick="executeQuery()">Execute Query</button>
            <button onclick="clearQuery()">Clear</button>
            <button onclick="formatQuery()">Format</button>
          </div>
        </div>
        
        <div class="card">
          <div class="section-header">
            <h2>Response</h2>
            <button class="copy-btn" onclick="copyResponse()" id="copyResponseBtn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy Response
            </button>
          </div>
          
          <h3 style="margin-bottom: 5px;">Response Headers</h3>
          <div id="responseHeaders" class="headers-container">
            <div class="no-headers">No headers yet. Execute a query to see response headers.</div>
          </div>
          
          <h3 style="margin-bottom: 5px;">Response Body</h3>
          <div id="response" class="response">Response will appear here...</div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    const queryCategories = [
      {
        name: 'Introspection',
        icon: '🔍',
        queries: [
          {
            name: 'Schema Introspection',
            description: 'All available types',
            query: \`{
  __schema {
    types {
      name
      description
    }
  }
}\`
          },
          {
            name: '__TypeKind Enum Values',
            description: 'Introspect enum values',
            query: \`{
  __type(name: "__TypeKind") {
    name
    kind
    description
    enumValues {
      name
      description
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Basic Queries',
        icon: '⚡',
        queries: [
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
          }
        ]
      },
      {
        name: 'Product Queries',
        icon: '🛍️',
        queries: [
          {
            name: 'All Products - Full Schema',
            description: 'Get all products with complete OpenAPI fields',
            query: \`query GetAllProducts {
  products {
    id
    name
    description
    price
    currency
    category
    inStock
    quantity
    imageUrl
    rating
    reviews
    specifications {
      weight
      dimensions
      color
      brand
    }
    tags
  }
}\`
          },
          {
            name: 'Product by ID - Complete',
            description: 'Get single product with all fields',
            query: \`query GetProductById {
  getProductById(id: "1") {
    id
    name
    description
    price
    currency
    category
    inStock
    quantity
    imageUrl
    rating
    reviews
    specifications {
      weight
      dimensions
      color
      brand
    }
    tags
  }
}\`
          },
          {
            name: 'Products - Basic Info',
            description: 'Get essential product information',
            query: \`query ProductBasicInfo {
  products {
    id
    name
    price
    currency
    inStock
  }
}\`
          },
          {
            name: 'Products - With Specifications',
            description: 'Products with detailed specs',
            query: \`query ProductsWithSpecs {
  products {
    id
    name
    price
    specifications {
      brand
      color
      weight
      dimensions
    }
  }
}\`
          },
          {
            name: 'Products by Category - Electronics',
            description: 'Filter products by Electronics category',
            query: \`query ElectronicsProducts {
  products(category: "Electronics") {
    id
    name
    description
    price
    currency
    rating
    reviews
    specifications {
      brand
    }
  }
}\`
          },
          {
            name: 'Products by Category - Wearables',
            description: 'Filter products by Wearables category',
            query: \`query WearablesProducts {
  products(category: "Wearables") {
    id
    name
    price
    currency
    inStock
    quantity
  }
}\`
          },
          {
            name: 'Products by Category - Accessories',
            description: 'Filter products by Accessories category',
            query: \`query AccessoriesProducts {
  products(category: "Accessories") {
    id
    name
    description
    price
    tags
  }
}\`
          },
          {
            name: 'In Stock Products',
            description: 'Get only available products',
            query: \`query InStockProducts {
  products {
    id
    name
    price
    inStock
    quantity
  }
}\`
          },
          {
            name: 'Product Ratings & Reviews',
            description: 'Focus on ratings and review counts',
            query: \`query ProductRatings {
  products {
    id
    name
    rating
    reviews
    price
    currency
  }
}\`
          },
          {
            name: 'Multiple Products by ID',
            description: 'Query multiple specific products',
            query: \`query MultipleProducts {
  product1: getProductById(id: "1") {
    name
    price
    inStock
  }
  product2: getProductById(id: "2") {
    name
    price
    inStock
  }
  product3: getProductById(id: "xyz") {
    name
    price
    inStock
  }
}\`
          },
          {
            name: 'Product Catalog View',
            description: 'Optimized for catalog display',
            query: \`query ProductCatalog {
  products {
    id
    name
    description
    price
    currency
    imageUrl
    rating
    reviews
    inStock
    tags
  }
}\`
          },
          {
            name: 'Product Detail View',
            description: 'Complete product detail page data',
            query: \`query ProductDetail {
  getProductById(id: "1") {
    id
    name
    description
    price
    currency
    category
    inStock
    quantity
    imageUrl
    rating
    reviews
    specifications {
      weight
      dimensions
      color
      brand
    }
    tags
  }
}\`
          },
          {
            name: 'Products - Inventory Check',
            description: 'Stock and quantity information',
            query: \`query InventoryCheck {
  products {
    id
    name
    inStock
    quantity
    category
  }
}\`
          },
          {
            name: 'Products - Pricing Info',
            description: 'Price and currency details',
            query: \`query ProductPricing {
  products {
    id
    name
    price
    currency
    category
  }
}\`
          },
          {
            name: 'Products by Tags',
            description: 'Products with their tags',
            query: \`query ProductsByTags {
  products {
    id
    name
    tags
    category
    price
  }
}\`
          },
          {
            name: 'Product Specifications Only',
            description: 'Focus on product specs',
            query: \`query ProductSpecifications {
  products {
    id
    name
    specifications {
      brand
      color
      weight
      dimensions
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Category Queries',
        icon: '📁',
        queries: [
          {
            name: 'All Categories',
            description: 'Get all product categories',
            query: \`query GetCategories {
  categories {
    id
    name
    description
    slug
    imageUrl
    parentId
  }
}\`
          },
          {
            name: 'Category by ID',
            description: 'Get single category',
            query: \`query GetCategory {
  getCategoryById(id: "cat-electronics") {
    id
    name
    description
    slug
    imageUrl
  }
}\`
          },
          {
            name: 'Products with Category Data',
            description: 'Combined product and category query',
            query: \`query ProductsWithCategories {
  products {
    id
    name
    categoryId
    text
    price
  }
  categories {
    id
    name
    description
  }
}\`
          },
          {
            name: 'Product with Template Resolution',
            description: 'Product with text containing {{placeholders}}',
            query: \`query ProductWithTemplate {
  getProductById(id: "1") {
    id
    name
    categoryId
    text
    description
  }
  getCategoryById(id: "cat-electronics") {
    id
    name
    description
  }
}\`
          },
          {
            name: 'Products by CategoryId',
            description: 'Filter products using categoryId',
            query: \`query ProductsByCategoryId {
  electronics: products(category: "Electronics") {
    id
    name
    categoryId
    text
  }
  
  category: getCategoryById(id: "cat-electronics") {
    name
    description
  }
}\`
          }
        ]
      },
      {
        name: 'City Queries',
        icon: '🏙️',
        queries: [
          {
            name: 'All Cities',
            description: 'Fetch all cities',
            query: \`{
  cityList {
    items {
      _path
      name
      country
      population
    }
  }
}\`
          },
          {
            name: 'City Names Only',
            description: 'Return just city names',
            query: \`query {
  cityList {
    items {
      name
    }
  }
}\`
          },
          {
            name: 'Single City by Path',
            description: 'Get Berlin city details',
            query: \`{
  cityByPath(_path: "/content/dam/sample-content-fragments/cities/berlin") {
    item {
      _path
      name
      country
      population
      categories
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Filter: String Operators',
        icon: '🔤',
        queries: [
          {
            name: 'Name CONTAINS',
            description: 'Cities containing "SAN"',
            query: \`query {
  cityList(filter: {
    name: {
      _expressions: [
        {
          value: "SAN"
          _operator: CONTAINS
        }
      ]
    }
  }) {
    items {
      name
      population
      country
    }
  }
}\`
          },
          {
            name: 'Name STARTS_WITH',
            description: 'Cities starting with "San"',
            query: \`query {
  cityList(filter: {
    name: {
      _expressions: [
        {
          value: "San"
          _operator: STARTS_WITH
        }
      ]
    }
  }) {
    items {
      name
      country
    }
  }
}\`
          },
          {
            name: 'Name ENDS_WITH',
            description: 'Cities ending with "lin"',
            query: \`query {
  cityList(filter: {
    name: {
      _expressions: [
        {
          value: "lin"
          _operator: ENDS_WITH
        }
      ]
    }
  }) {
    items {
      name
      country
    }
  }
}\`
          },
          {
            name: 'Name EQUALS',
            description: 'Exact name match',
            query: \`query {
  cityList(filter: {
    name: {
      _expressions: [
        {
          value: "Berlin"
          _operator: EQUALS
        }
      ]
    }
  }) {
    items {
      name
      country
      population
    }
  }
}\`
          },
          {
            name: 'Name EQUALS_NOT',
            description: 'Cities not named Berlin',
            query: \`query {
  cityList(filter: {
    name: {
      _expressions: [
        {
          value: "Berlin"
          _operator: EQUALS_NOT
        }
      ]
    }
  }) {
    items {
      name
      country
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Filter: Numeric Operators',
        icon: '🔢',
        queries: [
          {
            name: 'Population GREATER',
            description: 'Cities with population > 1M',
            query: \`query {
  cityList(filter: {
    population: {
      _expressions: [
        {
          value: "1000000"
          _operator: GREATER
        }
      ]
    }
  }) {
    items {
      name
      population
      country
    }
  }
}\`
          },
          {
            name: 'Population GREATER_EQUAL',
            description: 'Cities with population >= 1M',
            query: \`query {
  cityList(filter: {
    population: {
      _expressions: [
        {
          value: "1000000"
          _operator: GREATER_EQUAL
        }
      ]
    }
  }) {
    items {
      name
      population
      country
    }
  }
}\`
          },
          {
            name: 'Population LOWER',
            description: 'Cities with population < 500k',
            query: \`query {
  cityList(filter: {
    population: {
      _expressions: [
        {
          value: "500000"
          _operator: LOWER
        }
      ]
    }
  }) {
    items {
      name
      population
      country
    }
  }
}\`
          },
          {
            name: 'Population LOWER_EQUAL',
            description: 'Cities with population <= 500k',
            query: \`query {
  cityList(filter: {
    population: {
      _expressions: [
        {
          value: "500000"
          _operator: LOWER_EQUAL
        }
      ]
    }
  }) {
    items {
      name
      population
      country
    }
  }
}\`
          },
          {
            name: 'Population Range (AND)',
            description: 'Cities with 400k-999k population',
            query: \`query {
  cityList(filter: {
    population: {
      _expressions: [
        {
          value: "400000"
          _operator: GREATER_EQUAL
        },
        {
          value: "1000000"
          _operator: LOWER
        }
      ]
    }
  }) {
    items {
      name
      population
      country
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Filter: Complex',
        icon: '🎯',
        queries: [
          {
            name: 'Multiple Fields',
            description: 'Germany/Switzerland, 400k-999k pop',
            query: \`query {
  cityList(filter: {
    population: {
      _expressions: [
        {
          value: "400000"
          _operator: GREATER_EQUAL
        },
        {
          value: "1000000"
          _operator: LOWER
        }
      ]
    },
    country: {
      _logOp: "OR"
      _expressions: [
        {
          value: "Germany"
          _operator: EQUALS
        },
        {
          value: "Switzerland"
          _operator: EQUALS
        }
      ]
    }
  }) {
    items {
      name
      population
      country
    }
  }
}\`
          },
          {
            name: 'Cities with Array Filter',
            description: 'Cities with "city:na" category',
            query: \`query {
  cityList(filter: {
    categories: {
      _expressions: [
        {
          value: "city:na"
          _apply: AT_LEAST_ONCE
        }
      ]
    }
  }) {
    items {
      name
      population
      country
      categories
    }
  }
}\`
          },
          {
            name: 'Cities Tagged City Break',
            description: 'Filter by _tags field',
            query: \`query {
  cityList(filter: {
    _tags: {
      _expressions: [{
        value: "tourism:city-break"
        _operator: CONTAINS
      }]
    }
  }) {
    items {
      name
      _tags
    }
  }
}\`
          },
          {
            name: 'All Filter Operators Demo',
            description: 'Comprehensive showcase',
            query: \`query AllFilterOperatorsDemo {
  equals: cityList(filter: {
    name: {
      _expressions: [
        { value: "Berlin", _operator: EQUALS }
      ]
    }
  }) {
    items { name country }
  }
  
  contains: cityList(filter: {
    name: {
      _expressions: [
        { value: "San", _operator: CONTAINS }
      ]
    }
  }) {
    items { name }
  }
  
  greater: cityList(filter: {
    population: {
      _expressions: [
        { value: "1000000", _operator: GREATER }
      ]
    }
  }) {
    items { name population }
  }
}\`
          }
        ]
      },
      {
        name: 'Person Queries',
        icon: '👤',
        queries: [
          {
            name: 'All Persons',
            description: 'Fetch all persons',
            query: \`query {
  personList {
    items {
      name
      firstName
    }
  }
}\`
          },
          {
            name: 'Person Name OR Logic',
            description: 'Name is Jobs OR Smith',
            query: \`query {
  personList(filter: {
    name: {
      _logOp: "OR"
      _expressions: [
        {
          value: "Jobs"
          _operator: EQUALS
        },
        {
          value: "Smith"
          _operator: EQUALS
        }
      ]
    }
  }) {
    items {
      name
      firstName
    }
  }
}\`
          },
          {
            name: 'Person Name EQUALS_NOT',
            description: 'Persons not named Jobs',
            query: \`query {
  personList(filter: {
    name: {
      _expressions: [
        {
          value: "Jobs"
          _operator: EQUALS_NOT
        }
      ]
    }
  }) {
    items {
      name
      firstName
    }
  }
}\`
          },
          {
            name: 'Person FirstName CONTAINS',
            description: 'FirstName contains "oh"',
            query: \`query {
  personList(filter: {
    firstName: {
      _expressions: [
        {
          value: "oh"
          _operator: CONTAINS
        }
      ]
    }
  }) {
    items {
      name
      firstName
    }
  }
}\`
          },
          {
            name: 'Person Multiple Fields',
            description: 'FirstName AND Name filters',
            query: \`query {
  personList(filter: {
    firstName: {
      _expressions: [
        {
          value: "S"
          _operator: STARTS_WITH
        }
      ]
    },
    name: {
      _expressions: [
        {
          value: "Jobs"
          _operator: EQUALS_NOT
        }
      ]
    }
  }) {
    items {
      name
      firstName
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Company Queries',
        icon: '🏢',
        queries: [
          {
            name: 'Company CEO and Employees',
            description: 'Nested fragment query',
            query: \`query {
  companyList {
    items {
      name
      ceo {
        _path
        name
        firstName
        awards {
          id
          title
        }
      }
      employees {
        name
        firstName
        awards {
          id
          title
        }
      }
    }
  }
}\`
          },
          {
            name: 'Companies with Employee Smith',
            description: 'Nested filter with _match',
            query: \`query {
  companyList(filter: {
    employees: {
      _match: {
        name: {
          _expressions: [
            { value: "Smith" }
          ]
        }
      }
    }
  }) {
    items {
      name
      ceo {
        name
        firstName
      }
      employees {
        name
        firstName
      }
    }
  }
}\`
          },
          {
            name: 'All Employees won GS',
            description: 'Deep nested filter with ALL',
            query: \`query {
  companyList(filter: {
    employees: {
      _apply: ALL
      _match: {
        awards: {
          _match: {
            id: {
              _expressions: [
                {
                  value: "GS"
                  _operator: EQUALS
                }
              ]
            }
          }
        }
      }
    }
  }) {
    items {
      name
      ceo {
        name
        firstName
      }
      employees {
        name
        firstName
        awards {
          id
          title
        }
      }
    }
  }
}\`
          },
          {
            name: 'Awards Metadata',
            description: 'Query metadata for GB award',
            query: \`query {
  awardList(filter: {
    id: {
      _expressions: [
        { value: "GB" }
      ]
    }
  }) {
    items {
      _metadata {
        stringMetadata {
          name
          value
        }
      }
      id
      title
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Adventure Queries',
        icon: '🎿',
        queries: [
          {
            name: 'Adventure Path STARTS_WITH',
            description: 'Filter by path prefix',
            query: \`query {
  adventureList(filter: {
    _path: {
      _expressions: [
        {
          value: "/content/dam/wknd/en/adventures/cycling"
          _operator: STARTS_WITH
        }
      ]
    }
  }) {
    items {
      _path
      title
      adventureType
    }
  }
}\`
          },
          {
            name: 'Adventure Title CONTAINS',
            description: 'Title contains "Surf"',
            query: \`query {
  adventureList(filter: {
    title: {
      _expressions: [
        {
          value: "Surf"
          _operator: CONTAINS
        }
      ]
    }
  }) {
    items {
      title
      description
      price
    }
  }
}\`
          },
          {
            name: 'Adventure Type EQUALS',
            description: 'Filter by adventure type',
            query: \`query {
  adventureList(filter: {
    adventureType: {
      _expressions: [
        {
          value: "Camping"
          _operator: EQUALS
        }
      ]
    }
  }) {
    items {
      title
      adventureType
      price
    }
  }
}\`
          },
          {
            name: 'Adventure Price Range',
            description: 'Price between $100-$500',
            query: \`query {
  adventureList(filter: {
    price: {
      _expressions: [
        {
          value: "100"
          _operator: GREATER_EQUAL
        },
        {
          value: "500"
          _operator: LOWER_EQUAL
        }
      ]
    }
  }) {
    items {
      title
      price
      adventureType
    }
  }
}\`
          },
          {
            name: 'Adventure Description CONTAINS_NOT',
            description: 'Description does not contain "beginner"',
            query: \`query {
  adventureList(filter: {
    description: {
      _expressions: [
        {
          value: "beginner"
          _operator: CONTAINS_NOT
        }
      ]
    }
  }) {
    items {
      title
      description
      adventureType
    }
  }
}\`
          },
          {
            name: 'Adventure Complex Filter',
            description: 'Type=Camping, Price<$300, Title has "Mountain"',
            query: \`query {
  adventureList(filter: {
    adventureType: {
      _expressions: [
        {
          value: "Camping"
          _operator: EQUALS
        }
      ]
    },
    price: {
      _expressions: [
        {
          value: "300"
          _operator: LOWER
        }
      ]
    },
    title: {
      _expressions: [
        {
          value: "Mountain"
          _operator: CONTAINS
        }
      ]
    }
  }) {
    items {
      title
      adventureType
      price
      description
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Pagination',
        icon: '📄',
        queries: [
          {
            name: 'Offset/Limit Pagination',
            description: 'Skip 5, get next 5 cities',
            query: \`{
  cityList(offset: 5, limit: 5) {
    items {
      name
      country
      population
    }
  }
}\`
          },
          {
            name: 'Cursor-based Pagination',
            description: 'Adventures with cursors',
            query: \`{
  adventurePaginated(first: 5) {
    edges {
      cursor
      node {
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Batch Queries',
        icon: '📦',
        queries: [
          {
            name: 'Multiple Queries (Cities + Persons)',
            description: 'Add batch mode header manually',
            query: \`{
  cityList(limit: 3) {
    items {
      name
      country
    }
  }
  personList {
    items {
      firstName
      name
    }
  }
}

# Add header: X-GraphQL-Batch-Mode = true
# Response: { "data": { "_0_cityList": {...}, "_1_personList": {...} } }\`
          },
          {
            name: 'Dashboard Query',
            description: 'Multiple queries at once',
            query: \`{
  companyList {
    items {
      name
      ceo {
        firstName
        name
      }
    }
  }
  awardList {
    items {
      id
      title
    }
  }
  adventureList(limit: 5) {
    items {
      title
      price
    }
  }
}

# Add header: X-GraphQL-Batch-Mode = true
# Response: { "data": { "_0_companyList": {...}, "_1_awardList": {...}, "_2_adventureList": {...} } }\`
          },
          {
            name: 'Users + Products',
            description: 'Two different data sources',
            query: \`{
  users {
    id
    name
    role
  }
  products {
    id
    name
    price
  }
}

# Add header: X-GraphQL-Batch-Mode = true
# Response: { "data": { "_0_users": [...], "_1_products": [...] } }\`
          }
        ]
      },
      {
        name: 'Persisted Queries',
        icon: '💾',
        queries: [
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
            name: 'Content Fragment Dashboard',
            description: 'Cities, persons, and companies',
            query: \`query ContentDashboard {
  cityList {
    items {
      name
      country
      population
    }
  }
  personList {
    items {
      firstName
      name
    }
  }
  companyList {
    items {
      name
      ceo {
        firstName
        name
      }
    }
  }
}\`
          },
          {
            name: 'Travel Planning Query',
            description: 'Cities for city breaks with adventures',
            query: \`query TravelPlanning {
  cityList(filter: {
    _tags: {
      _expressions: [{
        value: "tourism:city-break"
        _operator: CONTAINS
      }]
    }
  }) {
    items {
      name
      country
      _tags
    }
  }
  adventureList {
    items {
      title
      adventureType
      price
    }
  }
}\`
          },
          {
            name: 'Organization Report',
            description: 'Companies with award-winning staff',
            query: \`query OrganizationReport {
  companyList {
    items {
      name
      ceo {
        firstName
        name
        awards {
          title
        }
      }
      employees {
        firstName
        name
        awards {
          title
        }
      }
    }
  }
  awardList {
    items {
      id
      title
    }
  }
}\`
          }
        ]
      },
      {
        name: 'OpenAPI Schema Queries',
        icon: '📋',
        queries: [
          {
            name: 'OpenAPI Product Schema Type',
            description: 'Get Product type from GraphQL schema',
            query: \`query OpenAPIProductType {
  __type(name: "Product") {
    name
    kind
    description
    fields {
      name
      description
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}\`
          },
          {
            name: 'Product Specifications Type',
            description: 'Get ProductSpecifications type details',
            query: \`query ProductSpecsType {
  __type(name: "ProductSpecifications") {
    name
    kind
    description
    fields {
      name
      description
      type {
        name
        kind
      }
    }
  }
}\`
          },
          {
            name: 'Product Query Fields',
            description: 'List all product-related queries',
            query: \`query ProductQueryFields {
  __type(name: "Query") {
    fields {
      name
      description
      args {
        name
        description
        type {
          name
          kind
        }
      }
      type {
        name
        kind
      }
    }
  }
}\`
          },
          {
            name: 'Complete Product Schema',
            description: 'Full Product type introspection',
            query: \`query CompleteProductSchema {
  productType: __type(name: "Product") {
    name
    kind
    description
    fields {
      name
      description
      type {
        name
        kind
        ofType {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
  
  specificationsType: __type(name: "ProductSpecifications") {
    name
    fields {
      name
      type {
        name
      }
    }
  }
  
  productQueries: __type(name: "Query") {
    fields {
      name
      description
      args {
        name
        type {
          name
        }
      }
    }
  }
}\`
          },
          {
            name: 'Product Field Details',
            description: 'Detailed field information',
            query: \`{
  __type(name: "Product") {
    fields {
      name
      description
      type {
        name
        kind
      }
      isDeprecated
      deprecationReason
    }
  }
}\`
          }
        ]
      },
      {
        name: 'Countries API',
        icon: '🌍',
        queries: [
          {
            name: 'All Countries',
            description: 'Get all countries with basic info',
            query: \`query GetAllCountries {
  countries {
    code
    name
    capital
    currency
    emoji
  }
}\`
          },
          {
            name: 'Country by Code',
            description: 'Get specific country (e.g., US)',
            query: \`query GetCountryByCode {
  country(code: "US") {
    code
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}\`
          },
          {
            name: 'Countries with Languages',
            description: 'Get countries with their languages',
            query: \`query CountriesWithLanguages {
  countries {
    name
    code
    languages {
      code
      name
      native
    }
  }
}\`
          },
          {
            name: 'Countries by Continent',
            description: 'Get countries in Europe',
            query: \`query CountriesByContinent {
  continent(code: "EU") {
    name
    countries {
      code
      name
      capital
      currency
    }
  }
}\`
          },
          {
            name: 'All Continents',
            description: 'Get all continents',
            query: \`query GetContinents {
  continents {
    code
    name
  }
}\`
          },
          {
            name: 'Language Details',
            description: 'Get specific language info',
            query: \`query GetLanguage {
  language(code: "en") {
    code
    name
    native
    rtl
  }
}\`
          },
          {
            name: 'Country Full Details',
            description: 'Complete country information',
            query: \`query CountryFullDetails {
  country(code: "FR") {
    code
    name
    native
    phone
    capital
    currency
    emoji
    emojiU
    continent {
      code
      name
    }
    languages {
      code
      name
      native
    }
    states {
      code
      name
    }
  }
}\`
          },
          {
            name: 'Multiple Countries',
            description: 'Query multiple specific countries',
            query: \`query MultipleCountries {
  us: country(code: "US") {
    name
    capital
    currency
  }
  uk: country(code: "GB") {
    name
    capital
    currency
  }
  japan: country(code: "JP") {
    name
    capital
    currency
  }
}\`
          },
          {
            name: 'Countries with States',
            description: 'Countries with their states/regions',
            query: \`query CountriesWithStates {
  country(code: "US") {
    name
    states {
      code
      name
    }
  }
}\`
          },
          {
            name: 'Continent with Details',
            description: 'Continent with nested country info',
            query: \`query ContinentDetails {
  continent(code: "AS") {
    name
    code
    countries {
      name
      capital
      currency
      emoji
      languages {
        name
      }
    }
  }
}\`
          }
        ]
      },
      {
        name: 'GET Examples',
        icon: '🔗',
        queries: [
          {
            name: 'GET: Hello',
            description: 'Simple greeting via GET',
            query: '{hello}',
            getUrl: '/graphql?query={hello}'
          },
          {
            name: 'GET: All Users',
            description: 'Fetch all users via GET',
            query: '{users{id name email role}}',
            getUrl: '/graphql?query={users{id name email role}}'
          },
          {
            name: 'GET: All Cities',
            description: 'Fetch all cities via GET',
            query: '{cityList{items{name country population}}}',
            getUrl: '/graphql?query={cityList{items{name country population}}}'
          },
          {
            name: 'GET: City by Path',
            description: 'Fetch Berlin city details',
            query: '{cityByPath(_path:"/content/dam/sample-content-fragments/cities/berlin"){item{name country population}}}',
            getUrl: '/graphql?query={cityByPath(_path:"/content/dam/sample-content-fragments/cities/berlin"){item{name country population}}}'
          },
          {
            name: 'GET: All Persons',
            description: 'Fetch all persons via GET',
            query: '{personList{items{firstName name}}}',
            getUrl: '/graphql?query={personList{items{firstName name}}}'
          },
          {
            name: 'GET: All Companies',
            description: 'Fetch companies with CEO',
            query: '{companyList{items{name ceo{firstName name}}}}',
            getUrl: '/graphql?query={companyList{items{name ceo{firstName name}}}}'
          },
          {
            name: 'GET: All Adventures',
            description: 'Fetch all adventures',
            query: '{adventureList{items{title adventureType price}}}',
            getUrl: '/graphql?query={adventureList{items{title adventureType price}}}'
          },
          {
            name: 'GET: Schema Types',
            description: 'Introspect schema types',
            query: '{__schema{types{name}}}',
            getUrl: '/graphql?query={__schema{types{name}}}'
          },
          {
            name: 'GET: All Products',
            description: 'Fetch all products via GET',
            query: '{products{id name price currency inStock}}',
            getUrl: '/graphql?query={products{id name price currency inStock}}'
          },
          {
            name: 'GET: Product by ID',
            description: 'Get product by ID via GET',
            query: '{getProductById(id:"1"){id name price inStock}}',
            getUrl: '/graphql?query={getProductById(id:"1"){id name price inStock}}'
          },
          {
            name: 'GET: Products by Category',
            description: 'Filter products by Electronics',
            query: '{products(category:"Electronics"){id name price}}',
            getUrl: '/graphql?query={products(category:"Electronics"){id name price}}'
          },
          {
            name: 'GET: Product with Specs',
            description: 'Get product with specifications',
            query: '{getProductById(id:"1"){name price specifications{brand color}}}',
            getUrl: '/graphql?query={getProductById(id:"1"){name price specifications{brand color}}}'
          },
          {
            name: 'GET: All Categories',
            description: 'Fetch all categories',
            query: '{categories{id name description}}',
            getUrl: '/graphql?query={categories{id name description}}'
          },
          {
            name: 'GET: Category by ID',
            description: 'Get category by ID',
            query: '{getCategoryById(id:"cat-electronics"){name description}}',
            getUrl: '/graphql?query={getCategoryById(id:"cat-electronics"){name description}}'
          },
          {
            name: 'GET: Product with CategoryId',
            description: 'Product with category reference',
            query: '{getProductById(id:"1"){name categoryId text}}',
            getUrl: '/graphql?query={getProductById(id:"1"){name categoryId text}}'
          }
        ]
      }
    ];
    
    function toggleCategory(categoryIndex) {
      const header = document.getElementById(\`category-header-\${categoryIndex}\`);
      const queries = document.getElementById(\`category-queries-\${categoryIndex}\`);
      
      const isExpanded = header.classList.contains('expanded');
      
      if (isExpanded) {
        header.classList.remove('expanded');
        queries.classList.remove('expanded');
      } else {
        header.classList.add('expanded');
        queries.classList.add('expanded');
      }
    }
    
    function expandCategory(categoryIndex) {
      const header = document.getElementById(\`category-header-\${categoryIndex}\`);
      const queries = document.getElementById(\`category-queries-\${categoryIndex}\`);
      
      if (!header.classList.contains('expanded')) {
        header.classList.add('expanded');
        queries.classList.add('expanded');
      }
    }
    
    function renderQueryList() {
      const container = document.getElementById('queryCategories');
      
      container.innerHTML = queryCategories.map((category, catIdx) => \`
        <div class="query-category">
          <div class="category-header" id="category-header-\${catIdx}" onclick="toggleCategory(\${catIdx})">
            <span>\${category.icon} \${category.name} <span class="category-count">\${category.queries.length}</span></span>
            <span class="category-toggle">▼</span>
          </div>
          <div class="category-queries" id="category-queries-\${catIdx}">
            <ul class="query-list">
              \${category.queries.map((q, qIdx) => \`
                <li class="query-item" data-category="\${catIdx}" data-query="\${qIdx}" onclick="loadQuery(\${catIdx}, \${qIdx}, event)">
                  <div class="query-name">\${q.name}</div>
                  <div class="query-desc">\${q.description}</div>
                </li>
              \`).join('')}
            </ul>
          </div>
        </div>
      \`).join('');
    }
    
    function loadQuery(categoryIndex, queryIndex, evt) {
      const category = queryCategories[categoryIndex];
      const query = category.queries[queryIndex];
      document.getElementById('queryEditor').value = query.query;
      
      // Update URL with query parameters
      const url = new URL(window.location);
      url.searchParams.set('category', categoryIndex);
      url.searchParams.set('query', queryIndex);
      window.history.pushState({}, '', url);
      
      // Expand the category if not already expanded
      expandCategory(categoryIndex);
      
      // Show GET URL if available
      const responseDiv = document.getElementById('response');
      if (query.getUrl) {
        const serverUrl = getServerUrl();
        const baseUrl = serverUrl.startsWith('http') ? new URL(serverUrl).origin : window.location.origin;
        const fullUrl = baseUrl + query.getUrl;
        
        responseDiv.className = 'response';
        responseDiv.innerHTML = \`<strong>GET Request URL:</strong>\\n\${fullUrl}\\n\\n<strong>Encoded URL:</strong>\\n\${encodeURI(fullUrl)}\\n\\nClick "Execute Query" or visit the URL above in your browser.\\n\\n<button onclick="copyGetUrl('\${encodeURI(fullUrl).replace(/'/g, "\\\\'")}')">Copy URL</button> <button onclick="openGetUrl('\${encodeURI(fullUrl).replace(/'/g, "\\\\'")}')">Open in New Tab</button>\`;
      } else {
        responseDiv.className = 'response';
        responseDiv.textContent = 'Response will appear here...';
      }
      
      // Update active state
      document.querySelectorAll('.query-item').forEach(item => {
        item.classList.remove('active');
      });
      if (evt) {
        evt.target.closest('.query-item').classList.add('active');
      }
    }
    
    function copyGetUrl(url) {
      navigator.clipboard.writeText(url).then(() => {
        alert('URL copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
    
    function openGetUrl(url) {
      window.open(url, '_blank');
    }
    
    function loadPresetUrl() {
      const presetSelect = document.getElementById('serverPresets');
      const serverUrlInput = document.getElementById('serverUrl');
      const selectedValue = presetSelect.value;
      
      if (selectedValue && selectedValue !== 'custom') {
        serverUrlInput.value = selectedValue;
        localStorage.setItem('graphql-server-url', selectedValue);
      } else if (selectedValue === 'custom') {
        serverUrlInput.focus();
      }
    }
    
    function saveServerUrl() {
      const serverUrl = document.getElementById('serverUrl').value.trim();
      if (serverUrl) {
        localStorage.setItem('graphql-server-url', serverUrl);
        
        // Update preset dropdown if it matches a preset
        const presetSelect = document.getElementById('serverPresets');
        let foundPreset = false;
        for (let option of presetSelect.options) {
          if (option.value === serverUrl) {
            presetSelect.value = serverUrl;
            foundPreset = true;
            break;
          }
        }
        if (!foundPreset && serverUrl) {
          presetSelect.value = 'custom';
        }
        
        alert('Server URL saved: ' + serverUrl);
      } else {
        localStorage.removeItem('graphql-server-url');
        alert('Server URL cleared. Will use default /graphql endpoint.');
      }
    }
    
    function loadServerUrl() {
      const savedUrl = localStorage.getItem('graphql-server-url');
      const serverUrlInput = document.getElementById('serverUrl');
      const presetSelect = document.getElementById('serverPresets');
      
      if (savedUrl) {
        serverUrlInput.value = savedUrl;
        
        // Set dropdown to matching preset or "custom"
        let foundPreset = false;
        for (let option of presetSelect.options) {
          if (option.value === savedUrl) {
            presetSelect.value = savedUrl;
            foundPreset = true;
            break;
          }
        }
        if (!foundPreset) {
          presetSelect.value = 'custom';
        }
      } else {
        serverUrlInput.value = '/graphql';
        presetSelect.value = '/graphql';
      }
    }
    
    function getServerUrl() {
      const serverUrlInput = document.getElementById('serverUrl');
      return serverUrlInput.value.trim() || '/graphql';
    }
    
    function addHeaderRow(key = '', value = '') {
      const container = document.getElementById('headersContainer');
      const rowId = 'header_' + Date.now();
      
      const row = document.createElement('div');
      row.className = 'header-row';
      row.id = rowId;
      row.innerHTML = \`
        <input type="text" class="header-input" placeholder="Header name (e.g., Authorization)" 
          value="\${key}" onchange="saveHeaders()" />
        <input type="text" class="header-input" placeholder="Header value" 
          value="\${value}" onchange="saveHeaders()" />
        <button class="btn-small" onclick="removeHeaderRow('\${rowId}')">Remove</button>
      \`;
      
      container.appendChild(row);
    }
    
    function removeHeaderRow(rowId) {
      const row = document.getElementById(rowId);
      if (row) {
        row.remove();
        saveHeaders();
      }
    }
    
    function saveHeaders() {
      const headers = getHeaders();
      localStorage.setItem('graphql-headers', JSON.stringify(headers));
    }
    
    function getHeaders() {
      const container = document.getElementById('headersContainer');
      const rows = container.querySelectorAll('.header-row');
      const headers = {};
      
      rows.forEach(row => {
        const inputs = row.querySelectorAll('.header-input');
        const key = inputs[0].value.trim();
        const value = inputs[1].value.trim();
        
        if (key && value) {
          headers[key] = value;
        }
      });
      
      // Always include Content-Type for GraphQL
      headers['Content-Type'] = 'application/json';
      
      return headers;
    }
    
    function loadHeaders() {
      const saved = localStorage.getItem('graphql-headers');
      if (saved) {
        try {
          const headers = JSON.parse(saved);
          Object.entries(headers).forEach(([key, value]) => {
            if (key !== 'Content-Type') { // Don't show Content-Type as it's always added
              addHeaderRow(key, value);
            }
          });
        } catch (e) {
          console.error('Failed to load headers:', e);
        }
      }
    }
    
    function displayResponseHeaders(response) {
      const headersContainer = document.getElementById('responseHeaders');
      const headers = {};
      
      // Extract all headers
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      
      // Check if there are any headers
      if (Object.keys(headers).length === 0) {
        headersContainer.innerHTML = '<div class="no-headers">No response headers</div>';
        return;
      }
      
      // Build table HTML
      let tableHtml = '<table class="headers-table"><thead><tr><th>Header</th><th>Value</th></tr></thead><tbody>';
      
      for (const [key, value] of Object.entries(headers)) {
        tableHtml += \`
          <tr>
            <td class="header-key">\${key}</td>
            <td class="header-value">\${value}</td>
          </tr>
        \`;
      }
      
      tableHtml += '</tbody></table>';
      headersContainer.innerHTML = tableHtml;
    }
    
    async function executeQuery() {
      const query = document.getElementById('queryEditor').value;
      const responseDiv = document.getElementById('response');
      const headersContainer = document.getElementById('responseHeaders');
      
      if (!query.trim()) {
        responseDiv.className = 'response error';
        responseDiv.textContent = 'Please enter a query';
        return;
      }
      
      responseDiv.className = 'response';
      responseDiv.textContent = 'Executing query...';
      headersContainer.innerHTML = '<div class="no-headers">Loading...</div>';
      
      try {
        const serverUrl = getServerUrl();
        let requestBody;
        
        // Check if the query is a batch request (JSON array)
        const trimmedQuery = query.trim();
        if (trimmedQuery.startsWith('[') && trimmedQuery.endsWith(']')) {
          // It's a batch request - parse and re-stringify to ensure valid JSON
          try {
            const batchArray = JSON.parse(trimmedQuery);
            requestBody = JSON.stringify(batchArray);
          } catch (parseError) {
            responseDiv.className = 'response error';
            responseDiv.textContent = 'Invalid batch JSON format: ' + parseError.message;
            headersContainer.innerHTML = '<div class="no-headers">Error</div>';
            return;
          }
        } else {
          // Regular GraphQL query
          const queryName = document.querySelector('.query-item.active .query-name')?.textContent || '';
          
          // Check if this is a batch query by looking for "Batch Index" in the name
          if (queryName.includes('Batch Index')) {
            // Extract batch index from query name (e.g., "User Query with Batch Index 0")
            const indexMatch = queryName.match(/Batch Index (\\d+)/);
            const batchIndex = indexMatch ? parseInt(indexMatch[1]) : 0;
            
            // Clean the query - remove comment lines
            const cleanedQuery = query.split('\\n')
              .filter(line => !line.trim().startsWith('#'))
              .join('\\n')
              .trim();
            
            requestBody = JSON.stringify({ query: cleanedQuery, batchIndex });
          } else {
            requestBody = JSON.stringify({ query });
          }
        }
        
        const headers = getHeaders();
        
        const response = await fetch(serverUrl, {
          method: 'POST',
          headers: headers,
          body: requestBody
        });
        
        const data = await response.json();
        
        // Display response headers
        displayResponseHeaders(response);
        
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
        headersContainer.innerHTML = '<div class="no-headers">Error fetching headers</div>';
      }
    }
    
    function clearQuery() {
      document.getElementById('queryEditor').value = '';
      document.getElementById('response').className = 'response';
      document.getElementById('response').textContent = 'Response will appear here...';
      document.getElementById('responseHeaders').innerHTML = '<div class="no-headers">No headers yet. Execute a query to see response headers.</div>';
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
    
    function copyQuery() {
      const query = document.getElementById('queryEditor').value;
      const btn = document.getElementById('copyQueryBtn');
      
      navigator.clipboard.writeText(query).then(() => {
        // Show success feedback
        btn.classList.add('copied');
        btn.innerHTML = \`
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Copied!
        \`;
        
        // Reset after 2 seconds
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = \`
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy Query
          \`;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
      });
    }
    
    function copyResponse() {
      const response = document.getElementById('response').textContent;
      const btn = document.getElementById('copyResponseBtn');
      
      navigator.clipboard.writeText(response).then(() => {
        // Show success feedback
        btn.classList.add('copied');
        btn.innerHTML = \`
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Copied!
        \`;
        
        // Reset after 2 seconds
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = \`
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy Response
          \`;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
      });
    }
    
    // Initialize
    renderQueryList();
    
    // Check URL parameters for initial query load
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const queryParam = urlParams.get('query');
    
    if (categoryParam !== null && queryParam !== null) {
      const catIdx = parseInt(categoryParam);
      const qIdx = parseInt(queryParam);
      
      // Validate indices
      if (catIdx >= 0 && catIdx < queryCategories.length && 
          qIdx >= 0 && qIdx < queryCategories[catIdx].queries.length) {
        loadQuery(catIdx, qIdx);
      } else {
        // Default to first query if invalid params
        loadQuery(0, 0);
      }
    } else {
      // No params, load first query
      loadQuery(0, 0);
    }
    
    loadServerUrl();
    loadHeaders();
  </script>
</body>
</html>
`

