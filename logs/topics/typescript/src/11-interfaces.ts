// Interfaces ka main goal object ko shape dena
// it defines the STRUCTURE of object
interface Chai {
    flavour: string;
    price: number;
    milk?: boolean;
}

const masala: Chai = {
    flavour: "masala",
    price: 30,
};

interface Shop {
    readonly id: number;
    name: string;
}

const s: Shop = {
    id: 1,
    name: "CCD",
};

interface DiscountCalculator {
    // we cannot add functionality and usko bhi add nhi krna
    (price: number): number;
}

const apply50: DiscountCalculator = (p) => p * 0.5;
// Interface as a function type:
// Normally, interfaces describe objects with properties/methods. But here, the interface is describing a
// call signature — meaning it defines the shape of a function.
// (price: number): number means: a function that takes a number and returns a number.

interface TeaMachine {
    // it must have many methods but ye interface hai
    start(): void;
    stop(): void;
}

const machine: TeaMachine = {
    // Ye TeaMachine Interface ke format ko match krega
    start() {
        console.log("Start");
    },
    stop() {
        console.log("stop");
    },
};

// INDEX SIGNATURE
interface ChaiRatings {
    [flavour: string]: number;
}

const ratings: ChaiRatings = {
    masala: 4.5,
    ginger: 4.5,
};

// Kayi baar we use many libraries
interface User {
    name: string;
}
interface User {
    age: number;
}

// both are merged automatically
const u: User = {
    name: "Harsh",
    age: 21,
};

interface A {
    a: string;
}
interface B {
    b: string;
}

// dono mix kr diya
interface C extends A, B{

}
