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
const displayCharacters = (hpCharacters) => {
  const htmlString = hpCharacters
    .map((character) => {
      let age = character.yearOfBirth;
      let placeholder = character.image;
      if (character.image === "") {
        placeholder = "./images/defaultimage.png";
      }
      let hogwartsHouse = character.house;
      if (character.house === "") {
        hogwartsHouse = "Not in a house";
      }
      let characterStatus = character.alive;
      if (character.alive === false) {
        characterStatus = "Is dead";
        return `<li class="character">
      <h2>${character.name}</h2>
      <p class ="character-status-dead">Status: ${characterStatus}</p> 
      <p class="character-house">House: ${hogwartsHouse}</p>
      <img src="${placeholder}" class="character-image"/>
      </li>
      `;
      }
      if (age === "") {
        characterStatus = `Is alive`;
        return `
        <li class="character">
        <h2>${character.name}</h2>
        <p class ="character-status">Status: ${characterStatus}</p> 
        <p class="character-age">Age: Uknown</p>
        <p class="character-house">House: ${hogwartsHouse}</p>
        <img src="${placeholder}" class="character-image"/>
        </li>
        `;
      } else {
        characterStatus = `Is alive`;
        return `
        <li class="character">
        <h2>${character.name}</h2>
        <p class ="character-status">Status: ${characterStatus}</p> 
         <p class="character-age">Age: ${calculateAge(age)}</p>
        <p class="character-house">House: ${hogwartsHouse}</p>
        <img src="${placeholder}" class="character-image"/>
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
// Her begynner create new student funksjonene
let createStudentContainer = document.querySelector(
  ".create-student-container"
);
//Skjul container
createStudentContainer.style.display = "none";

// Vis container - create new student button
const showCreateStudent = document.querySelector(".create-student-btn");
showCreateStudent.addEventListener("click", () => {
  createStudentContainer.style.display = "block";
});
// Skjul container - exit button
let createExitBtn = document.querySelector(".exit-btn");
createExitBtn.addEventListener("click", () => {
  createStudentContainer.style.display = "none";
});
//Lagrer new student og pusher til arryet
let saveStudentBtn = document.querySelector(".save-student-btn");

saveStudentBtn.addEventListener("click", () => {
  let src = "./images/default-image.png";
  let studentName = document.querySelector(".create-name-input").value;
  let house = document.querySelector(".create-house-input").value;
  let studentAge = parseInt(document.querySelector(".create-age-input").value);
  let studentAlive = document.querySelector(".create-alive-input").value;

  const capitalizeStudentHouse = house;
  const houseName =
    capitalizeStudentHouse.charAt(0).toUpperCase() +
    capitalizeStudentHouse.slice(1);
  console.log(houseName);

  // Lager error melding hvis input ikke er utfylt
  if (studentName == "") {
    alert("Name is required");
  } else if (houseName == "") {
    alert("House is required");
  } else if (studentAge == "") {
    alert("Age is required");
  } else if (studentAlive == "") {
    alert("Dead or Alive is required");
  } else {
    hpCharacters.push({
      image: src,
      name: studentName,
      house: houseName,
      yearOfBirth: studentAge,
      alive: studentAlive,
    });
  }

  charactersList.innerHTML = hpCharacters;
  // addNewStudent();
  renderData(houseName); //calling this function to filter according to the house name
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
