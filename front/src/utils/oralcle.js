import oracledb from 'oracledb';

let pool;

export async function initialize() {
console.log('llega')
  pool = await oracledb.createPool({
    user: process.env.VITE_USER_DB,      
    password: process.env.VITE_PWD_DB, 
    connectString: `${process.env.VITE_HOST_DB}:${process.env.VITE_PORT_DB}/${process.env.VITE_DB}`,
  });
  console.log('Oracle connection pool started');
}

export async function close() {
  await pool.close();
  console.log('Oracle connection pool closed');
}

export async function executeQuery(query, binds = [], options = {}) {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(query, binds, options);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
