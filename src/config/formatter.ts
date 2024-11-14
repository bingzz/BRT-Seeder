/** Add pad start on numbers less than 10 */
export const numPadStart = (num: number | string) => num.toString().padStart(2, '0');