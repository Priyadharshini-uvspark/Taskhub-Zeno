function myPromiseAll(promises) {
  return Promise.all(promises);
}

let p1 = Promise.resolve("HTML");
let p2 = Promise.resolve("CSS");
let p3 = Promise.resolve("Javascript");


myPromiseAll([p1, p2, p3]).then(function (result) {
  console.log(result);
});