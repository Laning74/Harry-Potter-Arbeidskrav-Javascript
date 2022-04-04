// hente api

let hpCharacters = [];

const getCharcters = async () => {
  const data = await fetch("https://hp-api.herokuapp.com/api/characters");
  hpCharacters = await data.json();

  console.log(hpCharacters);
  getSeverus();
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

getCharcters();

function calculateAge(age) {
  return 2022 - age;
}

// Severus snape

//students
