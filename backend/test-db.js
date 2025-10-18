import pool from './config/database.js';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL successfully!');
    
    // Test database
    const [databases] = await connection.query(
      "SHOW DATABASES LIKE 'amazon_optimizer'"
    );
    
    if (databases.length > 0) {
      console.log('✅ Database "amazon_optimizer" exists!');
    } else {
      console.log('❌ Database "amazon_optimizer" does NOT exist!');
    }
    
    // Test table
    const [tables] = await connection.query(
      "SHOW TABLES FROM amazon_optimizer LIKE 'products'"
    );
    
    if (tables.length > 0) {
      console.log('✅ Table "products" exists!');
    } else {
      console.log('❌ Table "products" does NOT exist!');
    }
    
    // Get table info
    const [columns] = await connection.query(
      'DESCRIBE amazon_optimizer.products'
    );
    
    console.log('\n📋 Table Structure:');
    console.table(columns);
    
    // Count records
    const [count] = await connection.query(
      'SELECT COUNT(*) as total FROM amazon_optimizer.products'
    );
    
    console.log(`\n📊 Total records: ${count[0].total}`);
    
    connection.release();
    console.log('\n✅ All tests passed!');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\nPossible issues:');
    console.error('1. MySQL server is not running');
    console.error('2. Wrong credentials in .env file');
    console.error('3. Database or table not created');
    console.error('4. Firewall blocking connection');
    process.exit(1);
  }
}

testConnection();