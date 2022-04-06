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
    let editTeacherCard = document.createElement("li");
    editTeacherCard.classList.add("edit-teacher");
    editTeacherCard.style.display = "none";

    let editNameInput = document.createElement("input");
    editNameInput.placeholder = `Name: ${staffMembers[i].name}`;
    let editHouseInput = document.createElement("input");
    editHouseInput.placeholder = `House: ${staffMembers[i].house}`;
    let editPatronusInput = document.createElement("input");
    editPatronusInput.placeholder = `Patronus: ${staffMembers[i].patronus}`;
    let teacherCard = document.createElement("li");
    let teacherName = document.createElement("h2");
    teacherName.innerText = staffMembers[i].name;
    let editName = document.createElement("input");
    editName.classList.add("edit-teacher-info");
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
    teacherImage.classList.add("teacher-image");
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
      // editTeacherContainer.style.display = "block";
      teacherCard.style.display = "none";
      editTeacherCard.style.display = "grid";
    });
    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    saveBtn.addEventListener("click", () => {
      let editedName = editNameInput.value;
      let editedHouse = editHouseInput.value;
      let editedPatronus = editPatronusInput.value;
      saveEditedInfo(i, staffMembers, editedName, editedHouse, editedPatronus);
    });
    let exitBtn = document.createElement("button");
    exitBtn.innerText = "Exit";
    exitBtn.addEventListener("click", () => {
      // alert("exit btn clicked");
      editTeacherCard.style.display = "none";
      teacherCard.style.display = "grid";
    });
    teacherList.append(teacherCard, editTeacherCard);
    teacherCard.append(
      teacherName,
      teacherHouse,
      teacherPatronus,
      teacherImage,
      deleteBtn,
      editBtn
    );

    editTeacherCard.append(
      editNameInput,
      editHouseInput,
      editPatronusInput,
      saveBtn,
      exitBtn
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
    alert("Fill in all the information");
  } else {
    let userAnswer = prompt("Do you want to save this New Teacher? yes/no");
    if (userAnswer == "yes") {
      staffMembers.push({
        name: teacherName,
        house: selectedHouse,
        patronus: teacherPatronus,
        image: src,
      });
      alert("New Teacher saved");
    } else {
      alert("No New teacher saved");
    }
  }
  displayTeachers(staffMembers);
  document.querySelector(".create-name-input").value = "";
  // document.querySelector(".create-house-input").value = "";
  document.querySelector(".create-patronus-input").value = "";
}

//hiding the form for edit teacher

let editTeacherContainer = document.querySelector(".edit-teacher-container");
editTeacherContainer.style.display = "none";

//function for saving edited teacher data in array working
function saveEditedInfo(
  i,
  staffMembers,
  editedName,
  editedHouse,
  editedPatronus
) {
  staffMembers[i] = {
    ...staffMembers[i],
    name: editedName,
    house: editedHouse,
    patronus: editedPatronus,
  };
  // console.log(staffMembers);
  displayTeachers(staffMembers);
}
