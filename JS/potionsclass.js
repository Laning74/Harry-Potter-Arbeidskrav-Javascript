let hpCharacters = [];

// The function for fetching the API
const getCharcters = async () => {
  const data = await fetch("https://hp-api.herokuapp.com/api/characters");
  hpCharacters = await data.json();

  // console.log(hpCharacters);
  getSeverus();
  getStudents();
};

// The function for getting professor Severus Snape from the API
function getSeverus() {
  let professor = hpCharacters.filter(function (data) {
    return data.name == "Severus Snape";
  });
  displaySeverus(professor);
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
    <button id="start-btn" onclick="startTeaching()">Start teaching</button>
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

let studentsList = document.querySelector(".students-list");
// funsjonen som skal starte klassen

let showStudents = document.querySelector(".students-container");
// showStudents.style.display = "none";

// Random farge funksjon
const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  document.getElementById("student-card").style.backgroundColor =
    "#" + randomColor;
};

let startTeaching = document.getElementById("start-teaching");
startTeaching.addEventListener("click", setBg, () => {
  showStudents.style.display = "block";
  getStudents();
});

// getStudents();

let students = [];
function getStudents() {
  students = hpCharacters.filter(function (data) {
    return data.hogwartsStudent == true;
  });
  getRandomStudents(students, 10);
}

const getRandomStudents = (students, tenStudents) => {
  let randomTen = [];
  for (let i = 0; i < tenStudents; i++) {
    randomTen.push(students[Math.floor(Math.random() * students.length)]);
    const studentsInfo = randomTen.map((student) => {
      let name = student.name;
      let placeholder = student.image;
      if (placeholder == "") {
        placeholder = "./images/default-image.png";
      }
      let house = student.house;
      return `<li>
      <div id="student-card">
      <div class="student-info">
      <h2 class="student-name">Name: ${name}</h2>
      <p class="student-house">House: ${house} </p>
      <button class="delete-student-btn" onclick="deleteStudent()">Delete Student</button>
      </div>
    <img src="${placeholder}" class="students-image"/></
    div>
    </li>`;
    });
    studentsList.innerHTML = studentsInfo;
  }
  return randomTen;
};

// function startTeaching() {
//   if (showStudents.style.display === "none") {
//     showStudents.style.display = "block";
//   } else {
//     showStudents.style.display = "none";
//   }
// }

// function getRandomColor() {
//   let letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//     document.querySelector(".student-card").style.backgroundColor = color;
//   }
// }

getCharcters();
