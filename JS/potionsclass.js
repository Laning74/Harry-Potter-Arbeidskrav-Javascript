let hpCharacters = [];

// The function for fetching the API
const getCharcters = async () => {
  const data = await fetch("https://hp-api.herokuapp.com/api/characters");
  hpCharacters = await data.json();

  // console.log(hpCharacters);
  getSeverus();
  // getStudents();
};

// The function for getting professor Severus Snape from the API
function getSeverus() {
  let professor = hpCharacters.filter(function (data) {
    return data.name == "Severus Snape";
  });
  displaySeverus(professor);
  console.log(hpCharacters);
}

// The function for displaying professor Severus Snape
let severusContainer = document.querySelector(".severus-snape-container");
const displaySeverus = (hpCharacters) => {
  const professorCard = hpCharacters.map((severus) => {
    var placeholder = severus.image;
    let name = severus.name;
    let age = severus.yearOfBirth;
    // let wandInfo = severus.wand[wand.wood, wand.core, wand.length];
    severus.wand.wood = "Holly";
    severus.wand.core = "Phoenix feather";
    severus.wand.length = "11";
    return `<div class="severus-text-container">
    <h2> Professor ${name} </h2>
    <p class="severus-age"> Age: ${calculateAge(age)} </p>
    <p class="wand-info"> Wand: ${severus.wand.wood} ${severus.wand.core} ${
      severus.wand.length
    } </p>
    <div class="button-container">
    <button class="start-btn">Start teaching</button>
    </div>
    <img src="${placeholder}" class="severus-img"/>
    </div>`;
  });

  severusContainer.innerHTML = professorCard;
};

function calculateAge(age) {
  return 2022 - age;
}

// The mouseover effect
let chatBubbleContainer = document.createElement("div");
let magicSpell = document.createElement("h2");
magicSpell.innerHTML = "Avadakadabra!";
document.body.append(chatBubbleContainer);
chatBubbleContainer.append(magicSpell);

let wrapper = document.querySelector(".wrapper");
wrapper.appendChild(chatBubbleContainer);

chatBubbleContainer.classList.add("magicspell-container");
magicSpell.classList.add("magicspell");

severusContainer.addEventListener("mouseover", () => {
  chatBubbleContainer.style.visibility = "visible";
});
severusContainer.addEventListener("mouseout", () => {
  chatBubbleContainer.style.visibility = "hidden";
});

//students

// let allStudents = [];
//display students
// let startTeachingBtn = document.querySelector(".start-btn");
// startTeachingBtn.addEventListener("click", () => {
//   getStudents();
// });

// console.log(hpCharacters);
// getStudents();

// Severus snape

//students
// let students;
//display students

// function getStudents() {
//   allStudents = hpCharacters.filter(function (data) {
//     return data.hogwartsStudent == true;
//   });

//   const randomStudents = Math.floor(Math.random() * allStudents.length);
//   for (let i = 10; (i = students.length); i++) {
//     return randomStudents;
//   }
//   console.log(allStudents);
// }

// let studentsContainer = document.querySelector(".students-container");

// const displayStudents = (hpCharacters) => {
//   const studentsInfo = hpCharacters.map((student) => {
//     let placeholder = student.image;
//     let name = student.name;
//     let age = student.yearOfBirth;
//     let house = student.house;
//     return `
//     <li>
//     <div class="student-card">

//     <h2 class="student-name">Name: ${name}</h2>
//     <p class="student-age"> Age: ${age} </p>
//      <p class="student-house">House: ${house} </p>
//      <img class="student-img" ${placeholder} />
//  </div>    </li>`;
//   });
//   studentsContainer.innerHTML = studentsInfo;
// };
// getStudents();

getCharcters();
