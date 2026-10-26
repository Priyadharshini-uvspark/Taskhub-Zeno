function throttle(fn, delay) {
  let lastTime = 0;
  let firstCall = true;

  return function () {
    let currentTime = Date.now();

    if (firstCall || currentTime - lastTime >= delay) {
      fn();
      lastTime = currentTime;
      firstCall = false;
    }
  };
}

let count = 0;

function countCalls() {
  count++;
}

let result = throttle(countCalls, 200);

result();
console.assert(count === 1, "Test 1 failed");

result();
console.assert(count === 1, "Test 2 failed");

setTimeout(function () {
  result();
  console.assert(count === 2, "Test 3 failed");
  console.log("Throttle tests completed");
}, 250);
