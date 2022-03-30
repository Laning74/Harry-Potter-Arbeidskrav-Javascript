// Fetch Api
let url = "http://hp-api.herokuapp.com/api/characters";

import { displayCharacters } from "./yearbook-searchbar.js"; // La også inn dette

let houseMemberList = document.querySelector(".house-members"); // og dette

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
  displayCharacters(houseMembers); // La til dette for å få ut studentene når man trykker på kortene, må ordne med plassering, så de kommer under house cards, og endret styling
  return `<li class="character">    
        <h2>${character.name}</h2>
        <p class ="character-status">Status: ${characterStatus}</p> 
        <p class="character-age">Age: ${calculateAge(age)}</p>
        <p class="character-house">House: ${hogwartsHouse}</p>
        <img src="${placeholder}" class="character-image"/>
        </li>
        `;
}
houseMemberList.innerHTML = houseMembers; // La til denne også
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
