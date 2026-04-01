# STREET Ecommerce — Backend API

Express.js + MongoDB REST API for the STREET ecommerce frontend.

## Quick Start

```bash
cd backend
npm install
# copy env
cp .env.example .env   # then edit MONGO_URI and secrets
# seed the database
npm run seed
# start dev server
npm run dev
```

Server runs on **http://localhost:5000**

---

## API Endpoints

### Auth  `POST/GET`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login`    | — | Login |
| POST | `/api/auth/logout`   | ✅ | Logout |
| GET  | `/api/auth/me`       | ✅ | Get current user |
| POST | `/api/auth/refresh`  | — | Refresh access token |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET  | `/api/users/profile`            | ✅ | Get my profile |
| PUT  | `/api/users/profile`            | ✅ | Update profile |
| PUT  | `/api/users/change-password`    | ✅ | Change password |
| POST | `/api/users/addresses`          | ✅ | Add address |
| PUT  | `/api/users/addresses/:id`      | ✅ | Update address |
| DELETE | `/api/users/addresses/:id`    | ✅ | Delete address |
| GET  | `/api/users`                    | 🔐 Admin | Get all users |
| DELETE | `/api/users/:id`              | 🔐 Admin | Delete user |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET  | `/api/products`           | — | Get all (filter/sort/page) |
| GET  | `/api/products/featured`  | — | Featured products |
| GET  | `/api/products/trending`  | — | Trending products |
| GET  | `/api/products/:id`       | — | Single product |
| GET  | `/api/products/:id/related` | — | Related products |
| POST | `/api/products`           | 🔐 Admin | Create product |
| PUT  | `/api/products/:id`       | 🔐 Admin | Update product |
| DELETE | `/api/products/:id`     | 🔐 Admin | Delete (soft) |

**Query params:** `?page=1&limit=12&category=hoodies&minPrice=50&maxPrice=200&badge=NEW&sort=price-asc&search=hoodie&featured=true&trending=true`

### Categories
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET  | `/api/categories`     | — | All categories |
| GET  | `/api/categories/:slug` | — | Single category |
| POST | `/api/categories`     | 🔐 Admin | Create |
| PUT  | `/api/categories/:id` | 🔐 Admin | Update |
| DELETE | `/api/categories/:id` | 🔐 Admin | Delete |

### Cart
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET  | `/api/cart`                  | ✅ | Get my cart |
| POST | `/api/cart/add`              | ✅ | Add item |
| PUT  | `/api/cart/items/:itemId`    | ✅ | Update qty |
| DELETE | `/api/cart/items/:itemId`  | ✅ | Remove item |
| DELETE | `/api/cart/clear`          | ✅ | Clear cart |
| POST | `/api/cart/coupon`           | ✅ | Apply coupon |

**Valid coupons:** `STREET20` (20%), `SAVE10` (10%), `NEWUSER` (15%)

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders`             | ✅ | Place order |
| GET  | `/api/orders/my`          | ✅ | My orders |
| GET  | `/api/orders/:id`         | ✅ | Order detail |
| PUT  | `/api/orders/:id/cancel`  | ✅ | Cancel order |
| GET  | `/api/orders`             | 🔐 Admin | All orders |
| PUT  | `/api/orders/:id/status`  | 🔐 Admin | Update status |

### Wishlist
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET  | `/api/wishlist`                    | ✅ | Get wishlist |
| POST | `/api/wishlist/:productId/toggle`  | ✅ | Toggle item |
| DELETE | `/api/wishlist`                  | ✅ | Clear |

### Reviews
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET  | `/api/reviews/product/:productId` | — | Product reviews |
| POST | `/api/reviews/product/:productId` | ✅ | Add review |
| PUT  | `/api/reviews/:id`                | ✅ | Edit review |
| DELETE | `/api/reviews/:id`              | ✅/🔐 | Delete |

---

## Default Credentials (after seed)

| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@street.com | Admin@123 |
| User  | user@street.com  | User@123  |

---

## Project Structure

```
backend/
├── config/       → MongoDB connection
├── controllers/  → Business logic (auth, user, product, cart, order, wishlist, review)
├── middleware/   → auth, admin, error handler
├── models/       → Mongoose schemas (User, Product, Category, Cart, Order, Review)
├── routes/       → Express routers
├── seed/         → Database seeder
├── utils/        → Token helpers, API response builder
├── .env          → Environment variables
└── server.js     → App entry point
```
