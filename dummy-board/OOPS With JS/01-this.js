console.log(this);

function ranveerOnGlobal() {
  return typeof this;
}
// console.log(ranveerOnGlobal());

function ranveerWithNoScript() {
  // "use strict" or without
  // "use strict" --> results in undefined
  return this;
}

// console.log(ranveerWithNoScript());

const bollywoodFilm = {
  name: "Bajirao Mastani",
  lead: "Ranveer",

  introduce() {
    return `${this.name} features ${this.lead}`;
  },
};

// console.log(bollywoodFilm.introduce());

const filmDirector = {
  name: "Sanjay Leela Bansali",
  cast: ["Ranveer", "Prabhas", "Shradha Kapoor"],
  announceCast() {
    this.cast.forEach((actor) => {
      //arrow function pe to lekin this hota nhi hai lekin
      //because ye forEach hai

      console.log(`${this.name} introduces ${actor}`);
    });
  },
};

// console.log(filmDirector.announceCast());


