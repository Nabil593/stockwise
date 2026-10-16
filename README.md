# StockWise — Smart Inventory Management System
<img width="1920" height="1095" alt="screencapture-stockwise-tan-five-vercel-app-2026-10-17-02_20_22" src="https://github.com/user-attachments/assets/4c6e4671-8f1b-4439-8f7e-fc8f5d070d24" />

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-Framework-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-UI%20Library-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Typed%20JavaScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<p align="center">
  A modern, AI-assisted inventory management platform that helps small businesses manage products, track stock movements, monitor low-stock items, and make better inventory decisions.
</p>

<p align="center">
  <a href="https://stockwise-tan-five.vercel.app/">Live Demo</a> •
  <a href="https://stockwise-server.vercel.app/api">Backend API</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-features">Features</a>
</p>

---

## 🌐 Live Preview

| Application | Link |
|---|---|
| Frontend | [stockwise-tan-five.vercel.app](https://stockwise-tan-five.vercel.app/) |
| Backend API | [stockwise-server.vercel.app/api](https://stockwise-server.vercel.app/api) |
| GitHub Repository | Add your repository URL |

> **Note:** The frontend and backend are deployed separately. Some features may depend on environment configuration and the current deployment state.

## 📖 About the Project

StockWise is a full-stack inventory management application designed to simplify everyday stock management for small shops and businesses.

Traditional inventory tracking through spreadsheets or manual records can make it difficult to maintain accurate quantities, identify low-stock products, and understand inventory changes.

StockWise brings these workflows into one interface, with inventory summaries and an AI-powered assistant that can analyze available stock information and suggest actions for the user to review.

### 🎯 Project Objectives

- Simplify product and inventory management.
- Maintain accurate stock quantities.
- Record stock additions, removals, and adjustments.
- Identify low-stock and out-of-stock products.
- Provide useful inventory summaries and AI-assisted recommendations.
- Maintain a clear history of inventory changes.

## ✨ Features

### 📦 Product Management
- Create, view, update, and manage product records.
- Store product names, SKUs, categories, prices, and stock quantities.
- Search and organize products.
- Configure minimum stock levels.

### 🔄 Stock Movement Tracking
- Record incoming stock (**Stock IN**).
- Record outgoing stock (**Stock OUT**).
- Support physical-count adjustments.
- Track previous and resulting quantities.
- Maintain stock movement history.

### ⚠️ Low-Stock Monitoring
- Identify products that reach their minimum stock threshold.
- Highlight inventory that may need replenishment.
- Calculate stock status from current inventory data.

### 🤖 AI Inventory Insights
- Generate inventory summaries using available product data.
- Identify products that may require attention.
- Provide recommendations with supporting context.
- Keep AI suggestions separate from confirmed inventory changes.

AI-generated recommendations are advisory and should be reviewed before taking action.

### 📊 Inventory Dashboard
- Present inventory information in a centralized interface.
- Summarize key inventory metrics.
- Help users understand stock levels and recent activity.

### 📱 Responsive Interface
- Responsive layouts for desktop, tablet, and mobile.
- Reusable React components.
- Clear visual hierarchy and interactive UI elements.

> Feature availability depends on the current implementation. Authentication, per-user data isolation, automated tests, and individual workflows should be verified before being described as production-ready.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework and application routing |
| React | Component-based UI |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling |
| Lucide React | Interface icons |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Document database |
| Mongoose | Database schemas and models |
| Google Gemini API | AI-assisted inventory insights |
| Vercel | Frontend and backend deployment |

The stack may be adjusted to match the dependencies and implementation in the repository.

## 🏗️ Architecture

StockWise follows a client-server architecture.

```text
┌─────────────────────────────┐
│       Next.js Frontend      │
│                             │
│ Pages · Components · Forms  │
└──────────────┬──────────────┘
               │ HTTP / REST API
               ▼
┌─────────────────────────────┐
│       Express Backend       │
│                             │
│ Routes · Controllers       │
│ Validation · Business Logic│
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          MongoDB            │
│                             │
│ Products · Stock Movements  │
└─────────────────────────────┘

               │
               ▼
┌─────────────────────────────┐
│       Gemini AI API         │
│ Inventory insights and      │
│ recommendations             │
└─────────────────────────────┘
```

The backend is responsible for validating requests and applying inventory business rules. The database stores persistent inventory information, while the AI service provides supplementary analysis based on the available data.

## ⚙️ Core Business Logic

### Stock IN

Incoming stock increases the current quantity.

`New Quantity = Previous Quantity + Incoming Quantity`

### Stock OUT

Outgoing stock decreases the current quantity only if sufficient stock is available.

`New Quantity = Previous Quantity - Outgoing Quantity`

A stock operation must not produce negative inventory.

### Stock Adjustment

A physical-count adjustment sets the quantity to the verified amount.

`New Quantity = Actual Counted Quantity`

The movement history should preserve the adjustment and resulting quantity.

### Low-Stock Detection

A product is considered low-stock when:

`Current Quantity <= Minimum Stock Level`

### Inventory Cost Value

The estimated inventory cost value is calculated as:

`Inventory Cost Value = Σ (Quantity × Cost Price)`

These calculations should be performed or verified by the backend rather than trusting client-submitted results.

## 🔌 API Overview

Base URL:

```text
https://stockwise-server.vercel.app/api
```

The following endpoints describe the intended inventory API design. Confirm each route against the actual backend before relying on it.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/products` | Retrieve products |
| POST | `/products` | Create a product |
| GET | `/products/:id` | Retrieve a product |
| PATCH | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete or archive a product |
| GET | `/stock-movements` | Retrieve stock history |
| POST | `/products/:id/stock-movements` | Record a stock movement |
| GET | `/dashboard/summary` | Retrieve inventory summary |
| POST | `/ai/inventory-insights` | Generate AI inventory insights |

Protected inventory endpoints should require authentication and verify product ownership on the server.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (a version supported by your project dependencies)
- npm
- MongoDB or a MongoDB Atlas connection
- Git

An AI API key is required if you want to run the Gemini-powered functionality locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd stockwise
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd server
npm install
```

Create a `.env` file based on the backend's required environment variables.

Example:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
```

These variable names are examples. Use the exact names read by your backend code. Never commit real credentials to GitHub.

Start the backend using the script configured in `server/package.json`. For example, if the project defines a development script:

```bash
npm run dev
```

### 3. Configure the Frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Use the variable name expected by your frontend code. If the frontend currently reads `API_URL` instead, configure that exact variable.

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> If your repository has separate frontend and backend repositories, clone and configure each repository independently instead of following the monorepo directory layout above.

## 🔐 Security Considerations

Inventory applications handle business data, so security and data integrity are important.

The intended security approach includes:

- Server-side authentication for protected operations.
- Authorization checks for every inventory resource.
- Product ownership verification on the backend.
- Request validation for product fields and stock movements.
- Server-side stock calculations.
- Protection against negative stock and invalid quantities.
- Keeping AI API credentials on the server.
- Avoiding sensitive information in error responses.

**Deployment note:** If the demo currently allows unauthenticated access or uses shared inventory data, treat it as a demonstration environment—not a secure multi-user production application—until authentication and ownership enforcement are verified.

## 🧪 Testing

Critical business logic should be tested independently of the user interface.

Recommended test cases include:

- Stock IN increases inventory correctly.
- Stock OUT decreases inventory correctly.
- Stock OUT exceeding available stock is rejected.
- Negative and zero movement quantities are rejected.
- Invalid adjustments are rejected.
- Low-stock status matches the configured threshold.
- Failed stock operations do not create movement records.
- Users cannot access products owned by other users.
- AI service errors do not change inventory data.

Suggested tools:

- **Vitest or Jest** for unit tests.
- **Supertest** for Express API tests.

Add the test commands supported by your actual `package.json` after configuring the test suite.

## 🖼️ Screenshots

Add screenshots of the real application to a `screenshots/` directory in the repository.

Suggested screenshots:

| Screenshot | Suggested filename |
|---|---|
| Landing page | `screenshots/home.png` |
| Inventory dashboard | `screenshots/dashboard.png` |
| Product management | `screenshots/products.png` |
| Stock movement history | `screenshots/stock-movements.png` |
| AI insights | `screenshots/ai-insights.png` |
| Mobile layout | `screenshots/mobile.png` |

After adding the files, you can display a screenshot in this README using:

```markdown
![StockWise Dashboard](screenshots/dashboard.png)
```

Only include screenshots of features that are actually available in the deployed application.

## 🗺️ Roadmap

Potential development milestones:

- [ ] Verify authentication and user-specific inventory isolation.
- [ ] Complete and validate product CRUD.
- [ ] Implement reliable stock IN, OUT, and adjustment workflows.
- [ ] Preserve stock movement history.
- [ ] Complete dashboard calculations.
- [ ] Validate AI output and failure handling.
- [ ] Add automated tests for critical business rules.
- [ ] Document actual environment variables and setup scripts.
- [ ] Add application screenshots.
- [ ] Verify deployment configuration and production security.

Update these checkboxes as each item is completed.

## ⚠️ Known Limitations

- AI recommendations depend on the quality and completeness of available inventory data.
- Without reliable historical sales or usage data, the application cannot make dependable demand forecasts.
- Stock quantities may differ from physical stock until users perform a verified count.
- The live demo may not have the same configuration as a local development environment.
- Security and testing coverage should be confirmed against the current implementation.

## 🔮 Future Improvements

Possible future enhancements include:

- CSV inventory export.
- Supplier and purchase order management.
- Sales and usage history.
- Barcode scanning.
- Multi-warehouse inventory.
- Demand forecasting based on reliable historical data.
- Automated low-stock notifications.
- Expanded automated testing and monitoring.

These are potential enhancements rather than promises of existing functionality.

## 👨‍💻 Author

**Shariea Reza Nabil**

- GitHub: [@Nabil593](https://github.com/Nabil593)
- LinkedIn: [Shariea Reza Nabil](https://www.linkedin.com/in/shariea-reza-nabil/)
- Portfolio: [sharieanabil.vercel.app](https://sharieanabil.vercel.app/)

## 📄 License

Choose a license appropriate for your project before publishing it for reuse. If you intend to make the source code open source, consider adding a `LICENSE` file to the repository.

---

<p align="center">
  Built to make inventory management clearer, more organized, and more actionable.
</p>
