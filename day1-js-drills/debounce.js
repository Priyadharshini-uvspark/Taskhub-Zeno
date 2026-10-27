function debounce(fn, delay) {
  let timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(function () {
      fn();
    }, delay);
  };
}

function sayHello() {
  console.log("Hello!");
}

// let result = debounce(sayHello, 1000);

// result();
// result();
// result();
let count = 0;

function countCalls() {
  count++;
}

let result = debounce(countCalls, 100);

result();
result();
result();

console.assert(count === 0, "Test 1 failed");

setTimeout(function () {
  console.assert(count === 1, "Test 2 failed");

  result();
  result();

  setTimeout(function () {
    console.assert(count === 2, "Test 3 failed");
    console.log("Debounce tests completed");
  }, 200);
}, 200);