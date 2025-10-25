// 主网中间件配置 - 使用 CDP Facilitator 和真实 USDC
// ⚠️ 这会接受真实的加密货币支付！

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 注意：这是简化版本，因为我们遇到了 Solana 依赖问题
// 如果 x402-next 的 Solana 问题解决后，可以使用完整版本：
// import { paymentMiddleware } from 'x402-next';
// import { facilitator } from '@coinbase/x402';

// 从环境变量读取配置
const RECEIVER_ADDRESS = process.env.RECEIVER_WALLET_ADDRESS || '0xc61cd7032925603c63b2eb658e2b56faac351d24';
const NETWORK = process.env.NETWORK || 'base-mainnet';
const CDP_API_KEY_ID = process.env.CDP_API_KEY_ID;
const CDP_API_KEY_SECRET = process.env.CDP_API_KEY_SECRET;

// 验证主网配置
if (NETWORK === 'base-mainnet') {
  if (!CDP_API_KEY_ID || !CDP_API_KEY_SECRET) {
    console.warn('⚠️ 警告：主网模式需要 CDP_API_KEY_ID 和 CDP_API_KEY_SECRET');
    console.warn('请在 .env.local 中设置这些环境变量');
  }
}

// 主网 402 响应生成器
function create402Response(price: string, network: string, description: string) {
  return NextResponse.json(
    {
      error: 'Payment Required',
      price: price,
      network: network,
      description: description,
      facilitator: {
        type: 'cdp',
        network: 'mainnet',
        // CDP facilitator 会使用环境变量中的 API 密钥
        message: 'Using Coinbase Developer Platform facilitator for mainnet'
      },
      paymentInstructions: {
        message: 'Payment required to access this resource',
        price: price,
        network: network,
        receiverAddress: RECEIVER_ADDRESS,
        acceptedTokens: ['ETH', 'USDC'],
        chainId: 8453, // Base mainnet chain ID
      }
    },
    { 
      status: 402,
      headers: {
        'X-Payment-Required': 'true',
        'X-Payment-Network': network,
        'X-Payment-Price': price,
      }
    }
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 检查是否有支付凭证
  const paymentToken = request.headers.get('X-Payment');
  
  // 简化版本：检查支付 token
  // 真实实现需要验证区块链交易
  if (paymentToken) {
    console.log('⚠️ 收到支付凭证，但简化版无法验证真实交易');
    console.log('需要完整的 x402-next 实现来验证支付');
    // 在真实实现中，这里会验证区块链交易
  }
  
  console.log(`🔒 Payment middleware triggered (${NETWORK}):`, pathname);
  
  // 检查路由并返回 402
  if (pathname.startsWith('/protected')) {
    return create402Response(
      '$0.01',
      NETWORK,
      'Access exclusive protected content with premium features and insights'
    );
  }
  
  if (pathname.startsWith('/api/premium')) {
    return create402Response(
      '$0.05',
      NETWORK,
      'Access premium API endpoint with real-time data, advanced analytics, and priority support'
    );
  }
  
  if (pathname.startsWith('/api/weather')) {
    return create402Response(
      '$0.001',
      NETWORK,
      'Get real-time weather data including temperature, conditions, and humidity for any location worldwide'
    );
  }
  
  if (pathname.startsWith('/api/buy-token')) {
    // 代币购买端点 - 根据购买数量动态定价
    // 默认 100 代币 = $1.00 USDC
    return create402Response(
      '$1.00',
      NETWORK,
      'Purchase tokens with USDC - receive tokens directly to your wallet'
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/protected/:path*',
    '/api/premium/:path*',
    '/api/weather/:path*',
    '/api/buy-token/:path*',
  ]
};

