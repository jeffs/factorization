function divide(pairs, number, factor) {
  let power = 0;
  for (; number % factor === 0; number /= factor) {
    ++power;
  }
  if (power > 0) {
    pairs.push([factor, power]);
  }
  return number;
}

function primeFactor(number) {
  if (number < 1) {
    return [];
  }
  const pairs = [];
  number = divide(pairs, number, 2);
  for (let factor = 3; factor <= number; factor += 2) {
    number = divide(pairs, number, factor);
  }
  return pairs;
}
