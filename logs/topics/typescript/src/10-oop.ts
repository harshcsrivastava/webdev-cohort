// class Chai {
//     flavour: string;
//     price: number;

//     // Recommended to declare a constructor
//     // constructor(flavour: string, price: number){
//     //     this.flavour = flavour;
//     //     this.price = price
//     // }

//     constructor(flavour: string){
//         this.flavour = flavour;
//     }
// }

// const masalaChai = new Chai("Ginger");
// masalaChai.flavour = "Masala"

// ACCESS Modifier

class Chai {
    public flavour: string = "Masala";
    private secretIng = "Cardamon";

    // Private variables are accessed through method
    reveal() {
        return this.secretIng;
    }
}
const c = new Chai();
console.log(c.reveal());

class Shop {
    // staff door
    protected shopName = "chai corner";
}

class Branch extends Shop {
    getName() {
        return this.shopName;
    }
}

// new Branch().getName

class Wallet {
    #balance = 100;

    getBalance() {
        return this.#balance;
    }
}

const w = new Wallet();
console.log(w.getBalance());

class Cup {
    readonly capacity: number;

    constructor(capacity: number = 250) {
        this.capacity = capacity;
    }
}
class ModernChai {
    private _sugar = 2;

    // getter and setter
    get sugar() {
        return this._sugar;
    }

    set sugar(value: number) {
        if (value > 5) throw new Error("Jyada Meetha hai");
        this._sugar = value;
    }
}

const v = new ModernChai();
v.sugar = 3;

class EkChai {
    static shopName = "ChaiCode Cafe";

    constructor(public flavour: string) {}
}

console.log(EkChai.shopName); // statically defined hai

// classes banani hai lekin un classes se koi OBJECT bane => ABSTRACT Classes
abstract class Drink {
    abstract make(): void; //implementation kam, kya hota vo define krte
}

class MyChai extends Drink {
    make() {
        console.log("Brewing Chai");
    }
}

// Composition : Used in place of inheritance
class Heater {
    heat() {}
}

class ChaiMaker {
    constructor(private heater: Heater) {}
    // Heater class ko hi point kar diya, to uske access mil gya
    make() {
        this.heater.heat;
    }
}
