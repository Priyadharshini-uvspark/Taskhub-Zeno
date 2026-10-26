console.log("Initially Starting the code by console.log");

setTimeout(function () {
  console.log("setTimeout function is used");
}, 0);

Promise.resolve().then(function () {
  console.log("Promise.then function is used ");
});

queueMicrotask(function () {
  console.log("queueMicrotask function is used");
});

async function myFunction() {
  console.log("function Inside async function");

  await Promise.resolve();

  console.log("used await");
}

myFunction();

console.log("final code line");
