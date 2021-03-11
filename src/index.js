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
        // debugger
        let newWorkout = new Workout(workout, workout.attributes);

        render(workout);
      });
      // .catch((err) => console.log(err));
    });
}

function render(workout) {
  const workoutMarkup = `
        <div data-id=${workout.id}>
        <img src=${workout.attributes.image_url} height="200" width="250">
        <h2> ${workout.attributes.category.name} </h2>
        <h3> ${workout.attributes.title} </h3>
        <button data-id${workout.id}> Edit </button>
        </div>
        <br><br>`;

  document.querySelector("#workout-container").innerHTML += workoutMarkup;
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
    // .catch((err) => console.log(err))
    .then((workout) => {
      console.log(workout);
      const workoutData = workout.data;
      // render JSON response
      render(workoutData);
    });
}
