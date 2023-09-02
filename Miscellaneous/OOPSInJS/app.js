let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
arr1.sayHello = () => {
    console.log("Hello, i am arr");
}
arr2.sayHello = () => {
    console.log("Hello, i am arr");
}


// function personMaker(name, age){ 
//     const person = {
//         name: name,
//         age: age,
//         talk () {
//             console.log(`Hi, my name is ${this.name}`);
//         }
//     }

//     return person;
// }
// let p1 = personMaker("Adam", 24);
// let p2 = personMaker("Eve", 22);

// constructors - doeson't return anything & start with capital latter
// function Person(name, age){ 
//     this.name,
//     this.age,
//     console.log(this);
// }

// Person.prototype.talk = () => {
//     console.log(`Hi, my name is ${this.name}`);
// }


class Person {      // class - constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    talk() {
        console.log(`Hi, My name is ${this.name}`);
    }
}

let p1 = new Person("Rohit", 26);
let p2 = new Person("Anil", 24);


// inharitance
class Principal {
    constructor(name, age){
        console.log("principal class constructor");
        this.name = name;
        this.age = age;
    }
    talk() {
        console.log(`Hi, I am ${this.name}`);
    }
}

class Student extends Principal {
    constructor (name, age, marks) {
        console.log("student class constructor");
        super(name, age); // perent class constructor is being called
        this.marks = marks;
    }
}

class Teachear extends Principal {
    constructor (name, age, subject) {
        console.log("teacher class constructor");
        super(name, age); // perent class constructor is being called
        this.subject = subject;
    }
}

let stu1 = new Student ("Rohit", 26, 86);
let t1 = new Teachear ("Shradha", 24, "JavaScript");


// Dogs/Cats class

class Mammal {      // perent class
    constructor(name) {
        this.name = name;
        this.type = "warm-blooded";
    }

    eat() {
        console.log("I am eating");
    }
}

class Dog extends Mammal { // child class
    constructor(name) {
        super(name);
    }

    bark() {
        console.log("Wooff...");
    }
}

class Cat extends Mammal {  // child class
    constructor(name) { 
        super(name);
    }

    meow() {
        console.log("Meow...");
    }
}

let dog1 = new Dog("Mark");
let cat1 = new Cat("Casy");