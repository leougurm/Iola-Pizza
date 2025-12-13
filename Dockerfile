# ===========================================
# Iolo Pizza - Production Dockerfile
# ===========================================

FROM node:20-alpine AS base

# Install dependencies for Prisma and native modules
RUN apk add --no-cache libc6-compat openssl

# ===========================================
# Dependencies Stage
# ===========================================
FROM base AS deps
WORKDIR /app

# Copy package files and prisma config
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# ===========================================
# Builder Stage
# ===========================================
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client (needed for build)
RUN npx prisma generate

# Build arguments for build-time env vars (non-sensitive)
ARG NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

# Build Next.js application
RUN npm run build

# ===========================================
# Production Runner Stage
# ===========================================
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create .next directory with correct permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create public folder for uploads
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public

# Copy Prisma files for migrations
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Fix ownership for all app files including prisma
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Install Prisma CLI as nextjs user (after permissions are set)
RUN npm install prisma dotenv

# Expose port
EXPOSE 3000

# Set runtime environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
