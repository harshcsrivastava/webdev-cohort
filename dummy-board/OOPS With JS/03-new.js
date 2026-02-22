function TataCar(chasisNumber, modelName){
    this.chasisNumber = chasisNumber
    this.modelName = modelName
    this.fuelLevel = 100
}

// prototype is object available to every function
// we can also add function in this

TataCar.prototype.status = function() {
    return `Tata ${this.modelName} #${this.chasisNumber} | Fuel: ${this.fuelLevel}`
}

const car1 = new TataCar("MH-101", "Nexon")
const car2 = new TataCar("UP-27", "Range Rover")

console.log(car1.status());
console.log(car2.status()); // runs smoothly

// console.log(car1.modelName); -> throws error
/***
 * 1. new -> empty object banana
 * 2. Link the object to the constructor’s prototype
 * 3. bound this to new object
 * 4. explicit return
 */

function createAuto(id, route){
    return {
        id, route, rasta(){
            return `${id} takes ${route}`
        }
    }
}

const auto1 = createAuto("UP-27", "Delhi-Mumbai")
console.log(auto1.rasta());

