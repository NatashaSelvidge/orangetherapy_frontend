class Workout {
  constructor(workout, workoutAttributes) {
    this.id = workout.id;
    // debugger;
    this.title = workoutAttributes.title;
    this.description = workoutAttributes.description;
    this.image_url = workoutAttributes.image_url;
    this.category_id = workoutAttributes.category_id;
    Workout.all.push(this)
    debugger
  }
}

Workout.all = [ ];