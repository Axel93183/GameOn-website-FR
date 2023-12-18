const toggleNavButton = document.getElementById("toggleNavButton");

// event listener for toggle button clicks
toggleNavButton.addEventListener("click", function () {
  const navigation = document.getElementById("myTopnav");

  if (navigation.className === "main-navbar") {
    navigation.className += " responsive";
  } else {
    navigation.className = "main-navbar";
  }
});

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const crossCloseModal = document.querySelectorAll(".close");
const btnCloseModal = document.querySelector(".btn-close");
const form = document.forms.reserve;

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event with cross
crossCloseModal.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal event with button
btnCloseModal.addEventListener("click", closeModal);

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// form validation
function validateForm() {
  // retrieving form field values
  const firstName = form.first.value.trim();
  const lastName = form.last.value.trim();
  const email = form.email.value.trim();
  const birthdate = form.birthdate.value;
  const currentDate = new Date();
  const quantity = form.quantity.value.trim();
  const location = form.querySelector('input[name="location"]:checked');
  const checkTerms = form.checkbox1;

  // checking validation conditions
  const isFirstNameValid = firstName.length >= 2 && !firstName == "";
  const isLastNameValid = lastName.length >= 2 && !lastName == "";
  const isEmailValid = validateEmail(email);
  const isBirthdateValid = !isNaN(Date.parse(birthdate)) && Date.parse(birthdate) <= currentDate.getTime();
  const isQuantityValid = !isNaN(quantity) && quantity >= 0 && !quantity == "";
  const isLocationValid = location !== null;
  const isCheckTermsValid = checkTerms.checked;

  // display error messages in the DOM
  function displayError(input, message, isValid) {

    const errorMessageElement = document.createElement("p");
    errorMessageElement.className = "error-message";
    errorMessageElement.textContent = message;

    const existingMsgError = input.parentNode.querySelector(".error-message");
    if (existingMsgError) {
      existingMsgError.remove();
    }

    if (!isValid) {
      // error message below the input element if invalid condition
      input.parentNode.appendChild(errorMessageElement);
    }
  }

  displayError(form.first, "Le champ Prénom doit avoir au moins 2 caractères.", isFirstNameValid);
  displayError(form.last, "Le champ Nom doit avoir au moins 2 caractères.", isLastNameValid);
  displayError(form.email, "Veuillez saisir une adresse e-mail valide.", isEmailValid);
  displayError(form.birthdate, "Veuillez saisir votre date de naissance.", isBirthdateValid);
  displayError(form.quantity, "Veuillez saisir un nombre valide de concours (99 max).", isQuantityValid);
  displayError(form.querySelector(".location"), "Veuillez sélectionner une ville.", isLocationValid);
  displayError(form.checkbox1, "Veuillez lire et accepter les conditions d'utilisation.", isCheckTermsValid);

  return isFirstNameValid && isLastNameValid && isEmailValid && isBirthdateValid && isQuantityValid && isLocationValid && isCheckTermsValid;
}

// submit form event
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    const validationMessage = document.querySelector(".content-validate")
    validationMessage.style.display = "flex" 
  }
});
