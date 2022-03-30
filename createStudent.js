let createStudentContainer = document.querySelector(
  ".create-student-container"
);
//Skjul container
createStudentContainer.style.display = "none";

// Vis div - New student button
function showCreateStudent() {
  createStudentContainer.style.display = "block";
  filterNewStudents("griffingdor", "slyttherin", "ravenclaw", "huffelpuff");
}
// Skjul div - exit button
let createExitBtn = document.querySelector(".exit-btn");
createExitBtn.addEventListener("click", () => {
  createStudentContainer.style.display = "none";
});

let newStudentList = document.querySelector(".newStudentList");
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

  // addNewStudent();
});

let newStudents;
function filterNewStudents(house) {
  newStudents = newStudentArray.filter(function (student) {
    student.house == house;
  });
  console.log(newStudents);
  addNewStudent(newStudents);
}

//function som adder elever til liste
function addNewStudent(newStudents) {
  newStudentList.innerHTML = "";

  for (let i = 0; i < newStudents.length; i++) {
    newStudentList.innerHTML += `<li>
    <img src = "./images/default-image.png" class="default-student-img" />
    <p>${newStudents[i].name}</p>
    <p>${newStudents[i].house}</p>
    <p>${newStudents[i].age}</p>
    <p>${newStudents[i].alive}</p>
    </li>`;

    // legge student inn i riktig hus med samme styling
    // if (houseName == "GRIFFINGDOR") {
    //   newStudentList.style.backgroundColor = "red";
    // } else if (houseName == "SLYTTHERIN") {
    //   newStudentList.style.backgroundColor = "green";
    // } else if (houseName == "RAVENCLAW") {
    //   newStudentList.style.backgroundColor = "blue";
    // } else if (houseName == "HUFFELPUFF") {
    //   newStudentList.style.backgroundColor = "yellow";
    // }
  }
  console.log(newStudentArray);
}
