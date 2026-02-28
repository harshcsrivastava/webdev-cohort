/**
 * By Default promise pending me hota
 * Take two params -> resolve & reject
 * setTimeout -> delay introduce krta hai
 *
 * ek code turant chlta, ek time leke krta
 * to how do you decide kaise baad me kre, we can use setTimeout(, 3000)
 * lekin kab tk aise krenge, pata thori sarver kab krega return
 *
 * therefore we will use .then() to consume
 *
 * Reject is designed to pass on the error
 *
 * You can return value from catch as well, and consume it with then
 */

const promise = new Promise((res, rej) => {
  setTimeout(() => {
    res("ChaiCode");
    rej(new Error("Error in Chaicode"));
  }, 2000);
});
// console.log(promise);

// setTimeout(() => {
//     console.log(promise);
// }, 3100)

// promise.then((val) => {
//     console.log(val);
// })

// promise.then(console.log); // works similary as above
// similar to passing a function with value

// promise.then((val) => console.log(val)).catch((err) => console.log(err));

//If resolve aur reject dono ajate
// .then() value hamesha forward pass krega

const turant = Promise.resolve("turant"); //without new keyword, executed turant
// console.log(turant);

//any - ek bhi resolve hogya
const allPromise = Promise.any([
  Promise.resolve("Chai"),
  Promise.resolve("Code"),
  Promise.reject("Errorr"),
]);

const allPromiseAll = Promise.all([
  Promise.resolve("Chai"),
  Promise.resolve("Code"),
  // Promise.reject("Errorr")
]);

const allSettled = Promise.allSettled([
  Promise.resolve("Chai"),
  Promise.resolve("Code"),
  Promise.reject("Errorr"),
]);

// allPromiseAll.then((data) => {
//   console.log(data);
// });

// allSettled.then(console.log);
// Explore all the methods of Promise, explain with examples and kahani to simplify


const hPromise = new Promise((res, rej) => {
    setTimeout(() => res("Chaii"), 2000)
})

async function nice() {
    try {
        const val = await hPromise
        // new add on
        console.log(val);
    } catch (error) {
        console.log("Error agya Ji", error.message);
        
    }
    
}
// nice()

console.log("Swastik")

Promise.resolve("Resolved Value").then((v) => {
    console.log("MicroTask ", v);
    
})

console.log("Aviation");

