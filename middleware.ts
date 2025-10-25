// x402scan 兼容的中间件配置
// 完全符合 x402scan 的严格 schema 要求

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 从环境变量读取配置
const RECEIVER_ADDRESS = process.env.RECEIVER_WALLET_ADDRESS || '0xc61cd7032925603c63b2eb658e2b56faac351d24';
const NETWORK = 'base';

// x402scan 兼容的 402 响应生成器
function createX402ScanResponse(
  request: NextRequest,
  priceUSD: number,
  description: string,
  outputSchema?: any
) {
  const fullUrl = request.nextUrl.toString();
  
  // 将美元价格转换为 USDC 最小单位 (6 位小数)
  const maxAmountRequired = Math.floor(priceUSD * 1000000).toString();
  
  return NextResponse.json(
    {
      x402Version: 1,
      accepts: [
        {
          scheme: "exact",
          network: "base",
          maxAmountRequired: maxAmountRequired,
          resource: fullUrl,
          description: description,
          mimeType: "application/json",
          payTo: RECEIVER_ADDRESS,
          maxTimeoutSeconds: 60,
          asset: "USDC",
          ...(outputSchema && { outputSchema })
        }
      ]
    },
    { 
      status: 402,
      headers: {
        'Content-Type': 'application/json',
        'X-Payment-Required': 'true',
      }
    }
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const paymentToken = request.headers.get('X-Payment');
  
  if (paymentToken) {
    console.log('Payment token received, verification needed');
  }
  
  console.log(`x402scan middleware:`, pathname);
  
  // Protected 页面
  if (pathname.startsWith('/protected')) {
    return createX402ScanResponse(
      request,
      0.01,
      'Access exclusive protected content with premium features and insights',
      {
        input: {
          type: "http",
          method: "GET"
        },
        output: {
          type: "object",
          properties: {
            content: { type: "string", description: "Premium protected content" },
            timestamp: { type: "string", description: "Content timestamp" }
          }
        }
      }
    );
  }
  
  // Premium API
  if (pathname.startsWith('/api/premium')) {
    return createX402ScanResponse(
      request,
      0.05,
      'Access premium API endpoint with real-time data, advanced analytics, and priority support',
      {
        input: {
          type: "http",
          method: "GET",
          queryParams: {
            category: {
              type: "string",
              required: false,
              description: "Data category to fetch",
              enum: ["analytics", "reports", "insights"]
            }
          }
        },
        output: {
          type: "object",
          properties: {
            data: { type: "object", description: "Premium data response" },
            timestamp: { type: "string", description: "Data timestamp" },
            premium: { type: "boolean", description: "Premium tier indicator" }
          }
        }
      }
    );
  }
  
  // Weather API
  if (pathname.startsWith('/api/weather')) {
    return createX402ScanResponse(
      request,
      0.001,
      'Get real-time weather data including temperature, conditions, and humidity for any location worldwide',
      {
        input: {
          type: "http",
          method: "GET",
          queryParams: {
            location: {
              type: "string",
              required: true,
              description: "City name or coordinates"
            },
            units: {
              type: "string",
              required: false,
              description: "Temperature units",
              enum: ["celsius", "fahrenheit"]
            }
          }
        },
        output: {
          type: "object",
          properties: {
            location: { type: "string", description: "Location name" },
            temperature: { type: "number", description: "Current temperature" },
            conditions: { type: "string", description: "Weather conditions" },
            humidity: { type: "number", description: "Humidity percentage" },
            timestamp: { type: "string", description: "Data timestamp" }
          }
        }
      }
    );
  }
  
  // Buy Token API
  if (pathname.startsWith('/api/buy-token')) {
    return createX402ScanResponse(
      request,
      1.00,
      'Purchase custom tokens with USDC - receive tokens directly to your wallet after payment confirmation',
      {
        input: {
          type: "http",
          method: "POST",
          bodyType: "json",
          bodyFields: {
            amount: {
              type: "number",
              required: true,
              description: "Amount of tokens to purchase (minimum 100)"
            },
            walletAddress: {
              type: "string",
              required: true,
              description: "Your wallet address to receive tokens"
            }
          }
        },
        output: {
          type: "object",
          properties: {
            success: { type: "boolean", description: "Transaction success status" },
            tokenAmount: { type: "number", description: "Number of tokens purchased" },
            transactionHash: { type: "string", description: "Blockchain transaction hash" },
            receiverAddress: { type: "string", description: "Wallet address that received tokens" }
          }
        }
      }
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
