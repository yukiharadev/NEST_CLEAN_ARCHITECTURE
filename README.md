# NEST CLEAN ARCHITECTURE

A scalable enterprise-grade backend service built with NestJS, implementing Domain-Driven Design (DDD), CQRS pattern, and Clean Architecture principles.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [Support](#-support)

## ✨ Features

- **Domain-Driven Design (DDD)**: Organized business logic with clear domain boundaries
- **CQRS Pattern**: Separation of command and query responsibilities using `@nestjs/cqrs`
- **Clean Architecture**: Layered architecture with Application, Domain, and Infrastructure layers
- **API Versioning**: Built-in support for URI-based or header-based versioning
- **Swagger Documentation**: Auto-generated interactive API documentation
- **Database Integration**: TypeORM with PostgreSQL support
- **Caching**: Redis integration for high-performance caching
- **Firebase Integration**: Firebase Admin SDK for authentication and services
- **Request Validation**: Class-validator and class-transformer for DTO validation
- **Global Interceptors**: Logging and response transformation
- **Exception Handling**: Centralized error handling with custom exceptions
- **Monorepo Support**: Shared libraries structure with `@app/utils`

## 🏗 Architecture

This project follows a modular architecture with clear separation of concerns:

```
Application Layer (Use Cases)
       ↓
Domain Layer (Business Logic)
       ↓
Infrastructure Layer (External Services)
```

Each module is organized into:

- **Application**: DTOs, mappers, use cases (commands/queries), and service interfaces
- **Domain**: Entities, domain events, and business rules
- **Infrastructure**: Repository implementations, external service integrations
- **Presentation**: Controllers and middleware

### CQRS Implementation

The project uses CQRS to separate read and write operations:

- **Commands**: Handle write operations and business logic
- **Queries**: Handle read operations and data retrieval
- **Events**: Domain events for cross-module communication

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v11
- **Language**: TypeScript v5.7
- **Database**: PostgreSQL with TypeORM v0.3
- **Caching**: Redis (ioredis v5)
- **Authentication**: Firebase Admin SDK v13
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI v11
- **Testing**: Jest v30
- **Code Quality**: ESLint, Prettier

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **PostgreSQL**: >= 14.x
- **Redis**: >= 6.x (optional, for caching)
- **Firebase Project**: For Firebase integration (optional)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd service_gl
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file in the root directory
# See Configuration section below for required variables
```

4. Configure Firebase (if using Firebase features):
   - Place your Firebase service account JSON file in `src/configs/firebase-service-account.json`

### Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## 📁 Project Structure

```
service_gl/
├── src/
│   ├── configs/           # Configuration files
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── cache.config.ts
│   │   ├── firebase.config.ts
│   │   └── system.config.ts
│   ├── core/              # Core application modules
│   │   ├── aggregates/    # DDD aggregate roots and entities
│   │   ├── cqrs/          # CQRS infrastructure
│   │   ├── database/      # Database and cache services
│   │   ├── decorators/    # Custom decorators
│   │   ├── exception/     # Exception handling
│   │   ├── firebase/      # Firebase integration
│   │   └── interceptors/  # Global interceptors
│   ├── modules/           # Feature modules
│   │   ├── user/
│   │   │   ├── application/
│   │   │   │   ├── dtos/
│   │   │   │   ├── mappers/
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   └── events/
│   │   │   ├── infrastructure/
│   │   │   │   ├── repositories/
│   │   │   │   └── services/
│   │   │   └── presentation/
│   │   │       └── controllers/
│   │   └── etat-des-lieux/
│   ├── app.module.ts
│   └── main.ts
├── libs/                  # Shared libraries
│   └── utils/            # Utility functions and helpers
│       └── src/
│           ├── auth/     # Authentication utilities
│           └── ...
├── test/                 # E2E tests
└── package.json
```

## ⚙ Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```env
# Application
PORT=3000

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=service_gl

# Cache (Redis)
CACHE_HOST=localhost
CACHE_PORT=6379
CACHE_PASSWORD=
CACHE_INSTANCE=0

# Firebase (if using Firebase features)
# Configure via firebase-service-account.json file

# Other configurations
NODE_ENV=development
```

### Configuration Files

Configuration is modularized in the [src/configs](src/configs) directory:

- [app.config.ts](src/configs/app.config.ts): Global API prefix and versioning
- [database.config.ts](src/configs/database.config.ts): PostgreSQL connection settings
- [cache.config.ts](src/configs/cache.config.ts): Redis cache configuration
- [firebase.config.ts](src/configs/firebase.config.ts): Firebase Admin SDK settings
- [system.config.ts](src/configs/system.config.ts): System-wide settings

## 📖 API Documentation

Interactive API documentation is automatically generated using Swagger and available at:

```
http://localhost:3000/api/docs
```

The API uses versioning with the prefix `/api/v1/` for all endpoints.

### Example Requests

The API follows RESTful conventions with standardized request/response formats:

- All requests are validated using DTOs
- Responses are transformed through interceptors
- Bearer token authentication is supported

## 💻 Development

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Building the Project

```bash
# Build for production
npm run build
```

### Creating a New Module

When creating a new module, follow the DDD structure:

1. Create the module directory in `src/modules/`
2. Implement the three layers:
   - **Application**: Use cases, DTOs, interfaces
   - **Domain**: Entities, events, business logic
   - **Infrastructure**: Repository implementations
3. Add controllers in the presentation layer
4. Register the module in [app.module.ts](src/app.module.ts)

### Using CQRS

Example command:

```typescript
// Define a command
export class CreateUserCommand implements ICommand<UserEntity> {
  constructor(public readonly name: string, public readonly email: string) {}
}

// Execute via CqrsBus
const user = await this.cqrsBus.execute(new CreateUserCommand(name, email));
```

Example query:

```typescript
// Define a query
export class GetUserQuery implements IQuery<UserEntity> {
  constructor(public readonly id: string) {}
}

// Execute via CqrsBus
const user = await this.cqrsBus.query(new GetUserQuery(userId));
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Debug tests
npm run test:debug
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Follow the existing code style and architecture patterns
4. Write tests for new features
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Development Guidelines

- Follow DDD principles and maintain clean architecture
- Keep use cases focused and single-purpose
- Write comprehensive tests for business logic
- Document public APIs and complex logic
- Use TypeScript strict mode features
- Ensure all tests pass before submitting

## 📞 Support

For questions and support:

- Create an [issue](../../issues) for bug reports or feature requests
- Check existing [documentation](../../wiki) for common questions
- Review the [API documentation](#api-documentation) for endpoint details

## 📄 License

This project is [UNLICENSED](LICENSE) - private/proprietary software.
