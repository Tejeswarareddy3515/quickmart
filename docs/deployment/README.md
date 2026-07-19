# QuickMart Deployment Guide

## Quick Start with Docker Compose

```bash
# Clone and setup
git clone https://github.com/your-org/quickmart.git
cd quickmart
cp .env.example .env

# Start services
docker-compose -f infra/docker/docker-compose.yml up -d

# Run migrations and seed
npm run db:migrate
npm run db:seed
```

## Kubernetes Deployment

```bash
# Create namespace and secrets
kubectl create namespace quickmart
kubectl create secret generic quickmart-secrets   --from-literal=database-url="postgresql://..."   --from-literal=jwt-secret="your-secret"   -n quickmart

# Deploy
kubectl apply -f infra/k8s/ -n quickmart
```

## Terraform Infrastructure (AWS)

```bash
cd infra/terraform
terraform init
terraform plan
terraform apply
```

## Monitoring
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3003
- API Health: GET /api/health
