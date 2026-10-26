function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let student = {
  name: "Priya",
  age: 21,
  skills: {
    first: "HTML",
    second: "JavaScript"
  }
};

let copy = deepClone(student);

copy.name = "Abi";
copy.age = "24";
copy.skills.first = "CSS";

// console.log(student);
// console.log(copy);

// Test 1: Check that the copy is a different object
console.assert(copy !== student, "Test 1 failed");

// Test 2: Check that the nested object is separate
console.assert(copy.skills !== student.skills, "Test 2 failed");

// Test 3: Check that changing the copy doesn't change the original
copy.skills.first = "Python";

console.assert(
  student.skills.first === "HTML",
  "Test 3 failed"
);
