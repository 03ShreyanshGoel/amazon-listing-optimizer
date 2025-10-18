# Amazon Product Listing Optimizer

An AI-powered web application that fetches Amazon product details by ASIN and generates optimized listings using **Gemini-2.5-Flash**. The app provides side-by-side comparison of original and optimized content, stores optimization history, and tracks improvements over time.

---

## 🚀 Features

- **ASIN-based Product Fetching**: Directly scrapes product details from Amazon product pages
- **AI-Powered Optimization**: Uses Gemini-2.5-Flash to generate improved titles, bullet points, descriptions, and keywords
- **Side-by-Side Comparison**: Clean UI displaying original vs optimized content
- **Optimization History**: MySQL database storing all optimizations with timestamps
- **Historical Tracking**: View past optimizations for each ASIN and track improvements
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

---

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** for data persistence
- **Puppeteer** for web scraping Amazon product pages
- **Gemini-2.5-Flash** for content optimization

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Icons** for UI elements

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Gemini API Key** (dummy placeholder)
- **Git** (optional) - [Download](https://git-scm.com/)

---

## 📦 Installation

### 1. Clone or Download the Repository

```bash
git clone <your-repo-url>
cd amazon-listing-optimizer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file in the backend directory (dummy placeholders):**

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=amazon_optimizer
DB_PORT=3306

GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

**Create `.env` file in the frontend directory:**

```env
VITE_API_URL=http://localhost:5000/api
```

---

### 4. Database Setup

**Start MySQL and create the database:**

```bash
mysql -u root -p
```

**Execute the following SQL:**

```sql
CREATE DATABASE amazon_optimizer;
USE amazon_optimizer;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asin VARCHAR(20) NOT NULL,
    original_title TEXT,
    original_bullets TEXT,
    original_description TEXT,
    optimized_title TEXT,
    optimized_bullets TEXT,
    optimized_description TEXT,
    keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_asin (asin),
    INDEX idx_created_at (created_at)
);
```

---

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### Access the Application

Open your browser and navigate to: **http://localhost:5173**

---

## 🧪 Testing

### Sample ASINs for Testing

- **B08N5WRWNW** - Apple AirPods Pro
- **B07H65KP63** - Fire TV Stick 4K
- **B0BSHF7WHW** - Amazon Echo Dot (5th Gen)
- **B09G9FPHY6** - Amazon Kindle Paperwhite

### Testing Workflow

1. Enter a valid 10-character ASIN
2. Click "Optimize" button
3. Wait 30-60 seconds for scraping and AI processing
4. Review the side-by-side comparison
5. Navigate to "View History" to see all optimizations
6. Test multiple ASINs to build optimization history

---

## 🤖 AI Prompt Engineering

The optimization prompt uses:

- **Role**: `"You are an Amazon SEO and copywriting expert."`
- **Structured Input**: Original title, bullets, description
- **Output**: Title, 5 bullets, description, 5 keywords in JSON
- **Temperature**: 0.7 for creativity/consistency

**Example Prompt:**

```
You are an Amazon SEO and copywriting expert. Optimize the following:

ORIGINAL TITLE: [actual title]
ORIGINAL BULLET POINTS: [bullets]
ORIGINAL DESCRIPTION: [description]

Provide:
1. Improved title (max 200 chars, keyword-rich)
2. 5 rewritten bullets (clear, benefit-focused)
3. Enhanced description (150-250 words, persuasive)
4. 5 keyword suggestions

Format as JSON
```

---

## 📁 Project Structure

```
amazon-listing-optimizer/
├── backend/
│   ├── config/database.js
│   ├── controllers/productController.js
│   ├── middleware/errorHandler.js
│   ├── models/Product.js
│   ├── routes/productRoutes.js
│   ├── services/
│   │   ├── aiOptimizer.js
│   │   └── amazonScraper.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/components/
│   │   ├── AsinInput.jsx
│   │   ├── ComparisonView.jsx
│   │   ├── HistoryView.jsx
│   │   └── LoadingSpinner.jsx
│   ├── src/services/api.js
│   ├── src/App.jsx
│   ├── src/App.css
│   ├── src/index.css
│   └── src/main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── tailwindcss.config.js
└── README.md
```

---

## 🔌 API Endpoints

### `POST /api/products/optimize`
Optimize a product listing by ASIN.

**Request:**
```json
{
  "asin": "B08N5WRWNW"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "asin": "B08N5WRWNW",
    "original": {...},
    "optimized": {..., "keywords": ["wireless earbuds", "noise cancelling", ...]}
  }
}
```

### `GET /api/products/history/:asin`
Get optimization history for a specific ASIN.

### `GET /api/products/history`
Get all optimization history.

---

## 🔒 Security & Best Practices

- Never commit `.env` files
- Parameterized queries to prevent SQL injection
- ASIN input validation
- CORS configured for frontend
- Rate limiting recommended in production

---

## 📈 Future Enhancements

- Batch processing
- Export to CSV/Excel
- Analytics dashboard
- User authentication
- Competitor analysis
- Image optimization suggestions
- Real-time status via WebSockets
- Version control for optimizations
- Browser extension for Amazon integration

---

## 📄 License

MIT License – free to use for learning and development.

---

**Built with ❤️ using Gemini-2.5-Flash**
