
# 🚀 Amazon Product Listing Optimizer — AI-Powered SEO Enhancement Tool

A **full-stack web application** that fetches Amazon India product details by ASIN and uses **Google Gemini 2.5 Flash** to generate optimized listings.
Compare original and AI-enhanced content side-by-side, track optimization history, and monitor improvement over time.

---

## 🌟 Core Features

* 🔍 **ASIN-Based Product Fetching** — Scrapes product data directly from Amazon India
* 🤖 **AI Optimization** — Generates SEO-friendly titles, bullet points, descriptions, and keywords using Gemini 2.5 Flash
* ⚖️ **Side-by-Side Comparison** — Visual comparison of original vs optimized content
* 🧠 **Optimization History** — Stores all AI-generated listings with timestamps in MySQL
* 📊 **Interactive Tracking** — View detailed past optimizations with quick navigation
* 🎨 **Modern UI** — Built with React + Tailwind CSS for responsive design

---

## 🧱 Architecture Overview

### 🧩 Tech Stack

| Layer                | Technology                                | Purpose                          |
| -------------------- | ----------------------------------------- | -------------------------------- |
| **Frontend**         | React (Vite) + Tailwind CSS               | Modern responsive user interface |
| **Backend**          | Node.js + Express.js                      | REST API and business logic      |
|                      | Puppeteer                                 | Amazon web scraping              |
|                      | **Google Gemini AI (`gemini-2.5-flash`)** | Product listing optimization     |
| **Database**         | MySQL (Railway)                           | Persistent history storage       |
| **Infra/Deployment** | Vercel (Frontend), Render (Backend)       | Cloud hosting for full-stack app |
|                      | dotenv + Axios                            | Config and HTTP communication    |

---

### 🧠 System Design

```text
┌──────────────┐         ┌────────────────┐         ┌──────────────┐
│   Frontend   │◄──────►│    Express.js   │◄──────►│    MySQL DB   │
│ (React + UI) │  HTTP   │  + Gemini API   │  SQL   │ (Railway)     │
└──────────────┘         └────────────────┘         └──────────────┘
        │                        │
        ▼                        ▼
   Amazon Scraper          Gemini Optimizer
     (Puppeteer)               (AI Model)
```

---

### 🔄 Data Flow

1. User enters ASIN → Frontend sends API request
2. Backend scrapes product details via Puppeteer
3. Gemini 2.5 Flash processes data → returns optimized version
4. Both versions are displayed side-by-side
5. Record is stored in MySQL with timestamp

---

## 📁 Folder Structure

```
amazon-listing-optimizer/
├── backend/
│   ├── config/               # DB configuration
│   ├── controllers/          # Request handlers
│   ├── services/             # Amazon scraper + AI optimizer
│   ├── routes/               # API endpoints
│   ├── models/               # MySQL queries
│   ├── middleware/           # Error handling
│   └── server.js             # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # Axios API client
│   │   └── main.jsx          # App entry
│   ├── public/
│   └── vite.config.js
└── README.md
```

---

## ⚙️ Setup & Installation

### 🧩 Prerequisites

* **Node.js** ≥ 18
* **MySQL** ≥ 8
* **Google Gemini API Key** – [Get it here](https://aistudio.google.com/app/apikey)

---

### 🖥 Backend Setup

```bash
cd backend
npm install
```

**.env**

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=amazon_optimizer
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

**Run server**

```bash
npm run dev
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
```

**.env**

```env
VITE_API_URL=http://localhost:5000/api
```

**Run client**

```bash
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)**

---

## 🔌 API Overview

| Endpoint                      | Method | Description                   |
| ----------------------------- | ------ | ----------------------------- |
| `/api/health`                 | GET    | Server health check           |
| `/api/products/optimize`      | POST   | Fetch & optimize by ASIN      |
| `/api/products/history`       | GET    | Retrieve optimization history |
| `/api/products/history/:asin` | GET    | Get history for specific ASIN |

---

## 🗄 Database Schema

```sql
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

## 🤖 AI Optimization Strategy (Gemini 2.5 Flash)

**System Instruction:**

> “You are an expert Amazon India SEO and copywriting specialist.
> Your goal is to rewrite product titles, bullets, and descriptions to be keyword-rich, compliant with Amazon India’s guidelines, and persuasive for buyers.”

**User Message Example:**

```
Optimize the following Amazon India product details:
Title: "..."
Bullet Points: [...]
Description: "..."
Return the result in strict JSON format.
```

---

### 🧠 Optimization Targets

* **Title:** ≤ 200 characters
* **Bullet Points:** 5 — benefit & feature-balanced
* **Description:** 150–250 words, persuasive yet factual
* **Keywords:** 5–10 top Amazon India SEO keywords

**Expected JSON Output**

```json
{
  "optimized_title": "...",
  "optimized_bullets": ["..."],
  "optimized_description": "...",
  "keywords": ["..."]
}
```

---

### ⚙️ Gemini 2.5 Flash Parameters

| Parameter             | Value                            |
| --------------------- | -------------------------------- |
| **Model**             | `gemini-2.5-flash`               |
| **Temperature**       | 0.6                              |
| **Max Output Tokens** | 4096                             |
| **Top-P**             | 0.9                              |
| **Response Format**   | JSON                             |
| **Mode**              | Text-to-Text (Structured Output) |

---

### 🧩 Why Gemini 2.5 Flash?

* ⚡ **Ultra-fast response time** – optimized for real-time API workloads
* 🧠 **Improved reasoning & structure** – excels at JSON-based structured responses
* 💬 **Natural, persuasive language** – better keyword phrasing and tone
* 💾 **Efficient token use** – lower cost and latency than larger Gemini models

---

## 🔍 Implementation Highlights

### Web Scraping Resilience

* Uses Puppeteer stealth mode to bypass Amazon bot detection
* Randomized headers and delays to mimic human behavior
* Compatible with Render’s headless Chrome environment

### Robust AI Response Handling

```js
const jsonMatch = content.match(/\{[\s\S]*\}/);
if (jsonMatch) JSON.parse(jsonMatch[0]);
```

### Connection Pooling (MySQL)

Efficient and scalable connection management.

### CORS Protection

Dynamic whitelisting using environment variable `FRONTEND_URL`.

---

## ☁️ Deployment Guide

| Service     | Purpose  | Steps                                                                |
| ----------- | -------- | -------------------------------------------------------------------- |
| **Render**  | Backend  | `npm install && npx puppeteer browsers install chrome` → `npm start` |
| **Railway** | MySQL DB | Create database, update credentials                                  |
| **Vercel**  | Frontend | Framework: Vite → `npm run build` → Output: `dist`                   |

---

## 🧩 Future Enhancements

| Area                      | Enhancement                        |
| ------------------------- | ---------------------------------- |
| 📦 Batch Upload           | Optimize multiple ASINs via CSV    |
| 📊 Dashboard              | Keyword & ranking analytics        |
| 🧠 A/B Testing            | Compare AI versions & track CTR    |
| 🔐 Auth                   | User-specific optimization history |
| 🧾 Export                 | CSV/Excel exports for AI listings  |
| 🧍‍♂️ Competitor Analysis | Compare top-performing ASINs       |

---

## 🧰 Troubleshooting

| Issue                     | Possible Fix                                    |
| ------------------------- | ----------------------------------------------- |
| ❗ Puppeteer not launching | Ensure Chrome is installed on Render            |
| 💤 Slow first request     | Render free tier spins down — retry after ~30s  |
| 🚫 CORS error             | Check `FRONTEND_URL` in backend `.env`          |
| 📉 Gemini quota           | Stay within Gemini API rate limits (60 req/min) |

---

## 🧭 Technical Architecture Summary

* **Frontend → Backend:** REST via Axios
* **Backend → Amazon:** Puppeteer scraping
* **Backend → Gemini 2.5 Flash:** AI-driven JSON optimization
* **Database:** MySQL (Railway) with connection pooling
* **Deployment:** Vercel + Render (serverless architecture)

---

## 🧾 License

MIT License — free to use and modify.

---

## 🤝 Contributing

Contributions welcome!
Fork → Create branch → Commit → PR.

---

**Built with ❤️ using Node.js, React, MySQL, and Google Gemini 2.5 Flash**
*Developed for the SalesDuo Internship Assignment — October 2025.*
