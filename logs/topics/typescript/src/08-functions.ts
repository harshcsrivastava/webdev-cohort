function makeChai(type: string, cups: number) {
    console.log(`Making ${cups} of ${type} chai`);
}

makeChai("Masala", 2);

function getChaiPrice(): number {
    //function se data process hone ke baad kya return hoga
    return 25;
}
function makeOrder(order: string) {
    if (!order) return null;
    return order;
}

// LOGGER Function
function logChai(): void {
    // kuch data bahar nhi aarha
    // explicitly bata diya
    console.log("Chai is ready");
}

// Standard practice - optional and default are end at params
// function orderChai(type?: string){}
// function orderChai(type: string = "Masala"){}
// good practice - function ka return type define kr do

function createChai(order: {
    type: string;
    sugar: number;
    size: "small" | "large";
}): number {
    return 3;
}

// Jo value pass krrhe use PREDECLARE kr lo
// kuch nhi aarha to VOID kar do varna jo arha vo krdo
