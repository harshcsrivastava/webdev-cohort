export function getChai(size: "small" | "medium" | number) {
    if (size === "small") return `Serving extra small chai`;
    if (size === "medium") return `Serving Medium chai`;

    return `Chai order #${size}`;
}

class KulhadChai {
    serve() {
        return `Serving Kulhad Chai`;
    }
}

class GingerChai {
    serve() {
        return `Serving Ginger Chai`;
    }
}

function serve(chai: KulhadChai | GingerChai) {
    // how do i check konsa method call ho rha
    if (chai instanceof KulhadChai) return chai.serve();
    if (chai instanceof GingerChai) return chai.serve();
}

// Creating Custom Types
type ChaiOrder = {
    type: string;
    sugar: number;
};

function isChaiOrder(obj: any): obj is ChaiOrder {
    // jo is function se niklega vo type chaiOrder ka hoga
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    );
}

function serveOrder(item: ChaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar}`;
    }

    return `Serving custom chai ${item}`;
}

type MasalaChai = {
    type: "masala";
    spicelevel: number;
};
type AadrakChai = {
    type: "aadrak";
    amount: number;
};
type ElaichiChai = {
    type: "elaichi";
    aroma: number;
};

type Chai = MasalaChai | AadrakChai | ElaichiChai;

function MakeChai(order: Chai) {
    switch (order.type) {
        case "masala":
            return `Masala Chai`;
            break;
        case "aadrak":
            return `Aadrak Chai`;
            break;
        case "elaichi":
            return `Elaichi Chai`;
            break;
    }
}

function brew(order: MasalaChai | AadrakChai) {
    if ("spicelevel" in order) {
        //check whether a property exist in type
    }
}

// function isStringArray(arr: unknown):arr is string[]{
     // returns a array of string
// }
