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
    <p>Welcome! This is a sample product API.</p>
    <div class="product-links">
    <p>Try these sample REST endpoints:</p>
    <a href="/product/1">→ Product 1</a>
    <a href="/product/42">→ Product 42</a>
    <a href="/product/xyz">→ Product XYZ</a>
  </div>
  <div class="product-links">
    <p>API Playgrounds:</p>
    <a href="/rest-playground">→ REST Playground (OpenAPI)</a>
    <a href="/graphql-playground">→ GraphQL Playground</a>
  </div>
  <div class="product-links">
    <p>API Documentation:</p>
    <a href="/openapi.yaml">→ OpenAPI Schema (YAML)</a>
  </div>
  </div>
</body>
</html>
`

