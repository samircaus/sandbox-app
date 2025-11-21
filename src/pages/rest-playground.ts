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
      font-family: monospace;
    }
    .endpoint-desc {
      font-size: 12px;
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
      min-height: 300px;
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
    .info-section a {
      color: #0066cc;
      text-decoration: none;
      font-weight: 600;
    }
    .info-section a:hover {
      text-decoration: underline;
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
    .param-section {
      margin-top: 15px;
    }
    .param-label {
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 5px;
      color: #333;
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
  </style>
</head>
<body>
  ${navigationHeader}
  <div class="container">
    <h1>REST API Playground</h1>
    <p class="subtitle">Test your OpenAPI-compliant REST endpoints</p>
    
    <div class="layout">
      <div class="sidebar">
        <h2>Available Endpoints</h2>
        <ul class="endpoint-list" id="endpointList"></ul>
        
        <h2 style="margin-top: 30px;">Documentation</h2>
        <div style="padding: 10px; background: #f8f9fa; border-radius: 4px; font-size: 14px;">
          <p style="margin-bottom: 10px;">This API follows the OpenAPI 3.0 specification.</p>
          <a href="/openapi.yaml" target="_blank" style="color: #0066cc; text-decoration: none; font-weight: 600;">📄 View OpenAPI Schema (YAML)</a>
        </div>
      </div>
      
      <div class="main-content">
        <div class="card">
          <div class="info-section">
            <strong>🔌 REST API Endpoint (OpenAPI Compliant)</strong>
            <p style="margin-top: 8px; margin-bottom: 8px;">Full specification: <a href="/openapi.yaml" target="_blank">openapi.yaml</a></p>
            <div style="margin-top: 10px;">
              <select id="serverPresets" class="server-preset-select" onchange="loadPresetUrl()">
                <option value="">Select a server...</option>
                <option value="">(relative): Current server</option>
                <option value="http://localhost:9000">localhost:9000</option>
                <option value="https://sandbox.samircaus.workers.dev">sandbox.samircaus.workers.dev</option>
                <option value="custom">Custom URL...</option>
              </select>
            </div>
            <div style="margin-top: 10px;">
              <input type="text" id="serverUrl" class="server-url-input" placeholder="Enter custom server URL" />
              <button onclick="saveServerUrl()" style="margin-left: 10px; padding: 8px 16px;">Update URL</button>
            </div>
          </div>
          
          <h2>Request Configuration</h2>
          <div>
            <div class="param-label">HTTP Method</div>
            <input type="text" id="methodInput" readonly value="GET" style="background: #f0f0f0;" />
            
            <div class="param-section">
              <div class="param-label">Endpoint Path</div>
              <input type="text" id="pathInput" placeholder="/product/{id}" />
            </div>
            
            <div class="param-section">
              <div class="param-label">Path Parameters</div>
              <div id="paramInputs"></div>
            </div>
          </div>
          
          <div class="headers-section">
            <h3>Request Headers</h3>
            <div id="headersContainer"></div>
            <button class="btn-add" onclick="addHeaderRow()">+ Add Header</button>
          </div>
          
          <div style="margin-top: 15px;" class="button-group">
            <button onclick="executeRequest()">Send Request</button>
            <button onclick="clearRequest()">Clear</button>
          </div>
        </div>
        
        <div class="card">
          <h2>Response</h2>
          <div style="margin-bottom: 10px;">
            <span style="font-size: 13px; color: #666;">Status: <strong id="statusCode">-</strong></span>
            <span style="margin-left: 20px; font-size: 13px; color: #666;">Time: <strong id="responseTime">-</strong></span>
          </div>
          <div id="response" class="response">Response will appear here...</div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    const endpoints = [
      {
        method: 'GET',
        path: '/product/{id}',
        operationId: 'getProductById',
        name: 'getProductById',
        description: 'Get product by ID - Returns a product with randomized properties',
        params: [
          { name: 'id', description: 'Product ID', example: '1' }
        ]
      },
      {
        method: 'GET',
        path: '/product/42',
        operationId: 'getProductById',
        name: 'getProductById (example: 42)',
        description: 'Example with numeric ID',
        params: []
      },
      {
        method: 'GET',
        path: '/product/xyz',
        operationId: 'getProductById',
        name: 'getProductById (example: xyz)',
        description: 'Example with alphanumeric ID',
        params: []
      }
    ];
    
    function renderEndpointList() {
      const endpointList = document.getElementById('endpointList');
      endpointList.innerHTML = endpoints.map((e, idx) => \`
        <li class="endpoint-item" onclick="loadEndpoint(\${idx}, event)">
          <div class="endpoint-name">
            <span class="method-badge method-get">\${e.method}</span>
            \${e.path}
          </div>
          <div class="endpoint-desc">\${e.description}</div>
        </li>
      \`).join('');
    }
    
    function loadEndpoint(index, evt) {
      const endpoint = endpoints[index];
      document.getElementById('methodInput').value = endpoint.method;
      document.getElementById('pathInput').value = endpoint.path;
      
      // Render parameter inputs
      const paramInputs = document.getElementById('paramInputs');
      if (endpoint.params.length > 0) {
        paramInputs.innerHTML = endpoint.params.map(p => \`
          <div style="margin-bottom: 10px;">
            <label style="font-size: 12px; color: #666;">\${p.name} - \${p.description}</label>
            <input type="text" id="param_\${p.name}" placeholder="\${p.example}" 
              onkeyup="updatePath()" style="margin-top: 4px;" />
          </div>
        \`).join('');
      } else {
        paramInputs.innerHTML = '<p style="font-size: 13px; color: #999;">No parameters required</p>';
      }
      
      // Update active state
      document.querySelectorAll('.endpoint-item').forEach(item => {
        item.classList.remove('active');
      });
      if (evt) {
        evt.target.closest('.endpoint-item').classList.add('active');
      }
    }
    
    function updatePath() {
      const endpoint = endpoints[document.querySelector('.endpoint-item.active') ? 
        Array.from(document.querySelectorAll('.endpoint-item')).findIndex(el => el.classList.contains('active')) : 0];
      
      if (!endpoint || endpoint.params.length === 0) return;
      
      let path = endpoint.path;
      endpoint.params.forEach(p => {
        const value = document.getElementById('param_' + p.name).value || p.example;
        path = path.replace('{' + p.name + '}', value);
      });
      document.getElementById('pathInput').value = path;
    }
    
    function loadPresetUrl() {
      const presetSelect = document.getElementById('serverPresets');
      const serverUrlInput = document.getElementById('serverUrl');
      const selectedValue = presetSelect.value;
      
      if (selectedValue && selectedValue !== 'custom') {
        serverUrlInput.value = selectedValue;
        localStorage.setItem('rest-server-url', selectedValue);
      } else if (selectedValue === 'custom') {
        serverUrlInput.focus();
      }
    }
    
    function saveServerUrl() {
      const serverUrl = document.getElementById('serverUrl').value.trim();
      if (serverUrl) {
        localStorage.setItem('rest-server-url', serverUrl);
        
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
        localStorage.removeItem('rest-server-url');
        alert('Server URL cleared. Will use current server.');
      }
    }
    
    function loadServerUrl() {
      const savedUrl = localStorage.getItem('rest-server-url');
      const serverUrlInput = document.getElementById('serverUrl');
      const presetSelect = document.getElementById('serverPresets');
      
      if (savedUrl) {
        serverUrlInput.value = savedUrl;
        
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
        serverUrlInput.value = '';
        presetSelect.value = '';
      }
    }
    
    function getServerUrl() {
      const serverUrlInput = document.getElementById('serverUrl');
      return serverUrlInput.value.trim() || '';
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
      localStorage.setItem('rest-headers', JSON.stringify(headers));
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
      
      return headers;
    }
    
    function loadHeaders() {
      const saved = localStorage.getItem('rest-headers');
      if (saved) {
        try {
          const headers = JSON.parse(saved);
          Object.entries(headers).forEach(([key, value]) => {
            addHeaderRow(key, value);
          });
        } catch (e) {
          console.error('Failed to load headers:', e);
        }
      }
    }
    
    async function executeRequest() {
      const method = document.getElementById('methodInput').value;
      const path = document.getElementById('pathInput').value;
      const responseDiv = document.getElementById('response');
      const statusCodeEl = document.getElementById('statusCode');
      const responseTimeEl = document.getElementById('responseTime');
      
      if (!path.trim()) {
        responseDiv.className = 'response error';
        responseDiv.textContent = 'Please enter an endpoint path';
        return;
      }
      
      responseDiv.className = 'response';
      responseDiv.textContent = 'Sending request...';
      statusCodeEl.textContent = '-';
      responseTimeEl.textContent = '-';
      
      try {
        const serverUrl = getServerUrl();
        const fullUrl = serverUrl + path;
        
        const headers = getHeaders();
        
        const startTime = Date.now();
        const response = await fetch(fullUrl, {
          method: method,
          headers: headers
        });
        const endTime = Date.now();
        
        const data = await response.json();
        
        statusCodeEl.textContent = response.status + ' ' + response.statusText;
        responseTimeEl.textContent = (endTime - startTime) + 'ms';
        
        if (response.ok) {
          responseDiv.className = 'response success';
          responseDiv.textContent = JSON.stringify(data, null, 2);
        } else {
          responseDiv.className = 'response error';
          responseDiv.textContent = JSON.stringify(data, null, 2);
        }
      } catch (error) {
        responseDiv.className = 'response error';
        responseDiv.textContent = 'Error: ' + error.message;
        statusCodeEl.textContent = 'Error';
        responseTimeEl.textContent = '-';
      }
    }
    
    function clearRequest() {
      document.getElementById('pathInput').value = '';
      document.getElementById('paramInputs').innerHTML = '';
      document.getElementById('response').className = 'response';
      document.getElementById('response').textContent = 'Response will appear here...';
      document.getElementById('statusCode').textContent = '-';
      document.getElementById('responseTime').textContent = '-';
      document.querySelectorAll('.endpoint-item').forEach(item => {
        item.classList.remove('active');
      });
    }
    
    // Initialize
    renderEndpointList();
    loadEndpoint(0);
    loadServerUrl();
    loadHeaders();
  </script>
</body>
</html>
`

