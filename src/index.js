const endPoint = "http://localhost:3000/api/v1/workouts";
const card = document.querySelector("#workout-container");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded");
  getWorkouts();

  let createWorkoutForm = document.querySelector("#create-workout-form");
  createWorkoutForm.addEventListener("submit", handleCreateForm);
});

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
  document.querySelector("#workout-container").innerHTML += workoutMarkup;
  this.location.reload();
}

function handleDelete(event) {
  let workoutId = parseInt(event.target.dataset.id);

  fetch(`http://localhost:3000/api/v1/workouts/${workoutId}`, {
    method: "DELETE",
  });
  this.location.reload();
}
