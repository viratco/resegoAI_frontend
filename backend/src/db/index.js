
import pkg from 'pg';
const { Pool } = pkg;
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

export default pool;
