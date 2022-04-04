fetch("http://hp-api.herokuapp.com/api/characters")
  .then((response) => {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw "feilmelding";
  })
  .then((data) => {
    displayTeacher(renderData(data));
  })
  .catch((err) => console.log("first", err));

let staffMembers;

//filtrerer staffmembers

function renderData(data) {
  staffMembers = data.filter(function (data) {
    return data.hogwartsStaff == true;
  });
  console.log(staffMembers);
  return staffMembers;
}

// Display all staffmembers with name, house and image + delete and edit button

const teacherList = document.querySelector(".teacher-list");
const gryffindor = document.querySelector(".teacher-gryffindor");
const slytherin = document.querySelector(".teacher-slytherin");
const hufflepuff = document.querySelector(".teacher-hufflepuff");
const ravenclaw = document.querySelector(".teacher-ravenclaw");

const displayTeacher = (hogwartsStaffList) => {
  console.log(hogwartsStaffList);
  hogwartsStaffList.forEach((staffMember) => {
    let placeholder = staffMember.image;
    if (staffMember.image === "") {
      placeholder = "./images/defaultimage.png";
    }

    let hogwartsHouse = staffMember.house;
    if (staffMember.house === "") {
      hogwartsHouse = "Not in a house";
    }

    let hogwartsPatronus = staffMember.patronus;

    teacherList.innerHTML += `<li class="teacher">
        <h2>${staffMember.name}</h2>
        <p class="teacher-house">House: ${hogwartsHouse}</p>
        <p class="teacher-patronus">Patronus: ${hogwartsPatronus}</p>
        <button id="delete-btn" onclick="deleteTeacher()">Delete teacher</button>
        <button id="edit-btn" onclick="editTeacher()">Edit teacher</button>
        <img src="${placeholder}" class="teacher-image"/>

        </li>
        `;
  });
};
