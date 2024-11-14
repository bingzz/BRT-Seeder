import path from 'path';
import mysql, { ResultSetHeader } from 'mysql2';
import dotenv from 'dotenv';
import writeErrorLog from '../utils/writeErrorLog';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

dotenv.config({ path: '/.env' });

export enum databaseEnum {
  accounts = 'gk_accounts',
  consummation = 'gk_consummation',
  miscellaneous = 'gk_miscellaneous',
  vouchers = 'gk_vouchers'
}

const file = path.basename(__filename);

const { DBHOST, DBPORT, DBUSER, DBPASSWORD } = process.env;

const dbCredentials = {
  host: DBHOST,
  user: DBUSER,
  password: DBPASSWORD,
  port: Number(DBPORT) || 3000,
};

const db = mysql.createConnection(dbCredentials);

db.ping((err) => {
  if (err) {
    writeErrorLog(file, '', 'Database Connection Failed', err, {});
    process.exit(1);
  }

  console.log('Database Connection Successful');
});

const createPool = (dbName: databaseEnum) => mysql.createPool({
  ...dbCredentials,
  database: dbName,
  connectionLimit: 10,
});

export const accountsDB = createPool(databaseEnum.accounts);
export const consummationDB = createPool(databaseEnum.consummation);
export const miscellaneousDB = createPool(databaseEnum.miscellaneous);
export const vouchersDB = createPool(databaseEnum.vouchers);

export const sqlQuery = <T>(pool: Pool, query: string, queryData: any[]) => new Promise<T>((resolve, reject) => {

  pool.getConnection((err, conn) => {
    if (err) {
      reject(err);
      return;
    }

    conn.query(query, queryData, (err, result) => {
      conn.release();

      if (err) {
        conn.destroy();
        reject(err);
        return;
      }

      resolve(<T> result);
    });

    conn.on('error', (err) => {
      conn.destroy();
      reject(err);
    });
  });
});