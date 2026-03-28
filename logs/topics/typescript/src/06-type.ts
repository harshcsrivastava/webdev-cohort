type ChaiOrder = { type: string; sugar: number; strong: boolean };

function makeChai(order: ChaiOrder) {
    console.log(order);
}

function serverChai(order: ChaiOrder) {
    //data ka signature repeat ho rha: order exactly match ho rha
    console.log(order);
}

// Type ka bhai-bandhu

type TeaRecipe = {
    water: number;
    milk: number;
};

// class MasalaChai implements TeaRecipe {
//     water = 100;
//     milk = 50;
// }

// type CupSize = "small" | "large" //because of error
interface CupSize {
    size: "small" | "large";
}

// suggestion hi nhi aya
// A class can only implement an object type or intersection of object types with statically known members
class Chai implements CupSize {
    // -> error
    size: "small" | "large" = "large";
}

// interface Response = {ok: true} | {ok: false} //union lagate to class me nhi jata
// class myRes implements Response{
//     ok:Boolean = "true"
// }

type TeaType = "masala" | "lemon" | "ginger"; //  => this is known as LITERAL TYPES
// | => UNION ya OR
function orderChai(t: TeaType) {
    console.log(t);
}

// & => INTERSECTION

type BaseChai = { tealeaves: number };
type Extra = { masala: number };

type MasalaChai = BaseChai & Extra;

const cup: MasalaChai = {
    tealeaves: 2, //  Property 'masla' is missing in type
    masala: 1,
};

// OPTIONALA VALUE
type User = {
    username: string;
    bio?: string;
};

const u1: User = { username: "Harsh" };
const u2: User = { username: "KAMI", bio: "Bhagwan" };

type Config = {
    // readonly keyword
    readonly appName: string;
    version: number;
};

const cfg: Config = {
    appName: "MasterJi",
    version: 1
}

// cfg.appName = "ChaiCode" => Cannot assign to 'appName' because it is a read-only property.
