import path from 'path';
import { consummationDB, sqlQuery } from '../db/database';

const file = path.basename(__filename);

// Get Registered Data
class SetupUtils {
  async getPAO(merchantID: string, fileName: string, functionName: string) {
    fileName += ` => ${file}`;
    functionName += ` => getPAO()`;

    try {
      const queryData = [merchantID];
      const query = `SELECT ID, CONCAT(TRIM(lastName), ', ', TRIM(firstName)) 'PAO' FROM zreading_pao_list WHERE status = 'ACTIVE' AND merchantID = ?`;

      return await sqlQuery<{ ID: number, PAO: string; }[]>(consummationDB, query, queryData)
        .catch(error => { throw error; });
    } catch (error) {
      throw { error, fileName, functionName };
    }
  }

  async getDrivers(merchantID: string, fileName: string, functionName: string) {
    fileName += ` => ${file}`;
    functionName += ` => getDrivers()`;

    try {
      const queryData = [merchantID];
      const query = `SELECT ID, CONCAT(TRIM(lastName), ', ', TRIM(firstName)) 'driver' FROM zreading_driver_list WHERE status = 'ACTIVE' AND merchantID = ?`;

      return await sqlQuery<{ ID: number, PAO: string; }[]>(consummationDB, query, queryData)
        .catch(error => { throw error; });
    } catch (error) {
      throw { error, fileName, functionName };
    }
  }

  async getIMEI(merchantID: string, fileName: string, functionName: string) {
    fileName += ` => ${file}`;
    functionName += ` => getIMEI()`;

    try {
      const queryData = [merchantID];
      const query = `SELECT ID, IMEI FROM zreading_imei_list WHERE status = 'ACTIVE' AND merchantID = ?`;

      return await sqlQuery<{ ID: number, IMEI: string; }[]>(consummationDB, query, queryData)
        .catch(error => { throw error; });
    } catch (error) {
      throw { error, fileName, functionName };
    }
  }
}

export default SetupUtils;