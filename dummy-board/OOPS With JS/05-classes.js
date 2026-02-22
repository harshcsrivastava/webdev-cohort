// Basic Format of Class
class Cricketer{
    constructor(name, role){
        this.name = name;
        this.role = role;
        this.matchesPlayed = 0
        this.stamina = 100
    }
    
    introduce(){
        return `${this.name} - The ${this.role} | matchesPlayed: ${this.matchesPlayed} | stamina: ${this.stamina}`
    }
}

const player1 = new Cricketer("Virat", "Batsman")

console.log(player1.hasOwnProperty("stamina")); //true
console.log(typeof Cricketer); //function

class Debutant{
    constructor(name){
        this.name = name
        this.walkOut = () => `${this.name} walks out for first time`
    }

}
const deb1 = new Debutant("Shubman")
const something = deb1.walkOut

const deb2= new Debutant("Rinku")
// deb1.walkOut === deb2.walkOut -> false, references different, same memory
console.log(something());
