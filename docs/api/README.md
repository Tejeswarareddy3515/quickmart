# QuickMart API Documentation

## Base URL
- Production: `https://api.quickmart.com/api/v1`
- Development: `http://localhost:3001/api/v1`

## Authentication
All API requests require authentication via Bearer token.

```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login with email/password |
| POST | `/auth/phone/send-otp` | Send OTP to phone |
| POST | `/auth/phone/verify-otp` | Verify OTP and login |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout user |
| GET | `/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products with filters |
| GET | `/products/featured` | Get featured products |
| GET | `/products/trending` | Get trending products |
| GET | `/products/categories` | Get all categories |
| GET | `/products/:id` | Get product by ID |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get cart |
| POST | `/cart/add` | Add item to cart |
| PUT | `/cart/:id` | Update quantity |
| DELETE | `/cart/:id` | Remove item |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create order |
| GET | `/orders` | Get user orders |
| GET | `/orders/:id` | Get order details |
| PUT | `/orders/:id/status` | Update order status |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/intent` | Create payment intent |
| POST | `/payments/verify` | Verify payment |
| POST | `/payments/refund` | Process refund |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ai/search?q=` | AI-powered search |
| GET | `/ai/recommendations` | Get recommendations |
| POST | `/ai/chat` | AI shopping assistant |

## Rate Limits
- General API: 100 requests/minute
- Authentication: 10 requests/minute
- AI endpoints: 50 requests/minute
