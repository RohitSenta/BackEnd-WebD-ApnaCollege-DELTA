const sum = (a, b) => a + b;
const mul = (a, b) => a * b;
const sub = (a, b) => a - b;
const div = (a, b) => a / b;
const g = 9.8;
const PI = 3.14;

let obj = {
    sum: sum,
    mul: mul,
    sub: sub,
    div: div,
    g: g,
    PI: PI
}

exports = obj;