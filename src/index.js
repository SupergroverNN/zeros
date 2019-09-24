function zeros1(n) {
  let result = 0;
  let temp = n;
  while (temp > 1) {
    temp = Math.floor(temp / 5);
    result += temp;
  }
  return result;
}

module.exports = function zeros(expression) {
  const arr2 = expression
    .split("*")
    .filter(item => item.match(/!/g).length === 2)
    .map(item => item.replace(/!/g, ""));
  const arr1 = expression
    .split("*")
    .filter(item => item.match(/!/g).length === 1)
    .map(item => item.replace(/!/g, ""));
  let zero = 0;
  const count = {
    nums: 0,
    five: 0
  };
  arr1.forEach(item => {
    if (item >= 2) {
      zero += zeros1(item);
      count["nums"] += item - 2;
    }
  });
  arr2.forEach(item => {
    if (item % 2 === 0) {
      const tens = Math.floor(item / 10);
      zero += tens;
      if (item >= 4) {
        count["nums"] += item / 2 - (tens + 1);
        count["five"] += Math.floor(tens / 5);
      } else {
        count["nums"] += item / 2 - tens;
        count["five"] += Math.floor(tens / 5);
      }
    } else if (item >= 5) {
      const bonus = item >= 25 ? (item >= 75 ? 3 : 2) : 1;
      const fives = bonus + Math.floor((item - 5) / 10);
      count["five"] += fives;
    }
  });
  const added = Math.min(count["nums"], count["five"]);
  zero += added;
  return zero;
};
