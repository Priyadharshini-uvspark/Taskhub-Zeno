function memoize(fn) {
  let saved = {};

  return function (num) {
    if (num in saved) {
      return saved[num];
    }

    let result = fn(num);
    saved[num] = result;

    return result;
  };
}

function square(num) {
  console.log("Calculating...");
  return num * num;
}

let result = memoize(square);

console.log(result(4));
console.log(result(4));
console.log(result(5));

console.assert(result(4) === 16, "Test 1 failed");
console.assert(result(5) === 25, "Test 2 failed");
console.assert(result(3) === 9, "Test 3 failed");
