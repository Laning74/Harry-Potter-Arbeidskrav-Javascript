// hente api

let hpCharacters = [];

const getCharcters = async () => {
  const data = await fetch("https://hp-api.herokuapp.com/api/characters");
  hpCharacters = await data.json();

  // console.log(hpCharacters);
  getStudents();
};

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
