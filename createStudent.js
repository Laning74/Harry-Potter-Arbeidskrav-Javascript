// Lager elmenter til DOM

const createStudentContainer = document.createElement("div");
const createForm = document.createElement("form");
const createNameInput = document.createElement("input");
const createHouseInput = document.createElement("input");
const createAgeInput = document.createElement("input");
const createAliveInput = document.createElement("input");
const saveStudentBtn = document.createElement("button");
const createExitBtn = document.createElement("button");

createStudentContainer.classList.add("create-student-container");
// Legger til elemnter i DOM
document.body.append(createStudentContainer);
createStudentContainer.append(createExitBtn, createForm);
createForm.append(
  createNameInput,
  createHouseInput,
  createAgeInput,
  createAliveInput,
  saveStudentBtn
);

// Classes added til input feltene
createNameInput.classList.add("create-name-input");
createHouseInput.classList.add("create-house-input");
createAgeInput.classList.add("create-age-input");
createAliveInput.classList.add("create-alive-input");
// Gi verdi til elemnter
//Knapper
saveStudentBtn.innerText = "Save Student🎓";
createExitBtn.innerText = "Exit";
// Placeholder
createNameInput.placeholder = "Name";
createHouseInput.placeholder = "House";
createAgeInput.placeholder = "Age";
createAliveInput.placeholder = "Dead or Alive";
//Skjul container
createStudentContainer.style.display = "none";

// Vis div med input elementer til lag ny student - Create Student button
function showCreateStudent() {
  createStudentContainer.style.display = "block";
}
// Skjul div lag ny student - exit button
createExitBtn.addEventListener("click", () => {
  createStudentContainer.style.display = "none";
});

// Legg ny student til dom
const newStudentContainer = document.createElement("div");
const defaultStudentImg = document.createElement("img");
const displayStudentName = document.createElement("h3");
const displayHouseName = document.createElement("p");
const displayStudentAge = document.createElement("p");
const displayStudentAlive = document.createElement("p");
document.body.append(newStudentContainer);
defaultStudentImg.classList.add("default-student-img");

saveStudentBtn.addEventListener("click", () => {
  let studentName = document.querySelector(".create-name-input").value;
  let houseName = document.querySelector(".create-house-input").value;
  let studentAge = document.querySelector(".create-age-input").value;
  let studentAlive = document.querySelector(".create-alive-input").value;

  newStudentContainer.append(
    defaultStudentImg,
    displayStudentName,
    displayHouseName,
    displayStudentAge,
    displayStudentAlive
  );
  defaultStudentImg.src = src = "images/default-image.png";
  displayStudentName.innerHTML = studentName;
  displayHouseName.innerHTML = houseName;
  displayStudentAge.innerHTML = studentAge;
  displayStudentAlive.innerHTML = studentAlive;

  // Legger inn alle veridene i input til store bokstaver
  studentName = studentName.toUpperCase();
  houseName = houseName.toUpperCase();
  studentAge = studentAge.toUpperCase();
  studentAlive = studentAlive.toUpperCase();

  // legge student inn i riktig hus med samme styling
  if (houseName == "GRIFFINGDOR") {
    newStudentContainer.style.backgroundColor = "red";
  } else if (houseName == "SLYTTHERIN") {
    newStudentContainer.style.backgroundColor = "green";
  } else if (houseName == "RAVENCLAW") {
    newStudentContainer.style.backgroundColor = "blue";
  } else if (houseName == "HUFFELPUFF") {
    newStudentContainer.style.backgroundColor = "yellow";
  }

  // Lager error melding hvis input ikke er utfylt
  if (studentName == "") {
    alert("Name is required");
    newStudentContainer.style.display = "none";
  } else if (houseName == "") {
    alert("House is required");
    newStudentContainer.style.display = "none";
  } else if (studentAge == "") {
    alert("Age is required");
    newStudentContainer.style.display = "none";
  } else if (studentAlive == "") {
    alert("Dead or Alive is required");
    newStudentContainer.style.display = "none";
  }
});
