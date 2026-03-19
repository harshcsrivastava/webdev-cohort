/**
 * Types of Event Listener:
 *      Inline
 *      with property Name (.eventName)
 *      Event Listeners
 *
 * addEventListeners()
 */

// const btn = document.getElementById("btn");

// btn.onclick = () => console.log("Hello with .eventName");

// btn.addEventListener("click", () => {
//     console.log("Clicked by event listenr");
// });

const parent = document.getElementById("parent");
const child = document.getElementById("child");
const body = document.body;

// body.addEventListener("click", () => {
//     console.log("Body Clicked");
// }, true);

// parent.addEventListener("click", () => {
//     console.log("Parent Clicked");
// }, true);

// child.addEventListener("click", () => {
//     console.log("Child Clicked");
// }, true);

// body.addEventListener("click", () => {
//     console.log("Body Clicked");
// }, false);


// Element Order(body > parent > child)
// Child Clicked
// main.js:27 Parent Clicked
// main.js:23 Body Clicked
// useCapture = false (DEFAULT : event bubbling)

// useCapture = true
// Body Clicked
// main.js:27 Parent Clicked
// main.js:31 Child Clicked 

// 3 Phases -
// main.js:23 Body Clicked
// main.js:27 Parent Clicked
// main.js:31 Child Clicked
// main.js:35 Body Clicked



// parent.addEventListener("click", () => {
//     console.log("Parent Clicked");
// }, true);

// child.addEventListener("click", () => {
//     console.log("Child Clicked");
// }, false);

// LOG - 1 Capture > 2 target > 3 Bubble
// Parent Clicked
// Child Clicked

// pahle sare capturing vale then next
parent.addEventListener("click", (event) => {
    event.stopPropagation()
    // child tak nhi pahuch payega
    console.log("Parent Clicked");
}, true);

child.addEventListener("click", (event) => {
    event.stopPropagation()
    // agar parent false rehta to uspe bubble nhi hota
    console.log("child");
});

/**
 * e - event has many variable
 * 
 * event.stopPropagation(): event ko age jane nhi dunga
 */

// event delegation - instead of adding multiple listener in child we add single listener on parent
const list = document.getElementById("list")
list.addEventListener("click", (e) => {
    // tagName hamesha capitalize
    if(e.target.tagName === 'LI'){
        console.log(e.target.textContent);
        
    }
})

// closest() -> learn about

const anchor = document.getElementById("link")

anchor.addEventListener('click', (e) => {
    e.preventDefault() //default behavior rok diya
    console.log("log clicked");
    
})

// head to kanban board