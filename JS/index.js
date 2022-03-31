// Fetch Api
let url = "http://hp-api.herokuapp.com/api/characters";

import { displayCharacters } from "./yearbook-searchbar.js"; // La også inn dette

// let charactersList = document.querySelector(".characters-list"); // og dette
// Trengte ikke denne heller, men velger å ikke fjerne enda :)

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
