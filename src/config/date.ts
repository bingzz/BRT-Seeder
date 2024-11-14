import { numPadStart } from "./formatter";

class DateInstance {
  date = new Date();

  /** Get number of days in a month */
  getDaysInMonth() {
    return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
  }

  getDaysInWeek() {

  }

  /** YYYY-MM-DD Format */
  YYYYMMDDFormat(year: number, month: number, date: number) {
    return `${year}-${numPadStart(month)}-${numPadStart(date)}`;
  }
}

export default DateInstance;