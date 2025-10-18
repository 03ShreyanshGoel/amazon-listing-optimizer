import pool from '../config/database.js';

export async function initializeDatabase() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
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
      )
    `;
    
    await pool.query(createTableQuery);
    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
  }
}