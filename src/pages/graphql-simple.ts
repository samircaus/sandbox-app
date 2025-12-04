import { navigationHeader } from '../components/navigation'

export const graphqlSimplePlaygroundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GraphQL Playground - Simple</title>
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
      max-width: 1200px;
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
      grid-template-columns: 280px 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    .sidebar {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: fit-content;
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
      font-size: 13px;
    }
    .query-desc {
      font-size: 11px;
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
    .server-url-input {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      font-size: 14px;
      transition: border-color 0.2s;
      margin-top: 10px;
    }
    .server-url-input:focus {
      outline: none;
      border-color: #0066cc;
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
    }
    .copy-btn:hover {
      background: #4b5563;
    }
    .copy-btn.copied {
      background: #059669;
    }
    .category-header {
      font-weight: 700;
      color: #333;
      margin: 15px 0 10px 0;
      padding-bottom: 5px;
      border-bottom: 2px solid #0066cc;
      font-size: 14px;
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
              <select id="serverPresets" class="server-url-input" onchange="loadPresetUrl()" style="cursor: pointer;">
                <option value="">Select a server...</option>
                <option value="/graphql">(relative): /graphql</option>
                <option value="http://localhost:9000/graphql">localhost:9000/graphql</option>
                <option value="https://sandbox.samircaus.workers.dev/graphql">sandbox.samircaus.workers.dev/graphql</option>
                <option value="https://countries.trevorblades.com/graphql">Countries API (trevorblades.com)</option>
                <option value="custom">Custom URL...</option>
              </select>
            </div>
            <div style="margin-top: 10px;">
              <input type="text" id="serverUrl" class="server-url-input" placeholder="Enter custom GraphQL endpoint URL" />
            </div>
          </div>
          
          <div class="section-header">
            <h2>Query Editor</h2>
            <button class="copy-btn" onclick="copyQuery()" id="copyQueryBtn">Copy Query</button>
          </div>
          <textarea id="queryEditor" placeholder="Enter your GraphQL query here..."></textarea>
          
          <div style="margin-top: 15px;" class="button-group">
            <button onclick="executeQuery()">Execute Query</button>
            <button onclick="clearQuery()">Clear</button>
          </div>
        </div>
        
        <div class="card">
          <div class="section-header">
            <h2>Response</h2>
            <button class="copy-btn" onclick="copyResponse()" id="copyResponseBtn">Copy Response</button>
          </div>
          <div id="response" class="response">Response will appear here...</div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    const queryCategories = [
      {
        name: '🛍️ Product Queries',
        queries: [
          {
            name: 'All Products',
            description: 'Get all products',
            query: \`query {
  products {
    id
    name
    description
    price
    currency
    category
    inStock
  }
}\`
          },
          {
            name: 'Product by ID',
            description: 'Get single product',
            query: \`query {
  getProductById(id: "1") {
    id
    name
    description
    price
    currency
    inStock
    specifications {
      weight
      dimensions
      color
      brand
    }
  }
}\`
          },
          {
            name: 'Products by Category',
            description: 'Filter by Electronics',
            query: \`query {
  products(category: "Electronics") {
    id
    name
    price
    currency
    rating
  }
}\`
          },
          {
            name: 'Products with Specs',
            description: 'Products with specifications',
            query: \`query {
  products {
    id
    name
    price
    specifications {
      brand
      color
    }
  }
}\`
          }
        ]
      },
      {
        name: '🌍 Countries (Local)',
        queries: [
          {
            name: 'All Countries',
            description: 'Get all countries from local API',
            query: \`query {
  countries {
    code
    name
    description
    capital
    currency
    emoji
  }
}\`
          },
          {
            name: 'Country by Code',
            description: 'Get country description (US)',
            query: \`query {
  country(code: "US") {
    code
    name
    description
    capital
    currency
    emoji
  }
}\`
          },
          {
            name: 'Country - Germany',
            description: 'Get Germany info',
            query: \`query {
  country(code: "DE") {
    code
    name
    description
    capital
    currency
    emoji
  }
}\`
          },
          {
            name: 'Country - Great Britain',
            description: 'Get Great Britain info with languages',
            query: \`query {
  country(code: "GB") {
    code
    name
    description
    capital
    currency
    emoji
    languages {
      code
      name
      native
    }
  }
}\`
          }
        ]
      },
      {
        name: '📁 Category Queries',
        queries: [
          {
            name: 'All Categories',
            description: 'Get all product categories',
            query: \`query {
  categories {
    id
    name
    description
    slug
  }
}\`
          },
          {
            name: 'Category by ID',
            description: 'Get single category',
            query: \`query {
  getCategoryById(id: "cat-electronics") {
    id
    name
    description
  }
}\`
          }
        ]
      },
      {
        name: '⚡ Basic Queries',
        queries: [
          {
            name: 'Hello Query',
            description: 'Simple greeting',
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
      }
    ];
    
    function renderQueryList() {
      const container = document.getElementById('queryCategories');
      
      container.innerHTML = queryCategories.map((category, catIdx) => \`
        <div class="query-category">
          <div class="category-header">\${category.name}</div>
          <ul class="query-list">
            \${category.queries.map((q, qIdx) => \`
              <li class="query-item" onclick="loadQuery(\${catIdx}, \${qIdx}, event)">
                <div class="query-name">\${q.name}</div>
                <div class="query-desc">\${q.description}</div>
              </li>
            \`).join('')}
          </ul>
        </div>
      \`).join('');
    }
    
    function loadQuery(categoryIndex, queryIndex, evt) {
      const category = queryCategories[categoryIndex];
      const query = category.queries[queryIndex];
      document.getElementById('queryEditor').value = query.query;
      
      // Update active state
      document.querySelectorAll('.query-item').forEach(item => {
        item.classList.remove('active');
      });
      if (evt) {
        evt.target.closest('.query-item').classList.add('active');
      }
    }
    
    function getServerUrl() {
      const serverUrlInput = document.getElementById('serverUrl');
      return serverUrlInput.value.trim() || '/graphql';
    }
    
    function loadPresetUrl() {
      const presetSelect = document.getElementById('serverPresets');
      const serverUrlInput = document.getElementById('serverUrl');
      const selectedValue = presetSelect.value;
      
      if (selectedValue !== 'custom') {
        serverUrlInput.value = selectedValue;
        localStorage.setItem('graphql-simple-server-url', selectedValue);
      } else if (selectedValue === 'custom') {
        serverUrlInput.focus();
      }
    }
    
    function loadSavedServerUrl() {
      const savedUrl = localStorage.getItem('graphql-simple-server-url');
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
        if (!foundPreset && savedUrl) {
          presetSelect.value = 'custom';
        }
      } else {
        serverUrlInput.value = '/graphql';
        presetSelect.value = '/graphql';
      }
    }
    
    async function executeQuery() {
      const query = document.getElementById('queryEditor').value;
      const responseDiv = document.getElementById('response');
      
      if (!query.trim()) {
        responseDiv.className = 'response error';
        responseDiv.textContent = 'Please enter a query';
        return;
      }
      
      responseDiv.className = 'response';
      responseDiv.textContent = 'Executing query...';
      
      try {
        const serverUrl = getServerUrl();
        const requestBody = JSON.stringify({ query });
        
        const response = await fetch(serverUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBody
        });
        
        const data = await response.json();
        
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
      }
    }
    
    function clearQuery() {
      document.getElementById('queryEditor').value = '';
      document.getElementById('response').className = 'response';
      document.getElementById('response').textContent = 'Response will appear here...';
      document.querySelectorAll('.query-item').forEach(item => {
        item.classList.remove('active');
      });
    }
    
    function copyQuery() {
      const query = document.getElementById('queryEditor').value;
      const btn = document.getElementById('copyQueryBtn');
      
      navigator.clipboard.writeText(query).then(() => {
        btn.classList.add('copied');
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = 'Copy Query';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
    
    function copyResponse() {
      const response = document.getElementById('response').textContent;
      const btn = document.getElementById('copyResponseBtn');
      
      navigator.clipboard.writeText(response).then(() => {
        btn.classList.add('copied');
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = 'Copy Response';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
    
    // Initialize
    renderQueryList();
    loadQuery(0, 0);
    loadSavedServerUrl();
    
    // Save server URL on change
    document.getElementById('serverUrl').addEventListener('change', function() {
      const presetSelect = document.getElementById('serverPresets');
      localStorage.setItem('graphql-simple-server-url', this.value);
      
      // Update preset dropdown if it matches a preset
      let foundPreset = false;
      for (let option of presetSelect.options) {
        if (option.value === this.value) {
          presetSelect.value = this.value;
          foundPreset = true;
          break;
        }
      }
      if (!foundPreset && this.value) {
        presetSelect.value = 'custom';
      }
    });
  </script>
</body>
</html>
`

