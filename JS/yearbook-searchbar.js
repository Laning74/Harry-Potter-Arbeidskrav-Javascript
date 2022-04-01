// Her begynner create new student funksjonene
let createStudentContainer = document.querySelector(
  ".create-student-container"
);
//Skjul container
createStudentContainer.style.display = "none";

// Vis div - New student button
const showCreateStudent = document.querySelector(".create-student-btn");
showCreateStudent.addEventListener("click", () => {
  createStudentContainer.style.display = "block";
});

// Skjul div - exit button
let createExitBtn = document.querySelector(".exit-btn");
createExitBtn.addEventListener("click", () => {
  createStudentContainer.style.display = "none";
});

let saveStudentBtn = document.querySelector(".save-student-btn");
// const newStudentArray = [];

saveStudentBtn.addEventListener("click", () => {
  let src = "./images/default-image.png";
  let studentName = document.querySelector(".create-name-input").value;
  let houseName = document.querySelector(".create-house-input").value;
  let studentAge = document.querySelector(".create-age-input").value;
  let studentAlive = document.querySelector(".create-alive-input").value;

  // console.log(newStudentArray);
  // Lager error melding hvis input ikke er utfylt
  if (studentName == "") {
    alert("Name is required");
    // newStudentArray.splice(-1);
  } else if (houseName == "") {
    alert("House is required");
    // newStudentArray.splice(-1);
  } else if (studentAge == "") {
    alert("Age is required");
    // newStudentArray.splice(-1);
  } else if (studentAlive == "") {
    alert("Dead or Alive is required");
    // newStudentArray.splice(-1);
  } else {
    hpCharacters.push({
      image: src,
      name: studentName,
      house: houseName,
      age: studentAge,
      alive: studentAlive,
    });
  }
  charactersList.innerHTML = hpCharacters;
  addNewStudent();
});

// let studentList = document.querySelector(".student-list");

//function som adder elever til liste
function addNewStudent() {
  charactersList.innerHTML = "";

  filterNewStudent(hpCharacters, "Gryffindor");
  filterNewStudent(hpCharacters, "Slytherin");
  filterNewStudent(hpCharacters, "Ravenclaw");
  filterNewStudent(hpCharacters, "Huffelpuff");

  function filterNewStudent(array, house) {
    let filterStudentArray = array.filter(function (curr) {
      displayCharacters(filterStudentArray);
      return curr.house === house;
    });

    for (i = 0; i < filterStudentArray.length; i++) {
      charactersList.innerHTML += displayCharacters(filterStudentArray);
      `<li class="character">
           <h2>${filterStudentArray[i].name}</h2>
           <p class="character-status">Status: ${filterStudentArray[i].alive}</p>
           <p class="character-age">Age: Uknown</p>
           <p class="character-house">House: ${filterStudentArray[i].house}</p>
           <img src="${placeholder}" class="character-image" />
         </li>`;
      // `<li>
      //   <img src = "./images/default-image.png" class="default-student-img" />
      //  <p>${filterStudentArray[i].name}</p>
      //  <p>${filterStudentArray[i].house}</p>
      //  <p>${filterStudentArray[i].age}</p>
      //  <p>${filterStudentArray[i].alive}</p>
      // </li>`;
    }

    // console.log(filterStudentArray);
  }
  // console.log(filterStudentArray);
}

let charactersList = document.querySelector(".characters-list");
const searchBar = document.querySelector(".searchbar");
// const searchBtn = document.querySelector(".search-btn");
export let hpCharacters = [];

// The searchbar function
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

// Getting the characters from the API
const loadCharacters = async () => {
  try {
    const res = await fetch("https://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
  } catch (err) {
    console.error(err);
  }
};

// Display all characters with name, age, status and image
export const displayCharacters = (characters) => {
  // La til en export her
  const htmlString = characters
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

// Getting the age for all characters
function calculateAge(age) {
  return 2022 - age;
}

loadCharacters();

//   Harpreet
function fetchData(houseName) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderData(data, houseName);
    });
}
let houseMembers;
function renderData(data, houseName) {
  houseMembers = data.filter(function (data) {
    return data.house == houseName;
  });
  console.log(houseMembers);
  displayCharacters(houseMembers); // Vi trengte kun dette for å få ut alt på nettsiden pga funksjonen fra searchbar tror jeg
}
// charactersList.innerHTML = houseMembers; // La til denne også, men ser ikke ut som vi trenger den..
document.querySelector("#gryffindor-btn").onclick = () => {
  fetchData("Gryffindor");
};
document.querySelector("#slytherin-btn").onclick = () => {
  fetchData("Slytherin");
};
document.querySelector("#hufflepuff-btn").onclick = () => {
  fetchData("Hufflepuff");
};
document.querySelector("#ravenclaw-btn").onclick = () => {
  fetchData("Ravenclaw");
};

let card = document.querySelector(".card");

card.addEventListener("click", flipCard);

function flipCard() {
  card.classList.toggle("flipCard");
}


