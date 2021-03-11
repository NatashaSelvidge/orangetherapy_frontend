class Workout {
  constructor(workout, workoutAttributes) {
    this.id = workout.id;
    // debugger;
    this.title = workoutAttributes.title;
    this.description = workoutAttributes.description;
    this.image_url = workoutAttributes.image_url;
    this.category = workoutAttributes.category;
    Workout.all.push(this);
  }

  renderWorkoutCard() {
    // debugger;
    return `
        <div data-id=${this.id}>
        <img src=${this.image_url} height="200" width="250">
        <h2> ${this.category.name} </h2>
        <h3> ${this.title} </h3>
        <button data-id${this.id}> Edit </button>
        </div>
        <br><br>`;
  }
}

Workout.all = [];
