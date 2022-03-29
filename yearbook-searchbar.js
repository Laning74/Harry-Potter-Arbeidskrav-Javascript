let studentlist = document.querySelector(".student-list");
let searchBar = document.querySelector(".searchbar");

let studentArray = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredStudents = studentArray.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchString) ||
      student.house.toLowerCase().includes(searchString)
    );
  });
  showStudents(filteredStudents);
});

const getStudents = async () => {
  try {
    const res = await fetch(`http://hp-api.herokuapp.com/api/characters`);
    const hpStudents = await res.json();
    showStudents(hpStudents);
  } catch (err) {
    console.error(err);
  }
};

const showStudents = (student) => {
  const htmlString = student
    .map((student) => {
      return `<li class="character"> <h2> ${student.name}</h2>
        <h2> ${student.house}</p>
        <img src="${student.image}"</img>`;
    })
    .join(``);
  studentlist.innerHTML = htmlString;
};

getStudents();
