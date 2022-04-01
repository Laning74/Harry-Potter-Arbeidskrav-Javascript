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
  }) ;
  console.log(houseMembers);
  displayCharacters(houseMembers); // Vi trengte kun dette for å få ut alt på nettsiden pga funksjonen fra searchbar tror jeg
}


let gryffindorCard = document.querySelector("#gryffindor-btn");

gryffindorCard.addEventListener("click", () => {
  flipCard(gryffindorCard);
  fetchData("Gryffindor");
});
let slytherinCard = document.querySelector("#slytherin-btn");
slytherinCard.addEventListener("click", () => {
  flipCard(slytherinCard);
  fetchData("Slytherin");
});
let hufflepuffCard = document.querySelector("#hufflepuff-btn");
hufflepuffCard.addEventListener("click", () => {
  flipCard(hufflepuffCard);
  fetchData("Hufflepuff");
});
let ravenclawCard = document.querySelector("#ravenclaw-btn");
ravenclawCard.addEventListener("click", () => {
  flipCard(ravenclawCard);
  fetchData("Ravenclaw");
});
function flipCard(card) {
  card.classList.toggle("flipCard");
}
