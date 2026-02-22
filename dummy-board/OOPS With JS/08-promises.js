//  YE SAB HISTORY HAI
// ye function create ho rhe
/*
function prepareDish(dish, callback) {
  // setTimeout -> given time ke baad code execute krdega
  // callback me sabse pahle error handle krte hai, yaha nhi karna to null likh diya
  setTimeout(() => callback(null, { dish, status: "Prepared" }), 100);
}

function pickedUpDish(order, callback) {
  setTimeout(() => callback(null, { ...order, status: "Picked-Up" }), 100);
}

function deliverOrder(order, callback) {
  setTimeout(() => callback(null, { ...order, status: "delivered" }), 100);
}

// ye consume ho rhe function
prepareDish("Biryani", (err, order) => {
  if (err) return console.log(err);
  pickedUpDish(order, (err, order) => {
    if (err) return console.log(err);
    deliverOrder(order, (err, order) => {
      if (err) return console.log(err);
      console.log(`${order.dish}: ${order.status}`);
    });
  });
});
*/

// PROMISES state: pending, fulfilled, & rejected
// Promise ke 2 part: resolve & reject
function prepareOrder(dish){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!dish){
                reject(new Error("No dish is there"))
                return
            }
            console.log(`${dish} is ready`);
            resolve({dish, status: "prepared"})
        },100)
    })
}

function pickupOrder(order){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!order){
                reject(new Error("No order is there"))
                return
            }
            console.log(`${order} is ready`);
            resolve({...order, status: "picked"})
        },100)
    })
}


function deliverOrder(order){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!order){
                reject(new Error("No order is there"))
                return
            }
            console.log(`${order} is ready`);
            resolve({...order, status: "delivered"})
        },100)
    })
}

prepareOrder("Pizza")
  .then(order => pickupOrder(order))
  .then(order => deliverOrder(order))
  .then(finalOrder => {
    console.log("Final status:", finalOrder);
  })
  .catch(err => {
    console.error("Error:", err.message);
  });