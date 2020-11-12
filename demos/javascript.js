/*
    My favourite cheatsheat: https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-introduction/cheatsheet
*/

// Single Line Comment

/* Variables */
const constVar = ""; // Constant
let letVar = 0; // Variable
var varVar = true; // Old Style

/* Functions */
// Old way
function testFunction(parm1, param2) {
    this.var = false;
    return true;
}

// Arrow functions
const testArrowFunction = (param1, param2) => {
    return true;
}
const testArrowFunction = (param1, param2) => true;
const testArrowFunction = param1 => true;
const testArrowFunction = () => true;

/* If statements */
if (true) {
    return true;
}

const array = [];
// If null or empty
if (array) {

}

const num1 = 2;
const num2 = "2";
if (num1 == num2) // true
if (num1 === num2) // false

// Printing
console.log("Hello World");
console.log("Hello: " + " World" + num1);
console.log(`${num1} ${num2}`) // 2 2


/* Arrays */
const array = [1,2,3];
console.log("Length of Array" + array.length);
array.push(1);

/* Loops */
for (let index = 0; index < array.length; index++) {
    const element = array[index];
}

array.forEach(element => {
    console.log(element);
});

for (const element of array) {
    console.log(element);
}

/* Objects */
const statement = {
    text: "Hitler is a bastard",
    lie: false 
}

console.log(statement.text);
statement.author = "Max Kelly";
console.log(statement);

const person = {
    name: "Nick",
    yearOfBirth: 1999,
    calcAge: function() {
        const date = new Date();
        return date.getFullYear() - this.yearOfBirth;
    }
}

for (const key in object) {
    if (object.hasOwnProperty(key)) {
        const element = object[key];
        
    }
}

const { name, yearOfBirth } = person;

/* Classes */
class Dog {
    constructor() {
        this.name = "Fred";
    }

    bark() {

    }
}

const dog = new Dog();

/* Importing Files */
// JavaScript
import * from "importFile";

// NodeJS
const Blank = require("module");