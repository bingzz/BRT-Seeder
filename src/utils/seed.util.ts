import express from 'express';
import path from 'path';
import DateInstance from '../config/date';
import Generator from '../config/generator';
import { consummationDB, sqlQuery } from '../db/database';

const file = path.basename(__filename);

export enum DateRange {
  DAY = 'DAY',
  MONTH = 'MONTH',
  WEEK = 'WEEK'
}

type SummaryParams = [Date, string, string, number,
  number, number, string, string,
  string, string, number, string | null,
  string | null, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  string | null, string | null, string | null, string,
  string, string, number, number,
  number, number];

const dateInstance = new DateInstance();
const generator = new Generator();

const getDaysInMonth = dateInstance.getDaysInMonth();
const getCurrentDate = dateInstance.date.getDate();

class SeedUtils {
  /** Generate Data in the zreading_summary */
  async generateSummary(merchantID: string, branchID: string, routeCode: string, pao: string, driver: number, imei: string, range: DateRange, fileName: string, functionName: string) {
    fileName += ` => ${file}`;
    functionName += ` => generateSummary()`;

    try {
      console.log(`Generating Summary for:`, branchID, imei);

      let query = `INSERT INTO zreading_summary(dateTimeIn, txnDate, merchantID, grossSales, tranCount, totalPass, outlet, imei, route, pao, driver, timeIn, timeOut, hours, cashCount, grossCount, grossAmt, discountCount, discountAmount, netAmount, rfidCount, rfidAmount, unliRideCount, unliRideAmount, qrCount, qrAmount, passCount, cctvCount, concern, action, recommendation, cctvUrl, extra1, extra3, odomStart, odomEnd, fuelConsume, cctvExit) VALUES ?`;

      let insertQuery: SummaryParams[] = [];

      const insertData = (date: number) => {
        try {
          const year = dateInstance.date.getFullYear();
          const month = dateInstance.date.getMonth() + 1;
          const hour = dateInstance.date.getHours();
          const mins = dateInstance.date.getMinutes();
          const secs = dateInstance.date.getSeconds();

          const dateTimeIn = new Date(year, month, date, hour, mins, secs);
          const txnDate = dateInstance.YYYYMMDDFormat(year, month, date);

          const grossSales = generator.generateRandomNumbers(9999, true);
          const tranCount = generator.generateRandomNumbers(999, false);
          const totalPass = generator.generateRandomNumbers(999, false);

          const timeIn = generator.generateRandomNumbers(2, false) ? new Date(`${txnDate} ${generator.generateRandomTime()}`).toISOString() : null;
          const timeOut = timeIn && generator.generateRandomNumbers(2, false) ? new Date(`${txnDate} ${generator.generateRandomTime()}`).toISOString() : null;

          const hours = generator.generateRandomNumbers(24, false);
          const cashCount = generator.generateRandomNumbers(9999, true);
          const grossCount = generator.generateRandomNumbers(999, false);
          const grossAmt = generator.generateRandomNumbers(9999, true);
          const discountCount = generator.generateRandomNumbers(999, false);
          const discountAmt = generator.generateRandomNumbers(9999, true);
          const netAmt = generator.generateRandomNumbers(9999, true);
          const rfidCount = generator.generateRandomNumbers(999, false);
          const rfidAmt = generator.generateRandomNumbers(9999, true);
          const unliRideCount = generator.generateRandomNumbers(999, false);
          const unliRideAmt = generator.generateRandomNumbers(9999, true);
          const qrCount = generator.generateRandomNumbers(999, false);
          const qrAmt = generator.generateRandomNumbers(9999, true);
          const passCount = generator.generateRandomNumbers(999, false);
          const cctvCount = generator.generateRandomNumbers(999, false);
          const concern = null;
          const action = null;
          const recommendation = null;
          const cctvUrl = `${txnDate} ${generator.generateRandomTime()}`;
          const extra1 = `${txnDate} ${generator.generateRandomTime()}`;
          const extra3 = generator.generateRandomCoordinates();
          const odomStart = generator.generateRandomNumbers(99999, true);
          const odomEnd = generator.generateNumRange(odomStart, 99999, true);
          const fuelConsume = generator.generateRandomNumbers(9999, true);
          const cctvExit = generator.generateRandomNumbers(999, false);

          insertQuery.push([dateTimeIn, txnDate, merchantID, grossSales, tranCount, totalPass, branchID, imei, routeCode, pao, driver, timeIn, timeOut, hours, cashCount, grossCount, grossAmt, discountCount, discountAmt, netAmt, rfidCount, rfidAmt, unliRideCount, unliRideAmt, qrCount, qrAmt, passCount, cctvCount, concern, action, recommendation, cctvUrl, extra1, extra3, odomStart, odomEnd, fuelConsume, cctvExit]);
        } catch (error) {
          throw error;
        }
      };

      switch (range) {
        case DateRange.DAY:
          insertData(getCurrentDate);
          break;
        case DateRange.MONTH:
          for (let date = 1; date <= getDaysInMonth; date++) {
            insertData(date);
          }

          break;
        case DateRange.WEEK:
          for (let date = getCurrentDate; date < getCurrentDate + 7; date++) {
            if (date > getDaysInMonth) break; // break if date is at the last day of the month
            insertData(date);
          }

          break;
        default: throw 'Invalid Date selection';
      }

      return await sqlQuery(consummationDB, query, [insertQuery])
        .catch(error => { throw error; });

    } catch (error) {
      throw { error, fileName, functionName };
    }
  }

  async generateTimeSheet(merchantID: string, pao: string, driver: number, imei: string, fileName: string, functionName: string) {
    fileName += ` => ${file}`;
    functionName += ` => generateTimeSheet()`;

    try {

    } catch (error) {
      throw { error, fileName, functionName };
    }
  }

  async generateTransactions(fileName: string, functionName: string) {
    fileName += ` => ${file}`;
    functionName += ` => generateTransactions()`;

    try {

    } catch (error) {
      throw { error, fileName, functionName };
    }
  }

  async generateZreadingLogs(fileName: string, functionName: string) {
    fileName += ` => ${file}`;
    functionName += ` => generateZreadingLogs()`;

    try {

    } catch (error) {
      throw { error, fileName, functionName };
    }
  }

  async generateCctvLogs(fileName: string, functionName: string) {
    fileName += ` => ${file}`;
    functionName += ` => generateCctvLogs()`;

    try {

    } catch (error) {
      throw { error, fileName, functionName };
    }
  }
}

export default SeedUtils;