// Call and apply => Basic Chef, returns a result
// bind => return a new function
// they overwrite the this method

function cookDish(ingrediants, dish){
    return `${this.name} use ${ingrediants} to cook ${dish} `
}

const sharmaJiKitchen = {name: "Sharma Ji"}

console.log(cookDish.call(sharmaJiKitchen, "Panner, MDH Masala", "Mughlai"));

// apply(one of parameter is ARRAY)

const secretOrder = ["Garam Masala", "Chole Bhature"]
const dhuvKaKitchen = {name: "Dhruv Ji"}

console.log(cookDish.apply(dhuvKaKitchen, secretOrder));

const bills = [100,4,30,45]
Math.max.apply(null, bills)
Math.max(...bills)



