import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        💳 x402 支付中间件演示
      </h1>
      
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        这是一个集成了 x402 支付中间件的 Next.js 应用程序示例。
      </p>

      <div style={{ 
        background: '#f8fafc', 
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: 0 }}>📋 配置信息</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>测试网络:</strong> Base Sepolia 和 Solana Devnet</li>
          <li><strong>Facilitator URL:</strong> https://x402.org/facilitator</li>
          <li><strong>支付方式:</strong> 加密货币微支付</li>
        </ul>
      </div>

      <div style={{ 
        background: '#dcfce7', 
        border: '1px solid #22c55e',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: 0 }}>✅ 配置已完成</h2>
        <p>
          <strong>钱包地址:</strong> <code style={{ 
            background: '#fff', 
            padding: '4px 8px', 
            borderRadius: '4px',
            fontSize: '0.85em'
          }}>0xc61cd7032925603c63b2eb658e2b56faac351d24</code>
        </p>
        <p style={{ marginBottom: 0 }}>
          您可以开始测试了！查看 <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>TESTING-GUIDE.md</code> 了解详细的测试步骤。
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          border: '2px solid #0ea5e9',
          borderRadius: '8px',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#0ea5e9' }}>
            🔒 受保护的页面
          </h3>
          <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
            需要支付 $0.01 才能访问
          </p>
          <Link 
            href="/protected" 
            style={{
              display: 'inline-block',
              background: '#0ea5e9',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            访问受保护页面 →
          </Link>
        </div>

        <div style={{ 
          border: '2px solid #8b5cf6',
          borderRadius: '8px',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#8b5cf6' }}>
            🚀 高级 API
          </h3>
          <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
            需要支付 $0.05 才能访问高级数据和功能
          </p>
          <a 
            href="/api/premium" 
            target="_blank"
            style={{
              display: 'inline-block',
              background: '#8b5cf6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            访问高级 API →
          </a>
        </div>

        <div style={{ 
          border: '2px solid #f59e0b',
          borderRadius: '8px',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#f59e0b' }}>
            🌤️ 天气 API（演示）
          </h3>
          <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
            需要支付 $0.001 获取实时天气数据
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a 
              href="/api/weather?location=Beijing&units=celsius" 
              target="_blank"
              style={{
                display: 'inline-block',
                background: '#f59e0b',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}
            >
              北京天气 →
            </a>
            <a 
              href="/api/weather?location=Shanghai&units=celsius" 
              target="_blank"
              style={{
                display: 'inline-block',
                background: '#f59e0b',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}
            >
              上海天气 →
            </a>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#f0f9ff', 
        border: '1px solid #0ea5e9',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: 0 }}>🧪 开始测试</h3>
        <p>运行自动化测试脚本验证集成：</p>
        <div style={{ 
          background: '#1e293b', 
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          marginBottom: '1rem'
        }}>
          node test-integration.js
        </div>
        <p style={{ margin: 0 }}>
          或使用 cURL 手动测试：<code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '0.5rem' }}>bash test-with-curl.sh</code>
        </p>
      </div>

      <div style={{ 
        background: '#fef3c7', 
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        padding: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: 0 }}>📚 后续步骤</h3>
        <ol style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
          <li>运行测试脚本验证 402 响应 ✓</li>
          <li>获取 Base Sepolia 测试代币</li>
          <li>使用兼容客户端测试实际支付</li>
          <li>查看 <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>TESTING-GUIDE.md</code> 了解详细测试流程</li>
          <li>准备好后，切换到主网配置</li>
          <li>开始接受真实的加密货币支付！</li>
        </ol>
      </div>
    </div>
  );
}

