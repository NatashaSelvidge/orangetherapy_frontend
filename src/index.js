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
        let newWorkout = new Workout(workout, workout.attributes);

        document.querySelector(
          "#workout-container"
        ).innerHTML += newWorkout.renderWorkoutCard();
      });
      // .catch((err) => console.log(err));
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
    // .catch((err) => console.log(err))
    .then((workout) => {
      console.log(workout);
      const workoutData = workout.data;
      // render JSON response
      let newWorkout = new Workout(workoutData, workoutData.attributes);

      document.querySelector(
        "#workout-container"
      ).innerHTML += newWorkout.renderWorkoutCard();
    });
}
