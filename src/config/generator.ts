import DateInstance from "./date";

const dateInstance = new DateInstance();

class Generator {

  generateRandomCharacters() {

  }

  /** Generate a random number with a max value */
  generateRandomNumbers(max: number, decimal: boolean, decimalPoints?: number): number {
    const randomNumber = Math.random() * max;

    if (decimal) return Number(randomNumber.toFixed(decimalPoints || 2));
    return Math.floor(randomNumber);
  }

  /** Generate a random number between ranges (both inclusive) */
  generateNumRange(min: number, max: number, decimal: boolean, decimalPoints?: number) {
    const randomNumRange = Math.random() * (max - min + 1) + min;

    if (decimal) return Number(randomNumRange.toFixed(decimalPoints || 2));
    return Math.floor(randomNumRange);
  }

  generateRandomTime() {
    const randomHr = this.generateRandomNumbers(24, false);
    const randomMin = this.generateRandomNumbers(60, false);
    const randomSec = this.generateRandomNumbers(60, false);

    return `${randomHr}:${randomMin}:${randomSec}`;
  }

  generateRandomCoordinates() {
    const latitude = this.generateRandomNumbers(1, true, 10);
    const longitude = this.generateRandomNumbers(1, true, 10);

    return JSON.stringify({
      latitude: (10 + latitude).toString(),
      longitude: (123 + longitude).toString()
    });
  }
}

export default Generator;