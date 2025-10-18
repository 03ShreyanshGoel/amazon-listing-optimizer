# Amazon Product Listing Optimizer

An AI-powered web application that fetches Amazon product details by ASIN and generates optimized listings using OpenAI's GPT-4. The app provides side-by-side comparison of original and optimized content, stores optimization history, and tracks improvements over time.

---

## 🚀 Features

- **ASIN-based Product Fetching**: Directly scrapes product details from Amazon product pages
- **AI-Powered Optimization**: Uses GPT-4 to generate improved titles, bullet points, descriptions, and keywords
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
- **OpenAI GPT-4** for content optimization

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
- **OpenAI API Key** - [Get API Key](https://platform.openai.com/api-keys)
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

**Create `.env` file in the backend directory:**

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=amazon_optimizer
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

**Create `.env` file in the frontend directory:**

```env
VITE_API_URL=http://localhost:5000/api
```

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

Open a terminal and run:

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

### Start Frontend Development Server

Open a new terminal and run:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

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

### Prompt Design Strategy

The AI optimization uses a carefully crafted prompt with the following design principles:

#### 1. **Role Establishment**
```
"You are an Amazon SEO and copywriting expert."
```
This sets the context and expertise level, ensuring the AI generates industry-appropriate content.

#### 2. **Structured Input**
The original product data (title, bullets, description) is provided in a clear, labeled format for better understanding.

#### 3. **Specific Output Requirements**

- **Title**: Max 200 characters, keyword-rich, readable, compelling
- **Bullet Points**: Exactly 5 points, clear, concise, benefit-focused
- **Description**: 150-250 words, persuasive but compliant with Amazon guidelines
- **Keywords**: 5 relevant SEO suggestions

#### 4. **JSON Format Enforcement**
Requesting structured JSON output ensures:
- Consistent, parseable responses
- Easy integration into the application
- No ambiguity in data extraction

#### 5. **Temperature Setting (0.7)**
Balances creativity with consistency:
- High enough for varied, engaging content
- Low enough for reliable, focused outputs

### Why This Approach Works

1. **Consistency**: JSON format guarantees structured, predictable outputs
2. **Quality**: Specific constraints ensure practical, usable content
3. **SEO Focus**: Explicitly optimizes for Amazon search visibility
4. **Compliance**: Mentions Amazon guidelines to avoid policy violations
5. **Actionable**: Generates ready-to-use content without post-processing

### Example Prompt Structure

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

Format as JSON: {...}
```

---

## 📁 Project Structure

```
amazon-listing-optimizer/
├── backend/
│   ├── config/
│   │   └── database.js          # MySQL connection pool configuration
│   ├── controllers/
│   │   └── productController.js # Handles business logic for products
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handling middleware
│   ├── models/
│   │   └── Product.js           # Database queries / ORM model for products
│   ├── routes/
│   │   └── productRoutes.js     # Express routes for product-related APIs
│   ├── services/
│   │   ├── aiOptimizer.js       # Integrates with OpenAI for listing optimization
│   │   └── amazonScraper.js     # Puppeteer scraper to fetch Amazon product details
│   ├── .env                     # Environment variables (DB credentials, API keys)
│   ├── .gitignore               # Git ignore rules
│   ├── package.json             # Backend dependencies & scripts
│   ├── puppeteer.config.cjs     # Puppeteer configuration to persist cached browser
│   ├── railway.json             # Deployment configuration for Railway
│   └── server.js                # Express app initialization & middleware setup
├── frontend/                     # Vite + React + Tailwind frontend
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   │   ├── AsinInput.jsx        # Form to input product ASIN
│   │   │   ├── ComparisonView.jsx   # Component to display optimized vs original listing
│   │   │   ├── HistoryView.jsx      # Component to display past optimization history
│   │   │   └── LoadingSpinner.jsx   # Spinner displayed while fetching/processing data
│   │   ├── services/
│   │   │   └── api.js             # Axios/fetch client to interact with backend APIs
│   │   ├── App.jsx               # Main React component
│   │   ├── App.css               # Global styles
│   │   ├── index.css             # Global CSS resets & styles
│   │   └── main.jsx              # React app entry point
│   ├── .env                     # Environment variables for frontend
│   ├── index.html               # Main HTML file
│   ├── package.json             # Frontend dependencies & scripts
│   ├── postcss.config.js        # PostCSS configuration
│   └── tailwindcss.config.js    # TailwindCSS configuration
└── README.md                      # Project documentation / setup instructions

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
    "original": {
      "title": "Apple AirPods Pro...",
      "bullets": ["Active Noise Cancellation...", ...],
      "description": "..."
    },
    "optimized": {
      "title": "Apple AirPods Pro - Premium Wireless...",
      "bullets": ["Advanced ANC Technology...", ...],
      "description": "...",
      "keywords": ["wireless earbuds", "noise cancelling", ...]
    }
  }
}
```

### `GET /api/products/history/:asin`
Get optimization history for a specific ASIN.

### `GET /api/products/history`
Get all optimization history.

---

## 🗄️ Database Schema

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asin VARCHAR(20) NOT NULL,
    original_title TEXT,
    original_bullets TEXT,          -- JSON array stored as string
    original_description TEXT,
    optimized_title TEXT,
    optimized_bullets TEXT,         -- JSON array stored as string
    optimized_description TEXT,
    keywords TEXT,                  -- JSON array stored as string
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_asin (asin),          -- Fast ASIN lookups
    INDEX idx_created_at (created_at) -- Time-based queries
);
```

**Design Decisions:**
- **JSON Storage**: Bullet points and keywords stored as JSON strings for flexibility
- **TEXT Fields**: Accommodate varying content lengths
- **Indexes**: Optimize common queries (ASIN lookups, time-based sorting)
- **Timestamps**: Track when each optimization was performed

---

## 🚧 Challenges & Solutions

### 1. Amazon Anti-Scraping Measures

**Challenge**: Amazon blocks automated scraping attempts.

**Solution**:
- Used Puppeteer with Stealth Plugin to avoid detection
- Randomized user agents
- Implemented proper delays between requests
- Headless browser with realistic behavior patterns

### 2. Varying HTML Structures

**Challenge**: Amazon uses different layouts for different product types.

**Solution**:
- Multiple selector strategies with fallbacks
- Robust error handling for missing elements
- Graceful degradation when data is unavailable

### 3. AI Response Consistency

**Challenge**: GPT-4 responses need to be parseable and structured.

**Solution**:
- Enforced JSON output format in prompts
- Regex extraction as fallback for JSON parsing
- Validation of required fields before database storage

### 4. Performance Optimization

**Challenge**: Scraping and AI processing are slow operations.

**Solution**:
- Clear loading states in UI
- Async/await patterns throughout
- Database connection pooling
- Indexed database queries for fast history retrieval

---

## 🔒 Security Considerations

1. **API Keys**: Never commit `.env` files (included in `.gitignore`)
2. **SQL Injection**: Using parameterized queries with mysql2
3. **Input Validation**: ASIN format validation before processing
4. **XSS Protection**: React automatically escapes content
5. **CORS**: Configured for specific frontend origin
6. **Rate Limiting**: Consider implementing for production use

---

## 🐛 Troubleshooting

### Issue: Puppeteer Installation Fails

**Solution (Linux):**
```bash
sudo apt-get install -y libnss3 libatk-bridge2.0-0 libx11-xcb1
```

### Issue: MySQL Connection Error

**Solution:**
```bash
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### Issue: OpenAI Rate Limit

**Solution:**
- Upgrade to paid plan for higher limits
- Implement request queuing
- Add exponential backoff retry logic

### Issue: Amazon Scraping Blocked

**Solution:**
- Check if Amazon updated their HTML structure
- Try different user agents
- Consider using a proxy service
- Add longer delays between requests

---

## 📈 Future Enhancements

- [ ] Batch processing for multiple ASINs
- [ ] Export optimized content to CSV/Excel
- [ ] A/B testing for optimization strategies
- [ ] Analytics dashboard with charts
- [ ] User authentication and multi-user support
- [ ] Competitor analysis features
- [ ] Image optimization suggestions
- [ ] Real-time optimization status via WebSockets
- [ ] Version control for optimizations
- [ ] Browser extension for direct Amazon integration

---

## 📝 Assumptions & Design Decisions

### Assumptions

1. **Amazon Structure**: Product pages follow consistent HTML patterns
2. **ASIN Format**: All ASINs are exactly 10 alphanumeric characters
3. **English Content**: Optimization focused on English-language listings
4. **GPT-4 Access**: User has access to OpenAI API with GPT-4
5. **Legal Compliance**: Scraping for personal/educational use only

### Design Decisions

1. **Puppeteer over Axios**: Handles JavaScript-rendered content
2. **MySQL over NoSQL**: Relational data with clear schema
3. **Vite over CRA**: Faster development experience
4. **Component-based React**: Reusable, maintainable UI
5. **Express.js**: Lightweight, flexible backend framework
6. **JSON Storage**: Flexibility for varying array lengths

---

## 📄 License

MIT License - Free to use for learning and development purposes.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Check the troubleshooting section
- Review OpenAI API documentation
- Consult Amazon's scraping policies

---

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 API
- **Puppeteer Team** for web scraping tools
- **React Community** for excellent documentation
- **Tailwind CSS** for utility-first styling
- **Express.js** for robust backend framework

---

**Built with ❤️ for the SalesDuo Internship Assignment**
