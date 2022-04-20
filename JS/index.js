//fetching api and storing tha data in array locally
let hpCharacters = [];
const loadCharacters = async () => {
  try {
    const res = await fetch("https://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
    console.log(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};
//function for searching hp characters /searchbar
const searchBar = document.querySelector(".searchbar");
let charactersList = document.querySelector(".characters-list");
searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  if (e.target.value === "") {
    charactersList.innerHTML = "";
  } else {
    let filteredCharacters = hpCharacters.filter((character) => {
      return character.name.toLowerCase().includes(searchString);
    });
    displayCharacters(filteredCharacters);
  }
});
//function to display the hpcharacters by searchbar or students by house cards
let defaultImgMale = [
  "./images/harry-potter-sexy.jpg",
  "./images/harry-potter-sexy.jpg",
  "./images/harry-potter-sexy.jpg",
  "./images/harry-potter-sexy3.jpg",
  "./images/harry-potter-sexy2.jpg",
  "./images/harry-potter-sexy4.jpg",
  "./images/harry-potter-sexy5.jpg",
];

let defaultImgFemale = [
  "./images/harpreet.jpg",
  "./images/martine.jpg",
  "./images/renna.png",
  "./images/Ingvild.jpg",
];

const displayCharacters = (hpCharacters) => {
  const htmlString = hpCharacters
    .map((character) => {
      let age = character.yearOfBirth;
      let placeholder = character.image;
      if (character.image === "" && character.gender === "male") {
        placeholder =
          defaultImgMale[Math.floor(Math.random() * defaultImgMale.length)];
      }
      if (character.image == "" && character.gender == "female") {
        placeholder =
          defaultImgFemale[Math.floor(Math.random() * defaultImgFemale.length)];
      }
      let hogwartsHouse = character.house;
      if (character.house === "") {
        hogwartsHouse = "Not in a house";
      }
      let characterStatus = character.alive;
      if (character.alive === false) {
        characterStatus = "Is dead";
        return `<li class=" character ${hogwartsHouse} ">
        <div class="info-container">
      <h2>${character.name}</h2>
      <p class="character-house">House: ${hogwartsHouse}</p>
      <p class ="character-status-dead">Status: ${characterStatus}</p> 
      </div>
      <div class="image-container">
      <img src="${placeholder}" class="character-image"/>
      </div>
      </li>
      `;
      }
      if (age === "") {
        characterStatus = `Is alive`;
        return `
        <li class="character ${hogwartsHouse}">
        <div class="info-container">
        <h2>${character.name}</h2>
        <p class ="character-status">Status: ${characterStatus}</p> 
        <p class="character-age">Age: Unknown</p>
        <p class="character-house">House: ${hogwartsHouse}</p>
        </div>
        <div class="image-container">
        <img src="${placeholder}" class="character-image"/>
        </div>
        </li>
        `;
      } else {
        characterStatus = `Is alive`;
        return `
        <li class="character ${hogwartsHouse}">
        <div class="info-container">

        <h2>${character.name}</h2>
        <p class ="character-status">Status: ${characterStatus}</p> 
         <p class="character-age">Age: ${calculateAge(age)}</p>
        <p class="character-house">House: ${hogwartsHouse}</p>
        </div>
        <div class="image-container">

        <img src="${placeholder}" class="character-image"/>
        </div>
        </li>
        `;
      }
    })
    .join("");
  charactersList.innerHTML = htmlString;
};
function calculateAge(age) {
  return 2022 - age;
}

loadCharacters();

let gryffindorCard = document.querySelector("#gryffindor-btn");
gryffindorCard.addEventListener("click", () => {
  renderData("Gryffindor");
  flipCard(gryffindorCard);
});
let slytherinCard = document.querySelector("#slytherin-btn");
slytherinCard.addEventListener("click", () => {
  renderData("Slytherin");
  flipCard(slytherinCard);
});
let hufflepuffCard = document.querySelector("#hufflepuff-btn");
hufflepuffCard.addEventListener("click", () => {
  renderData("Hufflepuff");
  flipCard(hufflepuffCard);
});
let ravenclawCard = document.querySelector("#ravenclaw-btn");
ravenclawCard.addEventListener("click", () => {
  renderData("Ravenclaw");
  flipCard(ravenclawCard);
});
function flipCard(card) {
  card.classList.toggle("flipCard");
}
function renderData(houseName) {
  houseMembers = hpCharacters.filter(function (data) {
    return data.house == houseName;
  });
  displayCharacters(houseMembers);
}
// container for creating new students
let createStudentContainer = document.querySelector(
  ".create-student-container"
);
//hiding the create student form
createStudentContainer.style.display = "none";

// show create new student form on button click
const showCreateStudent = document.querySelector(".create-student-btn");
showCreateStudent.addEventListener("click", () => {
  createStudentContainer.style.display = "block";
});
// hide the form on exit button click
let createExitBtn = document.querySelector(".exit-btn");
createExitBtn.addEventListener("click", () => {
  createStudentContainer.style.display = "none";
});
//saving the new students in the students list

let saveStudentBtn = document.querySelector(".save-student-btn");
saveStudentBtn.addEventListener("click", () => {
  let src = "./images/default-image.png";
  let studentName = document.querySelector(".create-name-input").value;
  let studentAge = document.querySelector(".create-age-input").value;
  let selectedHouse = document.querySelector("#selection").value;
  // Error handling for empty input fields
  if (studentName == "" || studentAge == "") {
    alert("Type in both Name and year of birth");
  } else if (selectedHouse === "none") {
    alert("Select a house");
  } else if (isNaN(studentAge)) {
    alert("Type in Year of Birth in numbers (yyyy)");
  } else {
    selectedHouse = document.querySelector("#selection").value;
    hpCharacters.push({
      image: src,
      name: studentName,
      house: selectedHouse,
      yearOfBirth: studentAge,
    });
    document.querySelector(".create-name-input").value = "";
    document.querySelector(".create-age-input").value = "";
  }

  // charactersList.innerHTML = hpCharacters;

  renderData(selectedHouse);
});
//trenger ikke denne funksjonen egentlig for vi kan bruke det samme filter funksjonen her i.e renderData()
// function addNewStudent() {
//   charactersList.innerHTML = "";

//   filterNewStudent(hpCharacters, "Gryffindor");
//   filterNewStudent(hpCharacters, "Slytherin");
//   filterNewStudent(hpCharacters, "Ravenclaw");
//   filterNewStudent(hpCharacters, "Huffelpuff");

//   function filterNewStudent(array, house) {
//     let filterStudentArray = array.filter(function (curr) {
//       displayCharacters(filterStudentArray);
//       return curr.house === house;
//     });

//     let placeholder = "./images/defaultimage.png";

//     for (let i = 0; i < filterStudentArray.length; i++) {
//       charactersList.innerHTML += displayCharacters(filterStudentArray);
//       `<li class="character">
//            <h2>${filterStudentArray[i].name}</h2>
//            <p class="character-status">Status: ${filterStudentArray[i].alive}</p>
//            <p class="character-age">Age: Uknown</p>
//            <p class="character-house">House: ${filterStudentArray[i].house}</p>
//            <img src="${placeholder}" class="character-image" />
//          </li>`;
//     }
//   }
// }
