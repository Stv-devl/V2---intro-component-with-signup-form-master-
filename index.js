//variables
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type=password'
);
const progressBar = document.getElementById("progress-bar");
let firstname, lastname, email, password;

//variable errorDisplay for take care error and thanks message
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

//variable for check firstname
const firstnameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "firstname",
      "The first name must be between 3 and 20 characters"
    );
    firstname = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "firstname",
      "The first name must not contain special characters"
    );
    firstname = null;
  } else {
    errorDisplay("firstname", "", true);
    firstname = value;
  }
};
//variable for check lastname
const lastnameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "lastname",
      "The Last name must be between 3 and 20 characters"
    );
    lastname = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "lastname",
      "The Last name must not contain special characters"
    );
    lastname = null;
  } else {
    errorDisplay("lastname", "", true);
    lastname = value;
  }
};
//variable for check Email
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Email is not valid");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

//variable for check password with progress bar
const passwordChecker = (value) => {
  progressBar.classList = "";
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Minimum of 8 characters, one capital letter, one number and one special character"
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = value;
  } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = value;
  }
};
//for every input register writing in inputs
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstname":
        firstnameChecker(e.target.value);
        break;
      case "lastname":
        lastnameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

//Submit//
//If everything is complete send data when submit, if not alert message ask to fill the forms
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (firstname && lastname && email && password) {
    const data = {
      firstname,
      lastname,
      email,
      password,
    };
    //console.log(data);
    //=>for empty form after completen and delete progressbar
    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";
    firstname = null;
    lastname = null;
    email = null;
    password = null;
    alert("Thank you, you are register");
  } else {
    alert("Please fill the forms correctly");
  }
});
