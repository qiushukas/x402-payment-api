import { NextResponse } from 'next/server';

// 您的代币销售配置
const TOKEN_SALE_CONFIG = {
  tokenAddress: '0xYourTokenAddress',  // 🔴 替换为您的代币地址
  saleAddress: '0xYourSaleContractAddress',  // 🔴 替换为销售合约地址
  tokenName: 'MyToken',
  tokenSymbol: 'MTK',
  pricePerToken: 0.01,  // $0.01 USDC
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenAmount = searchParams.get('amount') || '100';
  
  const usdcCost = parseFloat(tokenAmount) * TOKEN_SALE_CONFIG.pricePerToken;
  
  return NextResponse.json({
    tokenInfo: {
      name: TOKEN_SALE_CONFIG.tokenName,
      symbol: TOKEN_SALE_CONFIG.tokenSymbol,
      address: TOKEN_SALE_CONFIG.tokenAddress,
    },
    saleInfo: {
      saleContractAddress: TOKEN_SALE_CONFIG.saleAddress,
      pricePerToken: TOKEN_SALE_CONFIG.pricePerToken,
      currency: 'USDC',
    },
    purchase: {
      tokenAmount: tokenAmount,
      usdcCost: usdcCost.toFixed(2),
      estimatedGas: '~$0.10',
    },
    instructions: {
      step1: `通过 x402 支付 $${usdcCost.toFixed(2)} USDC`,
      step2: `支付验证后，${tokenAmount} ${TOKEN_SALE_CONFIG.tokenSymbol} 将发送到您的钱包`,
      step3: '在区块链浏览器查看交易',
    },
    links: {
      tokenContract: `https://basescan.org/token/${TOKEN_SALE_CONFIG.tokenAddress}`,
      saleContract: `https://basescan.org/address/${TOKEN_SALE_CONFIG.saleAddress}`,
    }
  });
}

export async function POST(request: Request) {
  try {
    const { tokenAmount, userAddress } = await request.json();
    
    if (!tokenAmount || !userAddress) {
      return NextResponse.json(
        { error: '缺少必需参数' },
        { status: 400 }
      );
    }
    
    const usdcCost = parseFloat(tokenAmount) * TOKEN_SALE_CONFIG.pricePerToken;
    
    // 这里是简化版本
    // 在真实实现中，您需要：
    // 1. 验证 x402 支付已完成
    // 2. 调用销售合约的 buyTokens 函数
    // 3. 将代币发送给用户
    
    return NextResponse.json({
      success: true,
      message: `购买成功！`,
      transaction: {
        tokenAmount: tokenAmount,
        usdcPaid: usdcCost,
        recipient: userAddress,
        tokenAddress: TOKEN_SALE_CONFIG.tokenAddress,
        // txHash: '0x...'  // 真实的交易哈希
      },
      nextSteps: [
        '代币已发送到您的钱包',
        '可以在 MetaMask 中查看余额',
        `在 Basescan 查看: https://basescan.org/address/${userAddress}`,
      ]
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: '购买失败' },
      { status: 500 }
    );
  }
}

