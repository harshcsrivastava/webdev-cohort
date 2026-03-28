const chai = {
    name: "Masala ChaI",
    price: 20,
    isHot: true,
};

// (name: string, price:  number, isHot: boolean)

let tea: {
    name: string;
    price: number;
    isHot: true;
};

tea = {
    name: "Ginger ChaI",
    price: 25,
    isHot: true,
};

type Tea = {
    name: string;
    price: number;
    ingredients: string[];
};

const aadrakChai: Tea = {
    name: "Aadrak Chai",
    price: 25,
    ingredients: ["ginger", "tea leaves"],
};

// If it looks like a duck, then it might be a duck
type Cup = {
    size: string;
};

let smallCup: Cup = { size: "200ml" };
let bigCup = { size: "500ml", material: "steel" };

smallCup = bigCup;

// type Brew = { brewTime: number };
// let coffee: Brew = { brewTime: 5, beans: "Africa" };
// let chaiBrew: Brew = coffee;

type User = {
    username: string;
    password: string;
};

const u: User = {
    username: "chaicode",
    password: "123",
};

type Item = { name: string; quantity: number };
type Address = { street: number; pin: number };

type Order = {
    id: string;
    items: Item[];
    address: Address;
};

type Chai = {
    name: string;
    price: number;
    isHot: boolean;
};

const updatedChai = (updates: Partial<Chai>) => {
    //Partial allows value change; It makes all properties optional
    console.log("Updating with ", updates);
};

updatedChai({ price: 25 });
updatedChai({ isHot: false });
updatedChai({}); // we can pass empty object

type ChaiOrder = {
    name?: string;
    quantity?: number;
};

const placeOrder = (order: Required<ChaiOrder>) => {
    console.log(order);
};

// placeOrder({}) => cannot send empty object or a single property
placeOrder({
    name: "aalu",
    quantity: 2,
}); 

type Coffee = {
    name: string;
    price: number;
    isHot: boolean;
    ingredients: string[];
};

type BasicCoffeeInfo = Pick<Coffee, "name" | "price"> // from coffee pick a set of coffee whose property are union
// inhi properties ki zarurat hai hame
const coffeeInfo: BasicCoffeeInfo = {
    name: "Cappucino",
    price: 30
}

type CoffeeSecret = {
    name: string;
    price: number;
    isHot: boolean;
    ingredients: string[];
    secretIngredients: string
}
type PublicCoffee = Omit<CoffeeSecret, "secretIngredients">