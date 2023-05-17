"use strict";

const emailInput = document.getElementById("email");
const errorLabel = document.getElementById("notify-form__label");

const form = document.getElementById("notify-form");
const submitButton = document.getElementById("notify-form__submit");

const successMessage = document.getElementById("success-message");

emailInput.addEventListener("input", validateEmail);

form.addEventListener("submit", submitForm);
submitButton.addEventListener("click", handleButtonClick);

function validateEmail() {
  const email = emailInput.value.trim();

  localStorage.setItem("email", email);

  if (email === "") {
    resetInputStyles();
    hideErrorLabel();
  } else if (!validator.isEmail(email)) {
    setInvalidInput();
    showErrorLabel("Please provide a valid email address");
  } else {
    setValidInput();
    hideErrorLabel();
  }
}

function resetInputStyles() {
  emailInput.classList.remove("notify-form__input--invalid");
  emailInput.classList.remove("notify-form__input--valid");
}

function setInvalidInput() {
  emailInput.classList.toggle("notify-form__input--invalid", true);
  emailInput.classList.toggle("notify-form__input--valid", false);
}

function setValidInput() {
  emailInput.classList.toggle("notify-form__input--invalid", false);
  emailInput.classList.toggle("notify-form__input--valid", true);
}

function showErrorLabel(message) {
  errorLabel.classList.toggle("notify-form__label--invalid", true);
  errorLabel.textContent = message;
}

function hideErrorLabel() {
  errorLabel.classList.toggle("notify-form__label--invalid", false);
  errorLabel.textContent = "";
}

function submitForm(event) {
  event.preventDefault();

  if (emailInput.classList.contains("notify-form__input--valid")) {
    setTimeout(() => {
      showNotification(
        "Success! Your email has been successfully sent. Thank you for subscribing and being a part of our community."
      );
    }, 750);

    emailInput.value = "";
    
    resetInputStyles();
    hideErrorLabel();

    localStorage.removeItem("email");
  }
}

function handleButtonClick() {
  if (!emailInput.classList.contains("notify-form__input--valid")) {
    emailInput.focus();
  }

  submitForm;
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notification__text");

  notificationText.textContent = message;
  notification.classList.toggle("show", true);

  setTimeout(() => {
    notification.classList.toggle("show", false);
  }, 8000);
}

window.onload = function () {
  const savedEmail = localStorage.getItem("email");

  if (savedEmail) {
    emailInput.value = savedEmail;
    validateEmail();
  }
};
