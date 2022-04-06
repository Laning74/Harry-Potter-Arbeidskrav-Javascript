const loadCharacters = async () => {
  fetch("http://hp-api.herokuapp.com/api/characters")
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      throw "feilmelding";
    })
    .then((data) => {
      filterStaffMembers(data);
    })
    .catch((err) => console.log("first", err));
};
loadCharacters();
let staffMembers = [];

function filterStaffMembers(data) {
  staffMembers = data.filter(function (data) {
    return data.hogwartsStaff == true;
  });
  displayTeachers(staffMembers);
  return staffMembers;
}

function displayTeachers(staffMembers) {
  console.log(staffMembers);
  const teacherList = document.querySelector(".teacher-list");
  teacherList.innerHTML = "";
  for (let i = 0; i < staffMembers.length; i++) {
    let teacherCard = document.createElement("li");
    // teacherCard.classList.add("teacher");
    let teacherName = document.createElement("h2");
    teacherName.innerText = staffMembers[i].name;
    let teacherHouse = document.createElement("p");
    teacherHouse.classList.add("teacher-house");
    teacherHouse.innerText = `House: ${staffMembers[i].house}`;
    if (staffMembers[i].house == "Gryffindor") {
      teacherCard.classList.add("teacher-gryffindor");
    } else if (staffMembers[i].house == "Slytherin") {
      teacherCard.classList.add("teacher-slytherin");
    } else if (staffMembers[i].house == "Hufflepuff") {
      teacherCard.classList.add("teacher-hufflepuff");
    } else if (staffMembers[i].house == "Ravenclaw") {
      teacherCard.classList.add("teacher-ravenclaw");
    } else {
      teacherCard.classList.add("teacher");
    }
    let teacherPatronus = document.createElement("p");
    teacherPatronus.classList.add("teacher-patronus");
    if (staffMembers[i].patronus == "") {
      teacherPatronus.innerText = "Patronus: Uncertain";
    } else {
      teacherPatronus.innerText = `Patronus: ${staffMembers[i].patronus}`;
    }
    let teacherImage = document.createElement("img");
    teacherImage.classList.add(".teacher-image");
    if (staffMembers[i].image == "") {
      teacherImage.src = "../images/defaultimage.png";
    } else {
      teacherImage.src = staffMembers[i].image;
    }
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteTeacher(i, staffMembers);
    });
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => {
      // editTeacher(i, staffMembers);
    });
    teacherList.append(teacherCard);
    teacherCard.append(
      teacherName,
      teacherHouse,
      teacherPatronus,
      teacherImage,
      deleteBtn,
      editBtn
    );
  }
}
function deleteTeacher(index, staffMembers) {
  let userConfirm = prompt(
    "Do you want to delete this teacher from list? yes/no"
  );
  if (userConfirm == "yes") {
    staffMembers.splice(index, 1);
  } else {
    alert("Nothing deleted from this list");
  }
  displayTeachers(staffMembers);
}

//hiding the form for creating new teacher
let createTeacherContainer = document.querySelector(
  ".create-teacher-container"
);
createTeacherContainer.style.display = "none";
//function for displaying form to craete new teacher
let createTeacherBtn = document.querySelector(".create-teacher-btn");
createTeacherBtn.addEventListener("click", () => {
  createTeacherContainer.style.display = "block";
});
//function for hiding the form on exit click
let exitBtn = document.querySelector(".exit-btn");
exitBtn.addEventListener("click", () => {
  createTeacherContainer.style.display = "none";
});

//function for saving new teacher data in array
let saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", () => {
  addNewTeacher();
});
let selection = document.querySelector("select");
let selectedHouse;
selection.addEventListener("change", () => {
  selectedHouse = selection.options[selection.selectedIndex].value;
  // console.log(selectedHouse);
});
function addNewTeacher() {
  let src = "./images/default-image.png";
  let teacherName = document.querySelector(".create-name-input").value;
  let teacherPatronus = document.querySelector(".create-patronus-input").value;
  if (teacherName == "" || teacherPatronus == "") {
    alert("Fill in all the information")
  }else{ staffMembers.push({
    name: teacherName,
    house: selectedHouse,
    patronus: teacherPatronus,
    image: src,
  });}
  displayTeachers(staffMembers);
  document.querySelector(".create-name-input").value = "";
  // document.querySelector(".create-house-input").value = "";
  document.querySelector(".create-patronus-input").value = "";
}


