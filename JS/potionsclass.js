// hente api

let hpCharacters = [];

const getCharcters = async () => {
  const data = await fetch("https://hp-api.herokuapp.com/api/characters");
  hpCharacters = await data.json();

  console.log(hpCharacters);
  getSeverus();
};

function getSeverus() {
  let professor = hpCharacters.filter(function (data) {
    return data.name == "Severus Snape";
  });
  displaySeverus(professor);
}

let severusContainer = document.querySelector(".severus-snape-container");
const displaySeverus = (hpCharacters) => {
  const professorCard = hpCharacters.map((severus) => {
    let placeholder = severus.image;
    let name = severus.name;
    let age = severus.yearOfBirth;
    let wandInfo = severus.wand.wood;
    return `<div class="severus-text-container">
    <h2> Professor ${name} </h2>
    <p class="severus-age"> Age: ${calculateAge(age)} </p>
    <p class="wand-info"> Wand: ${wandInfo} </p>
    <div class="button-container">
    <button class="start-btn">Start teaching</button>
    </div>
    <img src="${placeholder}" class="severus-img"/>
    </div>`;
  });
  severusContainer.innerHTML = professorCard;
};

getCharcters();

function calculateAge(age) {
  return 2022 - age;
}

// Severus snape

//students
// console.log(hpCharacters);
// getStudents();

// Severus snape

//students
let students;
//display students
function getStudents() {
  students = hpCharacters.filter(function (data) {
    return data.hogwartsStudent == true;
  });
  console.log(studentsArray);
  getRandomStudents(students);
}

function getRandomStudents(students) {
  let randomStudents = Math.floor(Math.random() * students.length);
  return randomStudents;
}

let displayStudents = document.querySelector(".start-btn");

let studentsContainer = document.querySelector(".students-container");

displayStudents.addEventlistner("click", (students) => {
  let placeholder = students.image;
  let name = students.name;
  let age = students.yearOfBirth;
  return `<div class="student-card>
  <h2 class="student-name"> ${name}</h2>
  <p class="student-age"> ${age} </p>
  <img class="student-img" ${placeholder} />
  </div>"`;
});

getCharcters();
