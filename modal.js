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

// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionne le formulaire avec le nom "reserve"
  const form = document.forms.reserve;

  // Ajoute un écouteur d'événements "submit" au formulaire
  form.addEventListener("submit", function (event) {
    // Annule le comportement par défaut de soumission du formulaire
    event.preventDefault();

    // Appelle la fonction de validation du formulaire
    if (validateForm()) {
      console.log("Formulaire valide. Données envoyées.");
      const validationMessageElement = document.createElement("p");
      validationMessageElement.textContent = "Félicitations, votre inscription a été validé avec succès !!!"
      form.appendChild(validationMessageElement);
    } else {
      console.log("Le formulaire n'est pas valide. Veuillez corriger les erreurs.");
      // Les données du formulaire ne sont pas effacées ici, ce qui permet à l'utilisateur de les corriger sans perdre les saisies.
    }
  });

  // Fonction de validation du formulaire
  function validateForm() {
    // Récupération des valeurs des champs du formulaire
    const firstName = form.first.value.trim(); //trim() enlève les espaces inutiles des valeurs des champs du formulaire
    const lastName = form.last.value.trim();
    const email = form.email.value.trim();
    const birthdate = form.birthdate.value;
    const quantity = form.quantity.value.trim();
    const location = form.querySelector('input[name="location"]:checked');
    const checkbox1 = form.checkbox1;

    // Vérification des conditions de validation
    const isFirstNameValid = firstName.length >= 2 && !firstName == "";
    const isLastNameValid = lastName.length >= 2 && !lastName == "";
    const isEmailValid = validateEmail(email);
    const isBirthdateValid = !isNaN(Date.parse(birthdate));
    const isQuantityValid = !isNaN(quantity) && quantity >= 0 && !quantity == "";
    const isLocationValid = location !== null;
    const isCheckbox1Valid = checkbox1.checked;

    // Fonction pour afficher les messages d'erreur dans le DOM
    function displayError(input, message, isValid) {

      const errorMessageElement = document.createElement("p");
      errorMessageElement.className = "error-message";
      errorMessageElement.textContent = message;

      const existingMsgError = input.parentNode.querySelector(".error-message");

      // Vérifie si un message d'erreur n'existe pas déjà
      if (existingMsgError) {
        // Supprime l'élément du message d'erreur existant
        existingMsgError.remove();
      }

      if (!isValid) {
        // Ajoute un message d'erreur sous l'élément d'entrée si condition invalide
        input.parentNode.appendChild(errorMessageElement);
      }
    }

    displayError(form.first, "Le champ Prénom doit avoir au moins 2 caractères.", isFirstNameValid);
    displayError(form.last, "Le champ Nom doit avoir au moins 2 caractères.", isLastNameValid);
    displayError(form.email, "Veuillez saisir une adresse e-mail valide.", isEmailValid);
    displayError(form.birthdate, "Veuillez saisir votre date de naissance.", isBirthdateValid);
    displayError(form.quantity, "Veuillez saisir un nombre valide pour le nombre de concours.", isQuantityValid);
    displayError(form.querySelector(".location"), "Veuillez sélectionner une ville.", isLocationValid);
    displayError(form.checkbox1, "Veuillez accepter les conditions d'utilisation.", isCheckbox1Valid);

    // Retourne true si toutes les conditions sont remplies, sinon false
    return isFirstNameValid && isLastNameValid && isEmailValid && isBirthdateValid && isQuantityValid && isLocationValid && isCheckbox1Valid;
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
