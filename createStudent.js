const createStudent = document.querySelector(".create-student");

const createStudentContainer = document.createElement("div");
const createNameInput = document.createElement("input");
const createHouseInput = document.createElement("input");
const createAgeInput = document.createElement("input");
const createAliveInput = document.createElement("input");
const saveStudentBtn = document.createElement("button");
const createExitBtn = document.createElement("button");

createStudentContainer.classList.add("create-student-container");

document.body.append(createStudentContainer);
createStudentContainer.append(
  createNameInput,
  createNameInput,
  createHouseInput,
  createAgeInput,
  createAliveInput,
  saveStudentBtn,
  createExitBtn
);

saveStudentBtn.innerText = "Save Student🎓";
createExitBtn.innerText = "Exit";

createNameInput.placeholder = "Name";
createHouseInput.placeholder = "House";
createAgeInput.placeholder = "Age";
createAliveInput.placeholder = "Dead or Alive";

createStudentContainer.style.display = "none";
