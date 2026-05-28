
import pool from './src/db.js';

async function checkAllTables() {
  try {
    console.log('Checking all table structures...\n');

    const tables = [
      'roles', 'users', 'fleets', 'vehicles', 'sectors',
      'areas', 'shifts', 'shift_assignments', 'weighings', 'shift_cuts'
    ];

    for (const table of tables) {
      console.log(`=== ${table.toUpperCase()} TABLE ===`);

      
      const structureResult = await pool.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = $1 AND table_schema = 'public'
        ORDER BY ordinal_position;
      `, [table]);

      console.log('Columns:');
      structureResult.rows.forEach(col => {
        console.log(`  ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'})`);
      });

      
      const dataResult = await pool.query(`SELECT * FROM ${table} LIMIT 3`);
      console.log('Sample data:', dataResult.rows.length > 0 ? dataResult.rows : 'No data');
      console.log('');
    }

  } catch (error) {
    console.error('Error checking tables:', error);
  } finally {
    await pool.end();
  }
}

checkAllTables();