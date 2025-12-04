import { navigationHeader } from '../components/navigation'

export const restPlaygroundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>REST API Playground</title>
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
    .endpoint-list {
      list-style: none;
    }
    .endpoint-item {
      padding: 10px;
      margin-bottom: 8px;
      background: #f8f9fa;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .endpoint-item:hover {
      background: #e9ecef;
    }
    .endpoint-item.active {
      background: #0066cc;
      color: white;
    }
    .endpoint-name {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 13px;
    }
    .endpoint-desc {
      font-size: 11px;
      color: #666;
    }
    .endpoint-item.active .endpoint-desc {
      color: #e3f2fd;
    }
    .method-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      margin-right: 8px;
    }
    .method-get {
      background: #10b981;
      color: white;
    }
    input[type="text"] {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      font-size: 13px;
      margin-bottom: 10px;
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
    .param-section {
      margin-top: 15px;
    }
    .param-label {
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 5px;
      color: #333;
    }
    .status-info {
      margin-bottom: 10px;
      font-size: 13px;
      color: #666;
    }
  </style>
</head>
<body>
  ${navigationHeader}
  <div class="container">
    
    <div class="layout">
      <div class="sidebar">
        <h2 style="margin-bottom: 20px;">Endpoints</h2>
        <div id="endpointCategories"></div>
      </div>
      
      <div class="main-content">
        <div class="card">
          <div class="info-section">
            <strong>REST API Endpoint:</strong>
            <div style="margin-top: 10px;">
              <select id="serverPresets" class="server-url-input" onchange="loadPresetUrl()" style="cursor: pointer;">
                <option value="">Select a server...</option>
                <option value="">(relative): Current server</option>
                <option value="http://localhost:9000">localhost:9000</option>
                <option value="https://sandbox.samircaus.workers.dev">sandbox.samircaus.workers.dev</option>
                <option value="custom">Custom URL...</option>
              </select>
            </div>
            <div style="margin-top: 10px;">
              <input type="text" id="serverUrl" class="server-url-input" placeholder="Enter custom server URL" />
            </div>
          </div>
          
          <div class="section-header">
            <h2>Request</h2>
            <button class="copy-btn" onclick="copyUrl()" id="copyUrlBtn">Copy URL</button>
          </div>
          
          <div class="param-label">Endpoint URL</div>
          <input type="text" id="urlInput" style="font-weight: 600; color: #0066cc;" placeholder="Enter or select an endpoint" />
          
          <div class="param-section" id="paramSection" style="display: none;">
            <div class="param-label">Parameters</div>
            <div id="paramInputs"></div>
          </div>
          
          <div style="margin-top: 15px;" class="button-group">
            <button onclick="executeRequest()">Send Request</button>
            <button onclick="clearResponse()">Clear</button>
          </div>
        </div>
        
        <div class="card">
          <div class="section-header">
            <h2>Response</h2>
            <button class="copy-btn" onclick="copyResponse()" id="copyResponseBtn">Copy Response</button>
          </div>
          <div class="status-info">
            Status: <strong id="statusCode">-</strong>
            <span style="margin-left: 20px;">Time: <strong id="responseTime">-</strong></span>
          </div>
          <div id="response" class="response">Response will appear here...</div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    const endpointCategories = [
      {
        name: '🛍️ Product Endpoints',
        endpoints: [
          {
            name: 'Get Product by ID',
            description: 'Main content (no price/rating)',
            path: '/product/{id}',
            params: [{ name: 'id', example: '1' }]
          },
          {
            name: 'Product Price & Availability',
            description: 'Price, stock, quantity',
            path: '/product/{id}/price',
            params: [{ name: 'id', example: '1' }]
          },
          {
            name: 'Product Rating',
            description: 'Rating and reviews count',
            path: '/product/{id}/rating',
            params: [{ name: 'id', example: '1' }]
          },
          {
            name: 'All Products',
            description: 'Get all products',
            path: '/products',
            params: []
          },
          {
            name: 'Products by Category',
            description: 'Filter by Electronics',
            path: '/products?category=Electronics',
            params: []
          },
          {
            name: 'Products - Wearables',
            description: 'Filter by Wearables',
            path: '/products?category=Wearables',
            params: []
          },
          {
            name: 'Products - Accessories',
            description: 'Filter by Accessories',
            path: '/products?category=Accessories',
            params: []
          }
        ]
      },
      {
        name: '📁 Category Endpoints',
        endpoints: [
          {
            name: 'All Categories',
            description: 'Get all categories',
            path: '/categories',
            params: []
          },
          {
            name: 'Category - Electronics',
            description: 'Get electronics category',
            path: '/category/cat-electronics',
            params: []
          },
          {
            name: 'Category - Wearables',
            description: 'Get wearables category',
            path: '/category/cat-wearables',
            params: []
          },
          {
            name: 'Category - Accessories',
            description: 'Get accessories category',
            path: '/category/cat-accessories',
            params: []
          }
        ]
      },
      {
        name: '📋 Documentation',
        endpoints: [
          {
            name: 'OpenAPI Schema (YAML)',
            description: 'API specification',
            path: '/openapi.yaml',
            params: []
          },
          {
            name: 'GraphQL Schema',
            description: 'GraphQL schema JSON',
            path: '/graphql/schema.json',
            params: []
          },
          {
            name: 'Countries GraphQL Schema',
            description: 'Countries API schema',
            path: '/graphql/countries-schema.json',
            params: []
          },
          {
            name: 'GraphQL Endpoint Info',
            description: 'GraphQL features',
            path: '/graphql/endpoint.json',
            params: []
          }
        ]
      }
    ];
    
    let currentEndpoint = null;
    
    function renderEndpointList() {
      const container = document.getElementById('endpointCategories');
      
      container.innerHTML = endpointCategories.map((category) => \`
        <div class="endpoint-category">
          <div class="category-header">\${category.name}</div>
          <ul class="endpoint-list">
            \${category.endpoints.map((e, idx) => {
              const globalIdx = endpointCategories.slice(0, endpointCategories.indexOf(category))
                .reduce((acc, cat) => acc + cat.endpoints.length, 0) + idx;
              return \`
                <li class="endpoint-item" onclick="loadEndpoint(\${globalIdx}, event)">
                  <div class="endpoint-name">\${e.name}</div>
                  <div class="endpoint-desc">\${e.description}</div>
                </li>
              \`;
            }).join('')}
          </ul>
        </div>
      \`).join('');
    }
    
    function getAllEndpoints() {
      return endpointCategories.flatMap(cat => cat.endpoints);
    }
    
    function loadEndpoint(globalIndex, evt) {
      const allEndpoints = getAllEndpoints();
      const endpoint = allEndpoints[globalIndex];
      currentEndpoint = endpoint;
      
      // Update URL with endpoint parameter
      const url = new URL(window.location);
      url.searchParams.set('endpoint', globalIndex);
      window.history.pushState({}, '', url);
      
      // Update URL display
      updateUrlDisplay();
      
      // Show/hide parameter section
      const paramSection = document.getElementById('paramSection');
      const paramInputs = document.getElementById('paramInputs');
      
      if (endpoint.params && endpoint.params.length > 0) {
        paramSection.style.display = 'block';
        paramInputs.innerHTML = endpoint.params.map(p => \`
          <div style="margin-bottom: 10px;">
            <label style="font-size: 12px; color: #666; display: block; margin-bottom: 4px;">
              \${p.name} (e.g., \${p.example})
            </label>
            <input type="text" id="param_\${p.name}" placeholder="\${p.example}" 
              value="\${p.example}" onkeyup="updateUrlDisplay()" />
          </div>
        \`).join('');
      } else {
        paramSection.style.display = 'none';
        paramInputs.innerHTML = '';
      }
      
      // Update active state
      document.querySelectorAll('.endpoint-item').forEach((item, idx) => {
        if (idx === globalIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
    
    function updateUrlDisplay() {
      if (!currentEndpoint) return;
      
      const serverUrl = getServerUrl();
      let path = currentEndpoint.path;
      
      // Replace parameters in path
      if (currentEndpoint.params && currentEndpoint.params.length > 0) {
        currentEndpoint.params.forEach(p => {
          const value = document.getElementById('param_' + p.name)?.value || p.example;
          path = path.replace('{' + p.name + '}', value);
        });
      }
      
      const fullUrl = serverUrl + path;
      document.getElementById('urlInput').value = fullUrl;
    }
    
    function getServerUrl() {
      const serverUrlInput = document.getElementById('serverUrl');
      return serverUrlInput.value.trim() || '';
    }
    
    function loadPresetUrl() {
      const presetSelect = document.getElementById('serverPresets');
      const serverUrlInput = document.getElementById('serverUrl');
      const selectedValue = presetSelect.value;
      
      if (selectedValue !== 'custom') {
        serverUrlInput.value = selectedValue;
        localStorage.setItem('rest-simple-server-url', selectedValue);
        updateUrlDisplay();
      } else if (selectedValue === 'custom') {
        serverUrlInput.focus();
      }
    }
    
    function loadSavedServerUrl() {
      const savedUrl = localStorage.getItem('rest-simple-server-url');
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
        serverUrlInput.value = '';
        presetSelect.value = '';
      }
    }
    
    async function executeRequest() {
      const url = document.getElementById('urlInput').value;
      const responseDiv = document.getElementById('response');
      const statusCodeEl = document.getElementById('statusCode');
      const responseTimeEl = document.getElementById('responseTime');
      
      if (!url.trim()) {
        responseDiv.className = 'response error';
        responseDiv.textContent = 'Please select an endpoint';
        return;
      }
      
      responseDiv.className = 'response';
      responseDiv.textContent = 'Sending request...';
      statusCodeEl.textContent = '-';
      responseTimeEl.textContent = '-';
      
      try {
        const startTime = Date.now();
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        const endTime = Date.now();
        
        statusCodeEl.textContent = response.status + ' ' + response.statusText;
        responseTimeEl.textContent = (endTime - startTime) + 'ms';
        
        // Try to parse as JSON
        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
          responseDiv.textContent = JSON.stringify(data, null, 2);
        } else {
          data = await response.text();
          responseDiv.textContent = data;
        }
        
        if (response.ok) {
          responseDiv.className = 'response success';
        } else {
          responseDiv.className = 'response error';
        }
      } catch (error) {
        responseDiv.className = 'response error';
        responseDiv.textContent = 'Error: ' + error.message;
        statusCodeEl.textContent = 'Error';
        responseTimeEl.textContent = '-';
      }
    }
    
    function clearResponse() {
      document.getElementById('response').className = 'response';
      document.getElementById('response').textContent = 'Response will appear here...';
      document.getElementById('statusCode').textContent = '-';
      document.getElementById('responseTime').textContent = '-';
    }
    
    function copyUrl() {
      const url = document.getElementById('urlInput').value;
      const btn = document.getElementById('copyUrlBtn');
      
      navigator.clipboard.writeText(url).then(() => {
        btn.classList.add('copied');
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = 'Copy URL';
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
    renderEndpointList();
    loadSavedServerUrl();
    
    // Check URL parameters for initial endpoint load
    const urlParams = new URLSearchParams(window.location.search);
    const endpointParam = urlParams.get('endpoint');
    
    if (endpointParam !== null) {
      const endpointIdx = parseInt(endpointParam);
      const allEndpoints = getAllEndpoints();
      
      if (endpointIdx >= 0 && endpointIdx < allEndpoints.length) {
        loadEndpoint(endpointIdx);
      } else {
        loadEndpoint(0);
      }
    } else {
      loadEndpoint(0);
    }
    
    // Save server URL on change
    document.getElementById('serverUrl').addEventListener('change', function() {
      const presetSelect = document.getElementById('serverPresets');
      localStorage.setItem('rest-simple-server-url', this.value);
      
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
      
      updateUrlDisplay();
    });
  </script>
</body>
</html>
`
