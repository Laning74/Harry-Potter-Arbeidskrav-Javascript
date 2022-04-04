// hente api

let hpCharacters = [];

const getCharcters = async () => {
  const data = await fetch("https://hp-api.herokuapp.com/api/characters");
  hpCharacters = await data.json();

  console.log(hpCharacters);
};

getCharcters();

// Severus snape

//students
