let createWorkoutForm = document.querySelector("#create-workout-form");

document.addEventListener("DOMContentLoaded", init);
const baseUrl = "http://localhost:3000/api/v1/";
const endPoint = "http://localhost:3000/api/v1/workouts";

function init() {
  console.log("Loaded");
  getWorkouts();
  checkLogin();
}

const loginDiv = document.getElementById("loginDiv");
function loadLoginForm() {
  document.getElementById("loginDiv").innerHTML = `
  
          <form id="login-form">
            <div class="form-group">
              <h5 class="text-white">Email</h5>
              <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <h5 class="text-white">Password</h5>
              <input type="password" class="form-control" id="login-password">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
         
            
              
        
  `;
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", handleLoginForm);
}

function loadSignupForm() {
  document.getElementById("signupDiv").innerHTML = `
    <form id="signUp-form">
              <label>Email</label>
                <input type="email" class="form-control" id="signup-email" aria-describedby="emailHelp">
          
              <label>Password</label>
              <input type="password" class="form-control" name="password" id="signUp-password">
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </form>
  `;

  const signUpForm = document.querySelector("#signUp-form");
  signUpForm.addEventListener("submit", handleSignUpForm);
}

function getWorkouts(url) {
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

function handleLoginForm(e) {
  handleLoginSignup(e, "login");
}

function handleSignUpForm(e) {
  handleLoginSignup(e, "signup");
}

function handleCreateForm(event) {
  event.preventDefault();
  const titleInput = event.target.title.value;
  const descriptionInput = event.target.description.value;
  const imageInput = event.target.image.value;
  const categoryId = parseInt(event.target.categories.value);
  const created_at = event.target.created_at;
  postFetch(titleInput, descriptionInput, imageInput, categoryId, created_at);

  createWorkoutForm.addEventListener("submit", handleCreateForm);
}

function postFetch(title, description, image_url, category_id, created_at) {
  const dataBody = { title, description, image_url, category_id, created_at };
  fetch("http://localhost:3000/api/v1/workouts", {
    //POST request
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataBody),
  })
    .then((response) => response.json())
    .then((workout) => {
      console.log(workout);
      const workoutData = workout.data;
      // render JSON response
      // render(workoutData);
      let newWorkout = new Workout(workoutData, workoutData.attributes);

      document.querySelector(
        "#workout-container"
      ).innerHTML += newWorkout.renderWorkoutCard();
    });
}

function checkLogin() {
  if (localStorage.jwt_token) {
    loadSignupForm();
  } else {
    loadLoginForm();
  }
}

function handleLoginSignup(e, path) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  signUpFetch(email, password);

  function signUpFetch(email, password) {
    const bodyData = {
      user: {
        email: email,
        password: password,
      },
    };

    fetch(baseUrl + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("jwt_token", data.jwt);
      });
  }
}
