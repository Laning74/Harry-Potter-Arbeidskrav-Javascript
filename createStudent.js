// let createStudentContainer = document.querySelector(
//   ".create-student-container"
// );
// //Skjul container
// createStudentContainer.style.display = "none";

// // Vis div - New student button
// function showCreateStudent() {
//   createStudentContainer.style.display = "block";
// }
// // Skjul div - exit button
// let createExitBtn = document.querySelector(".exit-btn");
// createExitBtn.addEventListener("click", () => {
//   createStudentContainer.style.display = "none";
// });

// let saveStudentBtn = document.querySelector(".save-student-btn");
// const newStudentArray = [];

// saveStudentBtn.addEventListener("click", () => {
//   let src = "./images/default-image.png";
//   let studentName = document.querySelector(".create-name-input").value;
//   let houseName = document.querySelector(".create-house-input").value;
//   let studentAge = document.querySelector(".create-age-input").value;
//   let studentAlive = document.querySelector(".create-alive-input").value;

//   // console.log(newStudentArray);
//   // Lager error melding hvis input ikke er utfylt
//   if (studentName == "") {
//     alert("Name is required");
//     // newStudentArray.splice(-1);
//   } else if (houseName == "") {
//     alert("House is required");
//     // newStudentArray.splice(-1);
//   } else if (studentAge == "") {
//     alert("Age is required");
//     // newStudentArray.splice(-1);
//   } else if (studentAlive == "") {
//     alert("Dead or Alive is required");
//     // newStudentArray.splice(-1);
//   } else {
//     newStudentArray.push({
//       image: src,
//       name: studentName,
//       house: houseName,
//       age: studentAge,
//       alive: studentAlive,
//     });
//   }

//   addNewStudent();
// });

// let studentList = document.querySelector(".student-list");

// //function som adder elever til liste
// function addNewStudent() {
//   studentList.innerHTML = "";

//   filterNewStudent(newStudentArray, "gryffindor");
//   filterNewStudent(newStudentArray, "slytherin");
//   filterNewStudent(newStudentArray, "ravenclaw");
//   filterNewStudent(newStudentArray, "huffelpuff");

//   function filterNewStudent(array, house) {
//     let filterStudentArray = array.filter(function (curr) {
//       return curr.house === house;
//     });

//     for (i = 0; i < filterStudentArray.length; i++) {
//       studentList.innerHTML += `<li>
//       <img src = "./images/default-image.png" class="default-student-img" />
//      <p>${filterStudentArray[i].name}</p>
//      <p>${filterStudentArray[i].house}</p>
//      <p>${filterStudentArray[i].age}</p>
//      <p>${filterStudentArray[i].alive}</p>
//     </li>`;
//     }

//     // console.log(filterStudentArray);
//   }
//   // console.log(filterStudentArray);
// }
