let hpCharacters = [];

//****** Funksjonen som henter API'en******
const getCharacters = async () => {
  const data = await fetch("https://hp-api.herokuapp.com/api/characters");
  hpCharacters = await data.json();

  getSeverus();
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

// ******funsjonen som skal starte klassen*******

let studentsContainer = document.querySelector(".students-container");
studentsContainer.style.display = "none";

startBtn.addEventListener("click", () => {
  studentsContainer.style.display = "block";
  filterStudents();
});

function filterStudents() {
  let studentsArray = hpCharacters.filter(
    (student) => student.hogwartsStudent == true
  );
  console.log(studentsArray);
  getTenStudent(studentsArray);
}

function getTenStudent(array) {
  let randomArray = [];

  for (let i = 0; i < 10; i++) {
    let randomNumber = Math.floor(Math.random() * array.length);
    randomArray.push(array[randomNumber]);
  }
  console.log("get 10 students", randomArray);
  showStudents(randomArray);
}

let studentContainer = document.querySelector(".students-list");
function showStudents(array) {
  let studentPlaceholder = document.createElement("img");

  studentContainer.innerHTML = "";
  console.log("show 10 students", array);

  for (let i = 0; i < array.length; i++) {
    studentPlaceholder = "./images/default-image.png";
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete student";
    deleteBtn.addEventListener("click", () => {
      deleteStudent(i, array);
      // alert("Hei");
    });
    let studentCard = document.createElement("div");
    let studenInfo = document.createElement("div");
    let studentName = document.createElement("h1");
    studentName.innerText = array[i].name;
    let studentHouse = document.createElement("p");
    studentHouse.innerText = array[i].house;

    studentContainer.append(studentCard);
    studentCard.append(studenInfo);
    studenInfo.append(studentName, studentHouse, deleteBtn);
    // studentContainer.innerHTML += studentInfo;
  }

  // **********Farge generator funksjonen *********
  let studentCard = document.querySelectorAll(".student-card");
  for (let i = 0; i < studentCard.length; i++) {
    const setBg = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      studentCard[i].style.backgroundColor = "#" + randomColor;
    };
    setBg();
  }
}

// *********delete student funksjon **************
function deleteStudent(i, array) {
  let userAnswear = prompt(
    "Do you want to delete this student from class? yes/no"
  );
  if (userAnswear == "yes") {
    array.splice(i, 1) && array.push(array[1]);
    // studentsContainer = "";
    console.log(array);
  } else {
    alert("Go back to class!");
  }
  showStudents(array);
}

getCharacters();
