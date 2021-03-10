const endPoint = "http://localhost:3000/api/v1/workouts";

document.addEventListener("DOMContentLoaded", () => {
  getWorkouts();
});

function getWorkouts() {
  fetch(endPoint)
    .then((response) => response.json())
    .then((workouts) => {
      workouts.data.forEach((workout) => {
        const workoutMarkup = `
        <div data-id=${workout.id}>
        <img src=${workout.attributes.image_url} height="200" width="250">
        <h3> ${workout.attributes.title} </h3>
        <p> ${workout.attributes.category.name} </p>
        <button data-id${workout.id}> Edit </button>
        </div>
        <br><br>`;

        document.querySelector("#workout-container").innerHTML += workoutMarkup;
      });
    });
}
