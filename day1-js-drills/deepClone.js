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

console.log(student);
console.log(copy);


