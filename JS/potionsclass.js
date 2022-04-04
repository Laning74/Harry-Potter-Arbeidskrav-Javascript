// hente api

let hpCharacters = [];

const getCharcters = async () => {
  const data = await fetch("https://hp-api.herokuapp.com/api/characters");
  hpCharacters = await data.json();

  // console.log(hpCharacters);
  getSeverus();
  getStudents();
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
    let wandInfo = severus.wand.core.length.wood;
    return `<div class="severus-text-container">
    <h2> ${name} </h2>
    <p class="severus-age"> Age: ${calculateAge(age)} </p>
    <p class="wand-info"> Wand: ${wandInfo}</p>
    <button class="start-btn">Start teaching</button>
    </div>
    <div class="severus-image-container">
    <img src="${placeholder}" class="severus-img"/>
    </div>`;
  });
  severusContainer.innerHTML = professorCard;
};

function calculateAge(age) {
  return 2022 - age;
}

//students
let allStudents = [];
//display students
let startTeachingBtn = document.querySelector(".start-btn");
startTeachingBtn.addEventListener("click", () => {
  getStudents();
});

function getStudents() {
  allStudents = hpCharacters.filter(function (data) {
    return data.hogwartsStudent == true;
  });

  const randomStudents = Math.floor(Math.random() * students.length);
  for (let i = 10; (i = students.length); i++) {
    return randomStudents;
  }
  console.log(students);
}

let studentsContainer = document.querySelector(".students-container");

const displayStudents = (hpCharacters) => {
  const studentsInfo = hpCharacters.map((student) => {
    let placeholder = student.image;
    let name = student.name;
    let age = student.yearOfBirth;
    let house = student.house;
    return `
    <li>
    <div class="student-card">
    
    <h2 class="student-name">Name: ${name}</h2>
    <p class="student-age"> Age: ${age} </p>
     <p class="student-house">House: ${house} </p>
     <img class="student-img" ${placeholder} />
 </div>    </li>`;
  });
  studentsContainer.innerHTML = studentsInfo;
};
getStudents();

getCharcters();
