"use strict";
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

let studentsArray = [];
function filterStudents() {
  let studentsArray = hpCharacters.filter(
    (student) => student.hogwartsStudent == true
  );
  studentsArray.pop();
  // studentsArray.push((student) => {
  //   student.name;
  //   student.house;
  //   student.image;
  // });
  getTenStudent(studentsArray);
  // console.log("students arry etter push: ", studentsArray);
}
// ********* Funksjonen som henter 10 studenter*********
function getTenStudent(studentsArray) {
  let randomArray = [];
  for (let i = 0; i < 10; i++) {
    let randomNumber = Math.floor(Math.random() * studentsArray.length);
    randomArray.push(studentsArray[randomNumber]);
  }
  console.log("get 10 students", randomArray);
  console.log("get all students", studentsArray);
  showStudents(randomArray, studentsArray);
}

let defaultImgMale = [
  "./images/harry-potter-sexy.jpg",
  "./images/harry-potter-sexy2.jpg",
  "./images/harry-potter-sexy4.jpg",
  "./images/harry-potter-sexy5.jpg",
];

let defaultImgFemale = ["./images/harpreet.jpg", "./images/martine.jpg"];

let studentContainer = document.querySelector(".students-list");
function showStudents(array, studentsArray) {
  studentContainer.innerHTML = "";
  // console.log("show 10 students", array);

  for (let i = 0; i < array.length; i++) {
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-student-btn");
    deleteBtn.innerText = "Delete student";
    deleteBtn.addEventListener("click", () => {
      deleteStudent(i, array, studentsArray);
    });
    let studentCard = document.createElement("div");
    studentCard.classList.add("student-card");
    let studenInfo = document.createElement("div");
    studenInfo.classList.add("student-info");
    let studentText = document.createElement("div");
    studentText.classList.add("student-txt");
    let studentName = document.createElement("h2");
    studentName.innerText = array[i].name;
    studentName.classList.add("student-name");
    let studentHouse = document.createElement("p");
    studentHouse.innerText = "House: " + array[i].house;
    studentHouse.classList.add("student-house");
    let studentPlaceholder = document.createElement("img");
    studentPlaceholder.classList.add("students-image");
    studentPlaceholder.src = array[i].image;
    if (array[i].image == "" && array[i].gender == "male") {
      studentPlaceholder.src =
        defaultImgMale[Math.floor(Math.random() * defaultImgMale.length)];
    }
    if (array[i].image == "" && array[i].gender == "female") {
      studentPlaceholder.src =
        defaultImgFemale[Math.floor(Math.random() * defaultImgFemale.length)];
    }
    if (array[i].house == "Gryffindor") {
      studentHouse.style.color = "#ce373d";
    }
    if (array[i].house == "Slytherin") {
      studentHouse.style.color = "#377f6a";
    }
    if (array[i].house == "Hufflepuff") {
      studentHouse.style.color = "#e6a038";
    }
    if (array[i].house == "Ravenclaw") {
      studentHouse.style.color = "#445393";
    }
    if (array[i].house == "") {
      studentHouse.innerHTML = "house: unknown";
    }
    studentContainer.append(studentCard);
    studentCard.append(studenInfo, studentPlaceholder);
    studenInfo.append(studentText, deleteBtn);
    studentText.append(studentName, studentHouse);
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
function deleteStudent(i, array, studentsArray) {
  let userAnswear = prompt(
    "Do you want to delete this student from class? yes/no"
  );
  //
  if (userAnswear == "yes") {
    array.splice(i, 1);
    array.push(studentsArray[Math.floor(Math.random() * studentsArray.length)]);
  } else {
    alert("Go back to class!");
    array.splice(0, 0);
  }
  showStudents(array);
  console.log("array:", array);
  console.log("studentsarray:", studentsArray);
}

getCharacters();
