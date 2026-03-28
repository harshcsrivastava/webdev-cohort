// ================= ARRAYS =================

const chaiFlavours: string[] = ["Masala", "Ginger"]; // we cannot add number
const chaiPrice: number[] = [10, 20];
const rating: Array<number> = [4.5, 5]; //can be custom-defined or normal

type Chai = {
    name: string;
    price: number;
};

const menu: Chai[] = [
    //array
    { name: "masala", price: 20 },
    { name: "ginger", price: 10 },
];

const cities: readonly string[] = ["Delhi", "Jaipur"]; //cannot edit the properties
// cities.push("Pune")

const table: number[][] = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
];

// ================= TUPLES =================

// BTS: Tuples are array
let chaiTuple: [string, number];

chaiTuple = ["Masala", 30];
// chaiTuple = [23, "ginger"] => Not allowed

let userInfo: [string, number, boolean?];
userInfo = ["harsh", 23];
userInfo = ["harsh", 23, false];

const location: readonly [number, number] = [2.4, 55];

// NAMED TUPLE - MORE Prefered
const chaiItems: [name: string, price: number] = ["masala", 22];

// ================= ENUMS =================

// user ko free chodne se acha uski choice me limit laga do
// enum value in CAPS
// we prefer enums sab ek TYPE ka ho
enum CupSize {
    SMALL,
    MEDIUM,
    LARGE,
}

const size = CupSize.LARGE;

// Gaachas
enum Status {
    PENDING = 100,
    SERVED, //101 automatic
    CANCELLED, //102
}

enum ChaiType {
    MASALA = "Masala",
    GINGER = "ginger",
}

function makeChai(type: ChaiType) {
    console.log(`Making: ${type}`);
}

makeChai(ChaiType.GINGER);

// Not this, mix of type
enum RandomEnum {
    ID = 1,
    NAME = "Chai",
}

const enum Sugars {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}

const s = Sugars.HIGH

let t: [string, number] = ["chai", 10]
t.push("extra")