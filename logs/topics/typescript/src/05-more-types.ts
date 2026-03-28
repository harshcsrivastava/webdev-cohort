let response: any = "42";

// forcefull type assertions
let numericLength: number = (response as string).length;

type Book = {
    name: string;
};

let bookString = '{"name": "who moved my cheese"}';

let bookObject = JSON.parse(bookString) as Book; //agar as book nhi karenge to . operator se suggestion nhi milega

console.log(bookObject.name);

const inputElement = document.getElementById("username") as HTMLInputElement; //TS me available hai

let value: any;
value = "Chai";
value = [1, 2, 3];
value = 2.5;
value.toUpperCase();

let valueUnknown: unknown;
valueUnknown = "Chai";
valueUnknown = [1, 2, 3];
valueUnknown = 2.5;
// valueUnknown.toUpperCase() -> errror dikhayega ki aise nhi chlega unlike any

// we will use guards like before
if (typeof valueUnknown === "string") valueUnknown.toUpperCase();

try {
} catch (error) {
    // console.log(error.message); -> error is of type unknown
    if (error instanceof Error) {
        console.log(error.message);
    }

    console.log("Error", error);
}

const data: unknown = "something";
const strData: string = data as string; // FORCEFULLY

// NEVER in TS
type Role = "admin" | "user";

function redirectBasedOnRole(role: Role): void {
    // kuch bhi nhi return karunga, ya karunga to I dont care about tha

    if (role === "admin") {
        console.log("Redirect to admin dashboard");
        return;
    }

    if (role === "user") {
        console.log("Redirect to user dashboard");
        return;
    }

    // role; => if yaha role likhte to iska type never ayega kyoki sare cases upar handle kar liya
}

function neverReturn():never{
    while(true){}
}
