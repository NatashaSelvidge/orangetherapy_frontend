const endPoint = "http://localhost:3000/api/v1/workouts";
function workoutCard() {
  return document.getElementById("whole-card");
}
const card = () => document.querySelector("#workout-container");

const main = () => document.getElementById("main");
const searchDiv = () => document.getElementById("search");
const searchForm = () => document.getElementById("search-form");
const searchInput = () => document.getElementById("search-input");
const createForm = () => document.getElementById("create-workout-form");

function resetMain() {
  main().innerHTML = " ";
}

workoutTemplate = () => {
  return `
  <form id="create-workout-form">
  <div class="mb-3">
  <label class="form-label" name="title">Title</label>
  <input
  name="title"
  type="title"
  class="form-control"
  id="input-title"
  />
  
  <div class="mb-3">
  <label class="form-label">Description</label>
  <textarea
  class="form-control"
  id="input-description"
  rows="3"
  name="description"
  ></textarea>
  <label for="exampleInputEmail1">Image Url</label>
  <input
  type="img"
  name="image"
  class="form-control"
  id="input-image"
  />
  </div>
  <div class="form-group mb-3">
  <select
  class="form-select"
  name="categories"
  aria-label="Default select example"
  id="input-categories"
  >
  <option selected>Select type of workout</option>
  <option value="1" name="categories">ESP</option>
  <option value="2" name="categories">Enderance</option>
  <option value="3" name="categories">Strength</option>
  <option value="4" name="categories">Power</option>
  </select>
  </div>
  
  <button type="submit" class="btn btn-full">Submit</button>
  </div>
  </form> `;
};
function showWorkoutForm() {
  resetMain();
  main().innerHTML = workoutTemplate();
}

function renderWorkoutForm() {
  createForm().addEventListener(
    "submit",
    (handleCreateForm = () => {
      const titleInput = document.querySelector("#input-title").value;
      const descriptionInput = document.querySelector("#input-description")
        .value;
      const imageInput = document.querySelector("#input-image").value;
      const categoryId = parseInt(
        document.querySelector("#input-categories").value
      );
      postFetch(titleInput, descriptionInput, imageInput, categoryId);
    })
  );
}

function searchFormTemplate() {
  return `
<form id="search-form">
    <label>Search</label>
      <input type="text" name="search" id="search-input" autofocus="on">
  </form>`;
}

function renderForm() {
  searchDiv().innerHTML = searchFormTemplate();
}

function search() {
  searchInput().addEventListener("keyup", function (e) {
    e.preventDefault();
    console.log(e.target.value);
    const term = e.target.value;
    Workout.all.forEach(function (workout) {
      if (workout.description.indexOf(term) != -1) {
        workout.style.display = "block"; //show
      } else {
        workout.style.display = "none"; //hide
      }
    });
  });
}

//GET
function getWorkouts() {
  fetch(endPoint)
    .then((response) => response.json())
    .then((workouts) => {
      workouts.data.forEach((workout) => {
        let newWorkout = new Workout(workout, workout.attributes);
        document.querySelector(
          "#workout-container"
        ).innerHTML += newWorkout.renderWorkoutCard();
      });
    });
}

function handleCreateForm(event) {
  event.preventDefault();
  const titleInput = document.querySelector("#input-title").value;
  const descriptionInput = document.querySelector("#input-description").value;
  const imageInput = document.querySelector("#input-image").value;
  const categoryId = parseInt(
    document.querySelector("#input-categories").value
  );
  postFetch(titleInput, descriptionInput, imageInput, categoryId);
}
//POST
function postFetch(title, description, image_url, category_id) {
  const dataBody = { title, description, image_url, category_id };
  fetch(endPoint, {
    //POST request
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataBody),
  })
    .then((response) => response.json())
    .then(handleWorkout);
}
function handleWorkout(workoutMarkup) {
  card().innerHTML += workoutMarkup;
}

handleDelete = (event) => {
  let workoutId = parseInt(event.target.dataset.id);

  fetch(`http://localhost:3000/api/v1/workouts/${workoutId}`, {
    method: "DELETE",
  });
 
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded");
  showWorkoutForm();
  renderWorkoutForm();
  getWorkouts();
  renderForm();
  search();
});
