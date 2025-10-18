// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';

// dotenv.config();



// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// export default pool;

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Railway provides DATABASE_URL, parse it
function parseDatabaseUrl(url) {
  if (!url) return null;
  
  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  if (!match) return null;
  
  return {
    host: match[3],
    user: match[1],
    password: match[2],
    port: parseInt(match[4]),
    database: match[5]
  };
}

// Use DATABASE_URL if available (Railway), otherwise use individual variables
const dbConfig = process.env.DATABASE_URL 
  ? parseDatabaseUrl(process.env.DATABASE_URL)
  : {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    };

console.log(dbConfig);

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000
});

// Test connection
pool.getConnection()
  .then(conn => {
    console.log('✅ Database connected successfully');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

export default pool;