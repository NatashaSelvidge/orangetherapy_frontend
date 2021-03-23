class Workout {
  constructor(workout, workoutAttributes) {
    this.id = workout.id;

    this.title = workoutAttributes.title;
    this.description = workoutAttributes.description;
    this.image_url = workoutAttributes.image_url;
    this.category = workoutAttributes.category;
    this.created_at = workoutAttributes.created_at;
    Workout.all.push(this);
    // console.log(this);
  }

  renderWorkoutCard() {
    return `

    <div class="row-cols-1 id="whole-card" >
      <div class="col" id="whole-card-workout">
        <div data-id=${this.id}>
          <div class="card shadow-sm">
            <img src=${this.image_url} class="card-img-top" height="300" width="250">
            <div class="card-body" id="card-body">
              <h2 class="card-title"> ${this.title} </h2>
              <h5> ${this.category.name} </h5>
              <p class="card-text">${this.description}</p>
              <div  id="node1" class="d-flex justify-content-between align-items-center" >
                <div id="node2" class="btn-group" >

                 <button type="button" class="btn btn-sm btn-outline-secondary" id="edit" data-id=${this.id} >
                   Edit
                 </button>
                 <button onclick="handleDelete(event)" class="btn btn-sm btn-outline-secondary" data-id=${this.id}  >
                 Delete
                 </button>

                </div>
                 <small class="text-muted">${this.created_at}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                 

         `;
  }
}
Workout.all = [];
