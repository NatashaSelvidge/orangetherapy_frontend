class Workout {
  constructor(workout, workoutAttributes) {
    this.id = workout.id;
    // debugger;
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
    
    <div class="row row-cols-1 row-cols-sm-2 g-3">
     <div class="col">
       <div class="card shadow-sm">
          <img src=${this.image_url} class="card-img-top" height="300" width="250">
          <div class="card-body">
            <h2 class="card-title"> ${this.title} </h2>
            <h5> ${this.category.name} </h5>
           <div  id="node1" class="d-flex justify-content-between align-items-center" >
             <div id="node2" class="btn-group" >

               <button type="button" class="btn btn-sm btn-outline-secondary" id="view">
                 View
               </button>
               
               <button type="button" class="btn btn-sm btn-outline-secondary" id="edit">
               Edit
               </button>
               </div>
               <small class="text-muted">${this.created_at}</small>
            </div>
          </div>
        </div>
      </div>


    <div class="card border-warning mb-3" style="max-width: 1000%">
      <div class="card-header">${this.title}</div>
        <div class="card-body">
          <h5 class="card-title">${this.category.name}</h5>
            <p class="card-text">${this.description}</p>
        </div>
      </div>
    </div>
       `;
  }

  // renderView() {
  //   return `
  // <div class="card border-warning mb-3" style="max-width: 1000%">
  //   <div class="card-header">${this.title}</div>
  //   <div class="card-body">
  //     <h5 class="card-title">${this.category.name}</h5>
  //     <p class="card-text">${this.description}</p>
  //   </div>
  // </div>

  //      `;
  // }
}
Workout.all = [];
