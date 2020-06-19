const calcTip = (total, tipPercent = 0.25) => total + total * tipPercent;

const fahrToCelc = temp => {
  return (temp - 32) / 1.8;
};

const celsToFahr = temp => {
  return temp * 1.8 + 32;
};

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("numbers must be positive");
      }
      resolve(a + b);
    }, 2000);
  });
};

module.exports = { calcTip, fahrToCelc, celsToFahr, add };
