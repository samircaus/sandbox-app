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
  </style>
</head>
<body>
  ${navigationHeader}
  <div class="container">
    <h1>GraphQL Playground</h1>
    <p class="subtitle">Test your GraphQL API with sample queries</p>
    
    <div class="layout">
      <div class="sidebar">
        <h2>Sample Queries</h2>
        <ul class="query-list" id="queryList"></ul>
        
        <h2 style="margin-top: 30px;">Persisted Queries</h2>
        <ul class="query-list" id="persistedQueryList"></ul>
        
        <h2 style="margin-top: 30px;">GET Examples</h2>
        <ul class="query-list" id="getQueryList"></ul>
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
                <option value="custom">Custom URL...</option>
              </select>
            </div>
            <div style="margin-top: 10px;">
              <input type="text" id="serverUrl" class="server-url-input" placeholder="Enter custom server URL (e.g., http://localhost:9000/graphql)" />
              <button onclick="saveServerUrl()" style="margin-left: 10px; padding: 8px 16px;">Update URL</button>
            </div>
          </div>
          
          <h2>Query Editor</h2>
          <textarea id="queryEditor" placeholder="Enter your GraphQL query here..."></textarea>
          
          <div style="margin-top: 15px;" class="button-group">
            <button onclick="executeQuery()">Execute Query</button>
            <button onclick="clearQuery()">Clear</button>
            <button onclick="formatQuery()">Format</button>
          </div>
        </div>
        
        <div class="card">
          <h2>Response</h2>
          <div id="response" class="response">Response will appear here...</div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    const sampleQueries = [
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
      },
      {
        name: 'Single User',
        description: 'Fetch user by ID',
        query: \`query {
  user(id: "1") {
    id
    name
    email
    role
  }
}\`
      },
      {
        name: 'All Products',
        description: 'Fetch all products',
        query: \`query {
  products {
    id
    name
    price
    category
    inStock
  }
}\`
      },
      {
        name: 'Products by Category',
        description: 'Filter products by category',
        query: \`query {
  products(category: "Electronics") {
    id
    name
    price
    inStock
  }
}\`
      },
      {
        name: 'Single Product',
        description: 'Fetch product by ID',
        query: \`query {
  product(id: "1") {
    id
    name
    price
    category
    inStock
  }
}\`
      },
      {
        name: 'Batch: User (index 0)',
        description: 'Query with batch index 0',
        query: \`query {
  user(id: "1") {
    name
    email
  }
}
# Response keys will be prefixed: _0_user\`
      },
      {
        name: 'Batch: Products (index 1)',
        description: 'Query with batch index 1',
        query: \`query {
  products {
    id
    name
    price
  }
}
# Response keys will be prefixed: _1_products\`
      }
    ];
    
    const persistedQueries = [
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
        name: 'User Products View',
        description: 'User info with products',
        query: \`query UserProductsView {
  user(id: "1") {
    name
    email
  }
  products(category: "Electronics") {
    name
    price
  }
}\`
      },
      {
        name: 'Inventory Check',
        description: 'Check product inventory',
        query: \`query InventoryCheck {
  products {
    id
    name
    category
    inStock
  }
}\`
      },
      {
        name: 'Batch Request Example',
        description: 'Multiple queries with prefixed keys',
        query: \`# Send as batch array to get prefixed keys
# POST body should be an array:
[
  { "query": "{ user(id: \\\\"1\\\\") { name } }" },
  { "query": "{ user(id: \\\\"2\\\\") { name } }" },
  { "query": "{ products { name price } }" }
]

# Response will have keys:
# _0_user, _1_user, _2_products

# For single query with batch index, include:
{ 
  "query": "{ user(id: \\\\"1\\\\") { name } }",
  "batchIndex": 0
}
# Response: { "data": { "_0_user": {...} } }\`
      }
    ];
    
    const getQueryExamples = [
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
        name: 'GET: User by ID',
        description: 'Fetch single user via GET',
        query: '{user(id:"1"){id name email role}}',
        getUrl: '/graphql?query={user(id:"1"){id name email role}}'
      },
      {
        name: 'GET: All Products',
        description: 'Fetch all products via GET',
        query: '{products{id name price category inStock}}',
        getUrl: '/graphql?query={products{id name price category inStock}}'
      },
      {
        name: 'GET: Electronics',
        description: 'Filter products by category',
        query: '{products(category:"Electronics"){id name price inStock}}',
        getUrl: '/graphql?query={products(category:"Electronics"){id name price inStock}}'
      },
      {
        name: 'GET: Product by ID',
        description: 'Fetch single product via GET',
        query: '{product(id:"1"){id name price category inStock}}',
        getUrl: '/graphql?query={product(id:"1"){id name price category inStock}}'
      }
    ];
    
    function renderQueryList() {
      const queryList = document.getElementById('queryList');
      queryList.innerHTML = sampleQueries.map((q, idx) => \`
        <li class="query-item" onclick="loadQuery(\${idx}, 'sample', event)">
          <div class="query-name">\${q.name}</div>
          <div class="query-desc">\${q.description}</div>
        </li>
      \`).join('');
      
      const persistedList = document.getElementById('persistedQueryList');
      persistedList.innerHTML = persistedQueries.map((q, idx) => \`
        <li class="query-item" onclick="loadQuery(\${idx}, 'persisted', event)">
          <div class="query-name">\${q.name}</div>
          <div class="query-desc">\${q.description}</div>
        </li>
      \`).join('');
      
      const getList = document.getElementById('getQueryList');
      getList.innerHTML = getQueryExamples.map((q, idx) => \`
        <li class="query-item" onclick="loadQuery(\${idx}, 'get', event)">
          <div class="query-name">\${q.name}</div>
          <div class="query-desc">\${q.description}</div>
        </li>
      \`).join('');
    }
    
    function loadQuery(index, queryType, evt) {
      let query;
      let queries;
      
      if (queryType === 'sample') {
        queries = sampleQueries;
      } else if (queryType === 'persisted') {
        queries = persistedQueries;
      } else if (queryType === 'get') {
        queries = getQueryExamples;
      }
      
      query = queries[index];
      document.getElementById('queryEditor').value = query.query;
      
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
        
        // Check if query name contains "Batch:" to add batch index
        let requestBody;
        const queryName = document.querySelector('.query-item.active .query-name')?.textContent || '';
        
        if (queryName.includes('Batch:')) {
          // Extract batch index from query name (e.g., "Batch: User (index 0)")
          const indexMatch = queryName.match(/index\s+(\d+)/);
          const batchIndex = indexMatch ? parseInt(indexMatch[1]) : 0;
          requestBody = JSON.stringify({ query, batchIndex });
        } else {
          requestBody = JSON.stringify({ query });
        }
        
        const response = await fetch(serverUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
    
    function formatQuery() {
      const query = document.getElementById('queryEditor').value;
      // Basic formatting - can be enhanced
      const formatted = query
        .replace(/\\{/g, ' {\\n  ')
        .replace(/\\}/g, '\\n}')
        .replace(/\\n\\s*\\n/g, '\\n');
      document.getElementById('queryEditor').value = formatted;
    }
    
    // Initialize
    renderQueryList();
    loadQuery(0, 'sample');
    loadServerUrl();
  </script>
</body>
</html>
`

