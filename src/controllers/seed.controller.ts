import express from 'express';
import path from 'path';
import SeedUtils, { DateRange } from '../utils/seed.util';
import SetupUtils from '../utils/setup.util';
import HTTP_CODES from '../constants/http_codes';
import Generator from '../config/generator';

const file = path.basename(__filename);

const seedUtil = new SeedUtils();
const setupUtil = new SetupUtils();
const generator = new Generator();

class SeedController {
  async seedData(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.locals.file = file;
    res.locals.function = 'seedData()';

    try {
      const { merchantID, range } = req.query;

      if (!merchantID) {
        res.status(HTTP_CODES.NOT_FOUND);
        throw 'No Merchant';
      }

      if (!range) {
        res.status(HTTP_CODES.NOT_FOUND);
        throw 'No Date Range Selected';
      }

      if (!['MONTH', 'WEEK', 'DAY'].includes(range as string)) {
        res.status(HTTP_CODES.NOT_FOUND);
        throw 'Specify Date Range';
      }

      console.log('Seeding...');

      /** Get Setup Data */
      const [pao, driver, imei] = await Promise.all([
        setupUtil.getPAO(merchantID as string, res.locals.file, res.locals.function),
        setupUtil.getDrivers(merchantID as string, res.locals.file, res.locals.function),
        setupUtil.getIMEI(merchantID as string, res.locals.file, res.locals.function),
      ]);

      /** Get the maximum data that can provide */
      const maximumData = Math.min(pao.length, driver.length, imei.length);

      let tempPao = pao;
      let tempDriver = driver;
      let tempImei = imei;

      /** Iterate each selected data */
      for (let max = maximumData - 1; max >= 0; max--) {
        const paoIdx = generator.generateNumRange(0, max, false);
        const driverIdx = generator.generateNumRange(0, max, false);
        const imeiIdx = generator.generateNumRange(0, max, false);

        const targetPao = tempPao[paoIdx];
        const targetDriver = tempDriver[driverIdx];
        const targetImei = tempImei[imeiIdx];
        const busNumber = `${merchantID}B${max}`;
        const routeCode = `${merchantID}-ROUTE-${generator.generateRandomNumbers(2, false)}`;

        /** Reduce size over iteration */
        tempPao.splice(paoIdx, 1);
        tempDriver.splice(driverIdx, 1);
        tempImei.splice(imeiIdx, 1);

        /** Generate Data to table */
        await Promise.all([
          seedUtil.generateSummary(merchantID as string, busNumber, routeCode, targetPao.PAO, targetDriver.ID, targetImei.IMEI, range as DateRange, res.locals.file, res.locals.function)

        ]);
      }

      console.log('Seeding Complete');
      res.send('Seeding Complete');
    } catch (error) {
      next(error);
    }
  }
}

export default SeedController;