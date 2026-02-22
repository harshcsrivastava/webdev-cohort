const aadhar_of_me = Symbol("aadhar");
const aadhar_of_p = Symbol("aadhar");

console.log(typeof aadhar_of_me); //symbol
console.log(aadhar_of_me === aadhar_of_p); //false
console.log(aadhar_of_me.toString()); //Symbol(aadhar)
console.log(aadhar_of_me.description); //aadhar

const nonIndian = Symbol();
console.log(nonIndian.description); //undefined

const biometricHash = Symbol("biometricHash");
const bloodGroup = Symbol("bloodGroup");

const citizenRecord = {
  name: "HCS",
  age: 21,
  // meant to hide, and add special properties
  [biometricHash]: "deuj2hn2njw",
  [bloodGroup]: "O+",
};

console.log(Object.keys(citizenRecord)); //[ 'name', 'age' ], symbols are not displayed in keys
console.log(Object.getOwnPropertySymbols(citizenRecord)); //[ Symbol(biometricHash), Symbol(bloodGroup) ]

const rtiQuery = {
  queries: ["Infra budget", "Ration Card", "Education budget", "Startup Laws"],
  [Symbol.iterator]() {
    let index = 0;
    const queries = this.queries;
    return {
        next(){
            if(index < queries.length){
                return {value: queries[index++], done: false}
            }
            return {value: undefined, done: true}
        }
    };
  },
};


for (const query of rtiQuery) {
console.log(`Filing RTI: ${query}`);
}

const governmentSchme = { 
    name: "PM KISSAN Yojna",
    people : 54,
    // [](){}
    [Symbol.toPrimitive](hint){
        if(hint === 'string') return this.name
        if(hint === 'number') return 88
    }

}

console.log(+governmentSchme); // when number
console.log(`${governmentSchme}`); //when string


