const { calcTip, fahrToCelc, celsToFahr, add } = require("../src/math");

test("Should calculate total plus tip", () => {
  const total = calcTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calcTip(10);
  expect(total).toBe(12.5);
});

test("should convert 32F to 0c", () => {
  const tempInC = fahrToCelc(32);
  expect(tempInC).toBe(0);
});

test("should convert 0c to 32 F", () => {
  const tempInFahr = celsToFahr(0);
  expect(tempInFahr).toBe(32);
});

test("Should add 2 numbers", done => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add 2 numbers async await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
