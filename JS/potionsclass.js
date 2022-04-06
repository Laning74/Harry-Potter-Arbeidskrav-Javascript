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
  console.log(hpCharacters);
}

// The function for displaying professor Severus Snape
let severusContainer = document.querySelector(".severus-snape-container");
let severusInfoContainer = document.createElement("div");
severusInfoContainer.classList.add("severus-info-container");
let severusName = document.createElement("h2");
let severusAge = document.createElement("p");
let severusWand = document.createElement("p");
let btnContainer = document.createElement("div");
btnContainer.classList.add("btn-container");
let startBtn = document.createElement("button");
btnContainer.append(startBtn);
let severusImage = document.createElement("img");
severusName.classList.add("severus-name");
severusAge.classList.add("severus-age");
severusWand.classList.add("severus-wand");
severusImage.classList.add("severus-img");
startBtn.classList.add("start-btn");
severusContainer.append(severusInfoContainer);
severusInfoContainer.append(
  severusName,
  severusAge,
  severusWand,
  severusImage,
  btnContainer
);

function displaySeverus(professor) {
  professor.map((severus) => {
    severusName.innerHTML = severus.name;
    severusAge.innerHTML = `Age: ${calculateAge(severus.yearOfBirth)}`;
    severusWand.innerHTML = "Wand: vet ikke enda";
    startBtn.innerHTML = "Start teaching";
    severusImage.src = severus.image;
  });
  // The hover effect on Severus Image
  severusImage.addEventListener("mouseover", () => {
    chatBubbleContainer.style.visibility = "visible";
  });
  severusImage.addEventListener("mouseout", () => {
    chatBubbleContainer.style.visibility = "hidden";
  });
}

// severusContainer.innerHTML = professorCard;
// };

function calculateAge(age) {
  return 2022 - age;
}

// startBtn.style.backgroundColor = "red";

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

let studentsList = document.querySelector(".students-list");
// funsjonen som skal starte klassen

let showStudents = document.querySelector(".students-container");
showStudents.style.display = "none";

// Random farge funksjon

let startTeaching = document.querySelector(".start-teaching");
startTeaching.addEventListener("click", () => {
  showStudents.style.display = "block";
  getStudents();
});

// let startTeaching = document.getElementById("start-teaching");
// startTeaching.addEventListener("click", setBg, () => {
//   showStudents.style.display = "block";
//   getStudents();
// });

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
      <div class="student-card">
      <div class="student-info">
      <h2 class="student-name">${name}</h2>
      <p class="student-house">House: ${house} </p>
      <button class="delete-student-btn" onclick="deleteStudent()">Delete Student</button>
      </div>
    <img src="${placeholder}" class="students-image"/></
    div>
    </li>`;
    });
    studentsList.innerHTML = studentsInfo;
    let studentCard = document.querySelectorAll(".student-card");
    for (let i = 0; i < studentCard.length; i++) {
      const setBg = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        studentCard[i].style.backgroundColor = "#" + randomColor;
      };
      setBg();
    }
  }
  return randomTen;
};
getCharcters();
