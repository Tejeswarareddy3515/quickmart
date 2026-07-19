# Production Checklist

## Security
- [ ] Change all default passwords
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable Helmet.js headers
- [ ] Configure JWT secrets (min 256-bit)
- [ ] Enable 2FA for admin accounts
- [ ] Set up WAF (Cloudflare/AWS WAF)
- [ ] Configure audit logging
- [ ] GDPR compliance review

## Performance
- [ ] Enable CDN for static assets
- [ ] Configure Redis caching
- [ ] Enable database connection pooling
- [ ] Set up query optimization
- [ ] Configure image optimization
- [ ] Enable gzip compression
- [ ] Set up lazy loading
- [ ] Configure edge caching

## Monitoring
- [ ] Set up Prometheus metrics
- [ ] Configure Grafana dashboards
- [ ] Enable error tracking (Sentry)
- [ ] Set up log aggregation (ELK)
- [ ] Configure alerting rules
- [ ] Set up uptime monitoring
- [ ] Enable APM tracing

## Database
- [ ] Run all migrations
- [ ] Create database indexes
- [ ] Set up read replicas
- [ ] Configure automated backups
- [ ] Test backup restoration
- [ ] Set up connection limits
- [ ] Enable query logging (slow queries)

## Infrastructure
- [ ] Configure auto-scaling
- [ ] Set up load balancer
- [ ] Configure health checks
- [ ] Set up rolling deployments
- [ ] Configure resource limits
- [ ] Set up network policies
- [ ] Configure pod disruption budgets

## Testing
- [ ] Run full test suite
- [ ] Perform load testing
- [ ] Test payment flows
- [ ] Verify email/SMS delivery
- [ ] Test push notifications
- [ ] Verify OAuth logins
- [ ] Test order lifecycle
- [ ] Verify AI features
