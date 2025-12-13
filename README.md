# Iolo Pizza

A modern, full-stack pizza restaurant website built with Next.js, featuring a customer-facing menu and an admin panel for restaurant management.

## Features

### Customer Features
- Modern dark-themed responsive design
- Digital menu with category filtering (Pizzas, Drinks, Desserts, Sides)
- Search functionality across menu items and ingredients
- Spicy and vegetarian indicators on menu items
- Multi-image support for menu items

### Admin Panel
- Secure JWT-based authentication
- Full CRUD operations for menu items
- Multi-image upload support
- Category management
- Order management (coming soon)

## Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL with Prisma ORM v7
- **Authentication:** JWT with bcryptjs
- **Icons:** Lucide React
- **Deployment:** Docker with GitHub Actions CI/CD

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm or pnpm

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/iolo-pizza.git
   cd iolo-pizza
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values:
   ```env
   DATABASE_URL="postgresql://iola:devpassword123@localhost:5432/iola_pizza?schema=public"
   JWT_SECRET="your-secret-key-min-32-characters"
   ```

4. **Start the database**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Seed the database (optional)**
   ```bash
   npm run db:seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open the app**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Default Admin Credentials

After seeding, use these credentials to log in:
- **Email:** admin@iolopizza.com
- **Password:** admin123

> **Important:** Change these credentials in production!

## Project Structure

```
├── components/           # React components
│   ├── admin/           # Admin panel components
│   ├── Hero.tsx         # Homepage hero section
│   ├── Menu.tsx         # Menu page component
│   ├── Navbar.tsx       # Navigation bar
│   └── Footer.tsx       # Footer component
├── pages/               # Next.js pages
│   ├── api/            # API routes
│   │   ├── auth/       # Authentication endpoints
│   │   ├── foods/      # Food CRUD endpoints
│   │   └── health.ts   # Health check endpoint
│   ├── admin/          # Admin panel pages
│   └── menu.tsx        # Public menu page
├── prisma/             # Prisma schema and migrations
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Database seeder
├── lib/                # Utility libraries
│   ├── prisma.ts       # Prisma client
│   └── auth.ts         # Auth utilities
├── services/           # Frontend services
│   └── auth.ts         # Auth service
└── styles/             # Global styles
    └── globals.css     # Tailwind CSS
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/foods` | List all foods |
| POST | `/api/foods` | Create food (auth required) |
| GET | `/api/foods/[id]` | Get food by ID |
| PUT | `/api/foods/[id]` | Update food (auth required) |
| DELETE | `/api/foods/[id]` | Delete food (auth required) |
| POST | `/api/upload` | Upload images (auth required) |
| GET | `/api/health` | Health check |

## Deployment

### Production with Docker

The project includes a complete CI/CD pipeline using GitHub Actions.

1. **Set up GitHub Secrets**

   Go to your repository Settings > Secrets and variables > Actions:

   | Secret | Description |
   |--------|-------------|
   | `VULTR_HOST` | Server IP address |
   | `VULTR_USERNAME` | SSH username |
   | `VULTR_SSH_KEY` | Private SSH key |
   | `POSTGRES_USER` | Database username |
   | `POSTGRES_PASSWORD` | Database password |
   | `POSTGRES_DB` | Database name |
   | `JWT_SECRET` | JWT signing secret |

2. **Generate secure secrets**
   ```bash
   # Generate JWT secret
   openssl rand -base64 32

   # Generate database password
   openssl rand -base64 24
   ```

3. **Push to main branch**

   The CI/CD pipeline will automatically:
   - Build the Docker image
   - Push to GitHub Container Registry
   - Deploy to your Vultr server
   - Run database migrations

### Manual Deployment

```bash
# Build the Docker image
docker build -t iolo-pizza .

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret for JWT signing (min 32 chars) | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed the database |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

---

Built with love for Iolo Pizza
