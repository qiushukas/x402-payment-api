import React from 'react';

export default function BuyTokenPage() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        🪙 购买代币
      </h1>
      
      <div style={{ 
        background: '#f0f9ff', 
        border: '2px solid #0ea5e9',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: 0 }}>代币信息</h2>
        <div style={{ lineHeight: '1.8' }}>
          <p><strong>代币名称:</strong> MyToken</p>
          <p><strong>代币符号:</strong> MTK</p>
          <p><strong>价格:</strong> $0.01 USDC / 代币</p>
          <p><strong>网络:</strong> Base Mainnet</p>
        </div>
      </div>

      <div style={{ 
        background: '#fefce8', 
        border: '2px solid #eab308',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: 0 }}>💰 如何购买</h2>
        <ol style={{ lineHeight: '2' }}>
          <li>选择您想购买的代币数量</li>
          <li>系统会计算需要的 USDC 金额</li>
          <li>通过 x402 支付 USDC</li>
          <li>支付确认后，代币自动发送到您的钱包</li>
        </ol>
      </div>

      <div style={{ 
        background: '#dcfce7', 
        border: '2px solid #22c55e',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: 0 }}>快速购买选项</h2>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ 
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>小额套餐</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0ea5e9', margin: '0.5rem 0' }}>
              100 代币
            </p>
            <p style={{ color: '#666', margin: '0.5rem 0' }}>价格: $1.00 USDC</p>
            <a 
              href="/api/buy-token?amount=100" 
              style={{
                display: 'inline-block',
                background: '#0ea5e9',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                marginTop: '1rem'
              }}
            >
              购买 →
            </a>
          </div>

          <div style={{ 
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>标准套餐</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6', margin: '0.5rem 0' }}>
              500 代币
            </p>
            <p style={{ color: '#666', margin: '0.5rem 0' }}>价格: $5.00 USDC</p>
            <a 
              href="/api/buy-token?amount=500" 
              style={{
                display: 'inline-block',
                background: '#8b5cf6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                marginTop: '1rem'
              }}
            >
              购买 →
            </a>
          </div>

          <div style={{ 
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>超值套餐 🌟</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b', margin: '0.5rem 0' }}>
              1000 代币
            </p>
            <p style={{ color: '#666', margin: '0.5rem 0' }}>价格: $10.00 USDC</p>
            <a 
              href="/api/buy-token?amount=1000" 
              style={{
                display: 'inline-block',
                background: '#f59e0b',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                marginTop: '1rem'
              }}
            >
              购买 →
            </a>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#fef2f2', 
        border: '1px solid #ef4444',
        borderRadius: '8px',
        padding: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: 0, color: '#ef4444' }}>⚠️ 重要提示</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>确保您的钱包连接到 <strong>Base Mainnet</strong></li>
          <li>需要有足够的 USDC 余额</li>
          <li>需要少量 ETH 用于 Gas 费</li>
          <li>代币购买后不可退款</li>
          <li>请妥善保管您的私钥</li>
        </ul>
      </div>
    </div>
  );
}

