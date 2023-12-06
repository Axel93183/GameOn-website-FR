function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const btnCloseModal = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// close modal event
btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms.reserve;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      console.log("Formulaire valide. Données envoyées.");
    } else {
      console.log("Le formulaire n'est pas valide. Veuillez corriger les erreurs.");
    }
  });

  function validateForm() {
    const firstName = form.first.value;
    const lastName = form.last.value;
    const email = form.email.value;
    const quantity = form.quantity.value;
    const location = form.location.value;
    const checkbox1 = form.checkbox1.checked;

    const isFirstNameValid = firstName.length >= 2;
    const isLastNameValid = lastName.length >= 2;
    const isEmailValid = validateEmail(email);
    const isQuantityValid = !isNaN(quantity) && quantity >= 0;
    const isLocationValid = location !== undefined;
    const isCheckbox1Valid = checkbox1;

    // Fonction pour afficher les messages d'erreur dans le HTML
    function displayError(input, message) {

      const errorMessageElement = document.createElement("p");
      errorMessageElement.className = "error-message";
      errorMessageElement.textContent = message;
      
      const existingError = input.parentNode.querySelector(".error-message");

      // Vérifie si un message d'erreur n'existe pas déjà
      if (!existingError) {
        // Ajoute le nouveau message d'erreur sous l'élément d'entrée
        input.parentNode.appendChild(errorMessageElement);
      } else {
        // Supprime l'élément du message d'erreur existant
        input.parentNode.removeChild(existingError);
        input.parentNode.appendChild(errorMessageElement);
      }
    }

    if (!isFirstNameValid) {
      displayError(form.first, "Le champ Prénom doit avoir au moins 2 caractères.");
    } 

    if (!isLastNameValid) {
      displayError(form.last, "Le champ Nom doit avoir au moins 2 caractères.");
    }

    if (!isEmailValid) {
      displayError(form.email, "Veuillez saisir une adresse e-mail valide.");
    }

    if (!isQuantityValid) {
      displayError(form.quantity, "Veuillez saisir un nombre valide pour le nombre de concours.");
    }

    if (!isLocationValid) {
      displayError(form.querySelector(".formData"), "Veuillez sélectionner une ville.");
    }

    if (!isCheckbox1Valid) {
      displayError(form.checkbox1, "Veuillez accepter les conditions d'utilisation.");
    }

    // Retourne true si toutes les conditions sont remplies, sinon false
    return isFirstNameValid && isLastNameValid && isEmailValid && isQuantityValid && isLocationValid && isCheckbox1Valid;
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
