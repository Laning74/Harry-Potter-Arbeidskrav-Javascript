let createStudentContainer = document.querySelector(
  ".create-student-container"
);
//Skjul container
createStudentContainer.style.display = "none";

// Vis div - New student button
function showCreateStudent() {
  createStudentContainer.style.display = "block";
}
// Skjul div - exit button
let createExitBtn = document.querySelector(".exit-btn");
createExitBtn.addEventListener("click", () => {
  createStudentContainer.style.display = "none";
});

let saveStudentBtn = document.querySelector(".save-student-btn");
const newStudentArray = [];

saveStudentBtn.addEventListener("click", () => {
  let src = "./images/default-image.png";
  let studentName = document.querySelector(".create-name-input").value;
  let houseName = document.querySelector(".create-house-input").value;
  let studentAge = document.querySelector(".create-age-input").value;
  let studentAlive = document.querySelector(".create-alive-input").value;

  newStudentArray.push({
    image: src,
    name: studentName,
    house: houseName,
    age: studentAge,
    alive: studentAlive,
  });

  // Lager error melding hvis input ikke er utfylt
  if (studentName == "") {
    alert("Name is required");
    newStudentArray.splice(-1);
  } else if (houseName == "") {
    alert("House is required");
    newStudentArray.splice(-1);
  } else if (studentAge == "") {
    alert("Age is required");
    newStudentArray.splice(-1);
  } else if (studentAlive == "") {
    alert("Dead or Alive is required");
    newStudentArray.splice(-1);
  }

  addNewStudent();
});

let griffingdorStudentList = document.querySelector(
  ".griffingdor-student-list"
);
let slytherinStudentList = document.querySelector(".slytherin-student-list");
let ravenclawStudentList = document.querySelector(".ravenclaw-student-list");
let huffelpuffStudentList = document.querySelector(".huffelpuff-student-list");

//function som adder elever til liste
function addNewStudent() {
  griffingdorStudentList.innerHTML = "";
  slytherinStudentList.innerHTML = "";
  ravenclawStudentList.innerHTML = "";
  huffelpuffStudentList.innerHTML = "";

  let griffingdorStudents = newStudentArray.filter(function (currentElement) {
    return currentElement.house === "griffingdor";
  });

  let slytherinStudents = newStudentArray.filter(function (currentElement) {
    return currentElement.house === "slytherin";
  });

  let ravenclawStudents = newStudentArray.filter(function (currentElement) {
    return currentElement.house === "ravenclaw";
  });

  let huffelpuffStudents = newStudentArray.filter(function (currentElement) {
    return currentElement.house === "huffelpuff";
  });

  for (let i = 0; i < griffingdorStudents.length; i++) {
    griffingdorStudentList.innerHTML += `<li>
      <img src = "./images/default-image.png" class="default-student-img" />
    <p>${griffingdorStudents[i].name}</p>
    <p>${griffingdorStudents[i].house}</p>
    <p>${griffingdorStudents[i].age}</p>
    <p>${griffingdorStudents[i].alive}</p>
    </li>`;
  }

  for (let i = 0; i < slytherinStudents.length; i++) {
    slytherinStudentList.innerHTML += `<li>
      <img src = "./images/default-image.png" class="default-student-img" />
    <p>${slytherinStudents[i].name}</p>
    <p>${slytherinStudents[i].house}</p>
    <p>${slytherinStudents[i].age}</p>
    <p>${slytherinStudents[i].alive}</p>
    </li>`;
  }

  for (let i = 0; i < ravenclawStudents.length; i++) {
    ravenclawStudentList.innerHTML += `<li>
      <img src = "./images/default-image.png" class="default-student-img" />
    <p>${ravenclawStudents[i].name}</p>
    <p>${ravenclawStudents[i].house}</p>
    <p>${ravenclawStudents[i].age}</p>
    <p>${ravenclawStudents[i].alive}</p>
    </li>`;
  }

  for (let i = 0; i < huffelpuffStudents.length; i++) {
    huffelpuffStudentList.innerHTML += `<li>
      <img src = "./images/default-image.png" class="default-student-img" />
    <p>${huffelpuffStudents[i].name}</p>
    <p>${huffelpuffStudents[i].house}</p>
    <p>${huffelpuffStudents[i].age}</p>
    <p>${huffelpuffStudents[i].alive}</p>
    </li>`;
  }
}
console.log(newStudentArray);
