const prithviraj = {
    name: "PrithviRaj",
    generateon: "GF",
    cookDish(){
        return `${this.name} is ${this.generateon}`
    }
}

// Inherites prithviraj
const raj = Object.create(prithviraj)
raj.name = "Raj"
raj.runsBusiness = function(){
    return `${this.name} runs business`
}


console.log(raj.cookDish());
console.log(raj.runsBusiness());

