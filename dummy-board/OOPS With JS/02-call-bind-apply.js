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


function reportDelivery(location, status){
    return `${this.name} delivers to ${location}: ${status} `
}

const deliveryBoy = {name: "Ranveer"}
console.log("Call: ",reportDelivery.call(deliveryBoy, "Lyari", "Ordered"));
console.log("Apply: ",reportDelivery.apply(deliveryBoy, ["Mars", "Completed"]));
console.log("Bind: ",reportDelivery.bind(deliveryBoy, "Lyari", "Ordered"));

const bindRep = reportDelivery.bind(deliveryBoy)
console.log(bindRep("Delhi", "Pick-Up"));


