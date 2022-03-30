let charactersList = document.querySelector(".characters-list");
const searchBar = document.querySelector(".searchbar");
// const searchBtn = document.querySelector(".search-btn");
let hpCharacters = [];

// The searchbar function
searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();

  if (e.target.value === "") {
    charactersList.innerHTML = "";
  } else  {
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
const displayCharacters = (characters) => {
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
