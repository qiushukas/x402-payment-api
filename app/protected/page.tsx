import React from 'react';

export default function ProtectedPage() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        🔒 受保护的内容
      </h1>
      
      <div style={{ 
        background: '#f0f9ff', 
        border: '1px solid #0ea5e9',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <p style={{ margin: 0 }}>
          恭喜！您已成功支付并访问此受保护的内容。
        </p>
      </div>

      <div style={{ 
        background: '#fefce8', 
        border: '1px solid #eab308',
        borderRadius: '8px',
        padding: '1.5rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>💡 关于这个页面</h2>
        <p>
          这是一个受 x402 支付中间件保护的示例页面。
          访问此页面需要支付 <strong>$0.01</strong>。
        </p>
        <ul>
          <li>网络: Base Sepolia (测试网)</li>
          <li>价格: $0.01</li>
          <li>支付状态: ✅ 已验证</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', color: '#666' }}>
        <h3 style={{ fontSize: '1rem' }}>这里可以放置您的优质内容：</h3>
        <ul>
          <li>高级教程</li>
          <li>独家资源</li>
          <li>付费文章</li>
          <li>会员专属功能</li>
        </ul>
      </div>
    </div>
  );
}

