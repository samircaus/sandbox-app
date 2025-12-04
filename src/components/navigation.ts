export const navigationHeader = `
<nav style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
  <div style="max-width: 1400px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
    <div style="display: flex; align-items: center; gap: 10px;">
      <a href="/" style="color: white; text-decoration: none; font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 24px;">🚀</span>
        <span>Sandbox API</span>
      </a>
    </div>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <a href="/rest-playground" style="color: white; text-decoration: none; padding: 8px 16px; border-radius: 6px; transition: background 0.2s; font-weight: 500; background: rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
        📡 REST Playground
      </a>
      <a href="/gql" style="color: white; text-decoration: none; padding: 8px 16px; border-radius: 6px; transition: background 0.2s; font-weight: 500; background: rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
        ⚡ GraphQL Playground
      </a>
    </div>
  </div>
</nav>
`

