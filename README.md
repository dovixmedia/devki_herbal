# Wellness E-Commerce Website

A modern e-commerce website for premium wellness supplements, inspired by brands like What's Up Wellness. Built with Next.js 16, featuring a clean startup-style design with soft gradients, rounded cards, and smooth animations.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Image Hosting**: Cloudinary (next-cloudinary)
- **Forms**: React Hook Form with Zod
- **Icons**: Lucide React

## Features

### Pages
- **Home**: Hero, featured products, benefits, ingredient highlights, product categories, doctor testimonials, customer reviews, newsletter signup
- **Shop**: Product grid, filters (category, price, benefits), search, quick add to cart
- **Product**: Image gallery slider, description, ingredients, benefits, FAQ accordion, customer reviews, related products
- **Cart**: Editable cart, coupon system, order summary
- **Checkout**: Address form, payment placeholder, order confirmation
- **Admin Dashboard**: Add products, manage orders, analytics overview

### Extras
- SEO optimized with metadata and Open Graph
- Product structured data (JSON-LD schema)
- Lazy image loading
- Mobile responsive
- Cart persists in localStorage

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables** — copy `.env.example` to `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wellness
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

3. **Seed sample products** (optional):
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```
   Or call `POST /api/seed` after starting the dev server.

4. **Run development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/products` | List products (optional: ?category, ?featured, ?slug, ?minPrice, ?maxPrice, ?benefit) |
| POST | `/api/products` | Create product |
| GET/PUT/DELETE | `/api/products/[id]` | Single product CRUD |
| GET/POST | `/api/orders` | List / create orders |
| POST | `/api/coupons/validate` | Validate coupon code |
| POST | `/api/newsletter` | Newsletter signup |
| GET/POST | `/api/reviews` | List / create product reviews |
| POST | `/api/seed` | Seed sample products |

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── admin/         # Admin dashboard
│   ├── cart/          # Shopping cart
│   ├── checkout/      # Checkout
│   ├── product/       # Product detail (dynamic slug)
│   └── shop/          # Product listing
├── components/
│   ├── home/          # Home page sections
│   └── ui/            # Reusable UI (ProductCard)
├── context/           # CartContext
├── lib/               # MongoDB, Cloudinary
├── models/            # Product, Order, User, Coupon, Newsletter, Review
└── types/             # TypeScript interfaces
```

## Build & Deploy

```bash
npm run build
npm start
```

## License

MIT
