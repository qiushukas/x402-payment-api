# x402 Payment Middleware - Token Sale API

A Next.js application integrating x402 payment middleware for micropayments and token sales on Base blockchain.

## Features

- Micropayments: Accept USDC payments for API access using x402 protocol
- Token Sales: Sell custom ERC-20 tokens on Base chain
- Multiple Payment Tiers: Support for different pricing models
- Base Mainnet Ready: Production-ready configuration with CDP Facilitator
- Smart Contracts: Includes ERC-20 token and TokenSale contracts

## Quick Start

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables

Copy .env.example to .env.local and fill in your values:

```bash
# Coinbase Developer Platform API Keys
CDP_API_KEY_ID=your-api-key-id
CDP_API_KEY_SECRET=your-api-key-secret

# Your Base wallet address to receive payments
RECEIVER_WALLET_ADDRESS=0xYourAddress
```

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your application.

## Documentation

- [Quick Start Guide](docs/QUICKSTART.md) - Get started in 5 minutes
- [Testing Guide](docs/TESTING-GUIDE.md) - How to test payment flows
- [Mainnet Setup](docs/MAINNET-SETUP-GUIDE.md) - Production deployment guide
- [Token Deployment](docs/DEPLOY-TOKEN-GUIDE.md) - Deploy your own token
- [Vercel Deployment](docs/VERCEL-DEPLOYMENT-GUIDE.md) - Deploy to Vercel
- [x402scan Registration](docs/X402SCAN-REGISTRATION-GUIDE.md) - List on x402 Bazaar

## Project Structure

```
x402-project-clean/
鈹溾攢鈹€ app/                    # Next.js app directory
鈹?  鈹溾攢鈹€ page.tsx           # Home page
鈹?  鈹溾攢鈹€ layout.tsx         # Root layout
鈹?  鈹溾攢鈹€ protected/         # Protected content example
鈹?  鈹溾攢鈹€ buy-token/         # Token purchase UI
鈹?  鈹斺攢鈹€ api/
鈹?      鈹溾攢鈹€ premium/       # Premium API endpoint
鈹?      鈹溾攢鈹€ weather/       # Weather API example
鈹?      鈹斺攢鈹€ buy-token/     # Token purchase API
鈹溾攢鈹€ contracts/             # Smart contracts
鈹?  鈹溾攢鈹€ MyToken.sol       # ERC-20 token contract
鈹?  鈹斺攢鈹€ TokenSale.sol     # Token sale contract
鈹溾攢鈹€ types/                 # TypeScript definitions
鈹溾攢鈹€ middleware.ts          # x402 payment middleware
鈹溾攢鈹€ package.json           # Dependencies
鈹斺攢鈹€ docs/                  # Documentation
```

## Protected Endpoints

### 1. Protected Page (/protected)
- Price: 0.01 USDC
- Description: Access exclusive protected content

### 2. Premium API (/api/premium)
- Price: 0.05 USDC
- Description: Premium API with real-time data

### 3. Weather API (/api/weather)
- Price: 0.001 USDC
- Description: Real-time weather data

### 4. Token Purchase (/api/buy-token)
- Price: 1.00+ USDC
- Description: Buy custom tokens

## Security Notes

- Never commit .env.local to version control
- Keep your CDP API keys secure
- Rotate keys if accidentally exposed
- Use environment variables for all sensitive data

## Mainnet Setup

To accept real USDC payments:

1. Get CDP API Keys: Sign up at cdp.coinbase.com
2. Configure Environment: Set CDP_API_KEY_ID, CDP_API_KEY_SECRET, and RECEIVER_WALLET_ADDRESS
3. Deploy Contracts: Deploy your token and sale contracts on Base mainnet
4. Update Middleware: The middleware is already configured for mainnet

See MAINNET-SETUP-GUIDE.md for detailed instructions.

## Useful Links

- x402 Documentation: https://docs.x402.org
- x402 Bazaar: https://x402.org/bazaar
- Base Documentation: https://docs.base.org
- Coinbase Developer Platform: https://cdp.coinbase.com

## License

MIT License - Feel free to use this project as a template for your own x402-powered applications.

## Support

For issues or questions:
- Check the documentation
- Visit x402 Discord
- Open an issue on GitHub

Built with x402 Protocol
