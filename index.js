const endPoint = "http://localhost:3000/api/v1/workouts";

document.addEventListener("DOMContentLoaded", () => {
  getWorkouts();

  let createWorkoutForm = document.querySelector("#create-workout-form");
  createWorkoutForm.addEventListener("submit", handleCreateForm);
});

function getWorkouts() {
  fetch(endPoint)
    .then((response) => response.json())
    .then((workouts) => {
      workouts.data.forEach((workout) => {
        const workoutMarkup = `
        <div data-id=${workout.id}>
        <img src=${workout.attributes.image_url} height="200" width="250">
        <h2> ${workout.attributes.category.name} </h2>
        <h3> ${workout.attributes.title} </h3>
        <button data-id${workout.id}> Edit </button>
        </div>
        <br><br>`;

        document.querySelector("#workout-container").innerHTML += workoutMarkup;
      });
    });
}

function handleCreateForm(event) {
  event.preventDefault();
  const titleInput = event.target.title.value;
  const descriptionInput = event.target.description.value;
  const imageInput = event.target.image.value;
  const categoryId = parseInt(event.target.categories.value);
  postFetch(titleInput, descriptionInput, imageInput, categoryId);
}

function postFetch(title, description, image_url, category_id) {
  console.log(title, description, image_url, category_id);

  const dataBody = { title, description, image_url, category_id };
  fetch(endPoint, {
    //POST request
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataBody),
  })
    .then((response) => response.json())
    .then((workout) => {
      console.log(workout);
      const workoutData = workout.data.attributes;
      // render JSON response
      const workoutMarkup = `
        <div data-id=${workout.id}>
        <img src=${workoutData.image_url} height="200" width="250">
        <h2> ${workoutData.category.name} </h2>
        <h3> ${workoutData.title} </h3>
        <button data-id${workoutData.id}> Edit </button>
        </div>
        <br><br>`;

      document.querySelector("#workout-container").innerHTML += workoutMarkup;
    });
}
