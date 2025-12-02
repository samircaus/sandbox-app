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
          <h2>Response</h2>
          <div id="response" class="response">Response will appear here...</div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    const sampleQueries = [
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
      },
      {
        name: 'Cities with SAN (case-insensitive)',
        description: 'Filter cities containing "SAN"',
        query: \`query {
  cityList(filter: {
    name: {
      _expressions: [
        {
          value: "SAN"
          _operator: CONTAINS
          _ignoreCase: true
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
        name: 'Cities by Population Range',
        description: 'Germany/Switzerland, 400k-999k pop',
        query: \`query {
  cityList(filter: {
    population: {
      _expressions: [
        {
          value: 400000
          _operator: GREATER_EQUAL
        }, {
          value: 1000000
          _operator: LOWER
        }
      ]
    },
    country: {
      _logOp: OR
      _expressions: [
        { value: "Germany" }, 
        { value: "Switzerland" }
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
        name: 'Persons: Jobs or Smith',
        description: 'Filter with OR logic',
        query: \`query {
  personList(filter: {
    name: {
      _logOp: OR
      _expressions: [
        { value: "Jobs" },
        { value: "Smith" }
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
        name: 'Persons Not Named Jobs',
        description: 'EQUALS_NOT operator',
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
        name: 'Companies: All Employees won GS',
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
      },
      {
        name: 'Adventures with STARTS_WITH',
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
    }
  }
}\`
      },
      {
        name: 'Pagination with offset/limit',
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
        
        const headers = getHeaders();
        
        const response = await fetch(serverUrl, {
          method: 'POST',
          headers: headers,
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
    loadHeaders();
  </script>
</body>
</html>
`

