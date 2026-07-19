# 🚀 QuickMart - Enterprise Quick Commerce Platform

A production-ready, enterprise-grade quick commerce platform built with modern technologies.

## ✨ Features

- **3D Interactive UI** with Three.js, React Three Fiber, GSAP animations
- **Real-time Operations** via WebSockets, live order tracking
- **AI-Powered** search, recommendations, chatbot, demand forecasting
- **Multi-Payment** support (UPI, Cards, Wallets, COD)
- **Multi-Role** panels (Customer, Admin, Delivery Partner, Warehouse)
- **Enterprise Security** with JWT, OAuth, encryption, rate limiting
- **Cloud-Native** with Docker, Kubernetes, auto-scaling
- **PWA Support** with offline mode, service workers
- **Comprehensive Testing** unit, integration, e2e, load testing

## 🏗 Architecture

```
quickmart/
├── apps/
│   ├── web/          # Next.js customer frontend
│   ├── api/          # NestJS backend API
│   ├── admin/        # React admin dashboard
│   └── delivery/     # React delivery partner app
├── packages/
│   ├── ui/           # Shared UI components
│   ├── types/        # Shared TypeScript types
│   ├── utils/        # Shared utilities
│   └── database/     # Prisma schema & migrations
├── infra/
│   ├── docker/       # Docker configurations
│   ├── k8s/          # Kubernetes manifests
│   ├── terraform/    # Infrastructure as Code
│   └── nginx/        # Reverse proxy config
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+
- MongoDB 6+

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/quickmart.git
cd quickmart

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start infrastructure
docker-compose -f infra/docker/docker-compose.yml up -d

# Generate database schema
npm run db:generate

# Run migrations
npm run db:migrate

# Seed data
npm run db:seed

# Start development
npm run dev
```

### Access Points
- **Web App**: http://localhost:3000
- **API**: http://localhost:3001
- **Admin Panel**: http://localhost:3002
- **Delivery App**: http://localhost:3003
- **Database Studio**: http://localhost:5555

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Load testing
k6 run tests/load/orders.js
```

## 🐳 Docker Deployment

```bash
# Build all services
docker-compose -f infra/docker/docker-compose.prod.yml build

# Deploy
docker-compose -f infra/docker/docker-compose.prod.yml up -d
```

## ☸️ Kubernetes Deployment

```bash
# Apply manifests
kubectl apply -f infra/k8s/

# Check status
kubectl get pods -n quickmart
```

## 📚 Documentation

- [API Documentation](docs/api/README.md)
- [Architecture](docs/architecture/README.md)
- [Deployment Guide](docs/deployment/README.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
