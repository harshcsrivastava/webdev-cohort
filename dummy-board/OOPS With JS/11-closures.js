function init() {
  let n = "Mozilla";
  function displayName() {
    console.log(n);
  }
  // displayName() -> normal
  return displayName;
  // return function from line 3-5, but how did it access when it is not accessible
}

/***
 * makeFn holds reference to whole function incase it needs something to refer later, like a tiffinbox / [[SCOPE]]
 */
const makeFn = init();
// makeFn()

function startCompany() {
  function ca(name) {
    return `Name of your company is ${name}`;
  }

  return ca;
}

const getMeAcompany = startCompany();
const myCompanyName = getMeAcompany("Zomato");

function eternal(guest) {
  const guestName = guest;
  let count = 0;
  function zomato() {
    console.log(`Hi ${guestName}, from zomato`);
  }
  function blinkit() {
    if (count == 1) return;
    console.log(`Hi ${guestName}, from blinkit`);
    count++;
  }

  // zomato() -> we never use this
  // blinkit() -> balki we return

  return {
    zomato,
    blinkit,
  };
}

const hitesh = eternal("hitesh");
const harsh = eternal("harsh");

console.log(harsh.blinkit());
console.log(harsh.blinkit());
console.log(harsh.blinkit());

// useMemo => a fn in react which stores a reference if function will not be modified further
