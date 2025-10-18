import pool from '../config/database.js';

export const Product = {
  async create(productData) {
    const query = `
      INSERT INTO products 
      (asin, original_title, original_bullets, original_description, 
       optimized_title, optimized_bullets, optimized_description, keywords)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      productData.asin,
      productData.original_title,
      JSON.stringify(productData.original_bullets),
      productData.original_description,
      productData.optimized_title,
      JSON.stringify(productData.optimized_bullets),
      productData.optimized_description,
      JSON.stringify(productData.keywords)
    ];

    const [result] = await pool.execute(query, values);
    return result.insertId;
  },

  async findByAsin(asin) {
    const query = `
      SELECT * FROM products 
      WHERE asin = ? 
      ORDER BY created_at DESC
    `;
    
    const [rows] = await pool.execute(query, [asin]);
    
    return rows.map(row => ({
      ...row,
      original_bullets: JSON.parse(row.original_bullets),
      optimized_bullets: JSON.parse(row.optimized_bullets),
      keywords: JSON.parse(row.keywords)
    }));
  },

  // async findAll(limit = 50) {
  //   const query = `
  //     SELECT * FROM products 
  //     ORDER BY created_at DESC 
  //     LIMIT ?
  //   `;
    
  //   const [rows] = await pool.execute(query, [limit]);
    
  //   return rows.map(row => ({
  //     ...row,
  //     original_bullets: JSON.parse(row.original_bullets),
  //     optimized_bullets: JSON.parse(row.optimized_bullets),
  //     keywords: JSON.parse(row.keywords)
  //   }));
  // }
  async findAll(limit = 50) {
  limit = Number(limit);
  if (isNaN(limit) || limit <= 0) limit = 50;

  const query = `
    SELECT * FROM products 
    ORDER BY created_at DESC 
    LIMIT ${limit}
  `;

  const [rows] = await pool.query(query);
  
  return rows.map(row => ({
    ...row,
    original_bullets: JSON.parse(row.original_bullets),
    optimized_bullets: JSON.parse(row.optimized_bullets),
    keywords: JSON.parse(row.keywords)
  }));
}
};