const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const themeToggle = document.querySelector("#theme-toggle");
const greeting = document.querySelector("#greeting");
const yearElement = document.querySelector("#current-year");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function updateGreeting() {
  const hour = new Date().getHours();
  let message = "Olá, seja bem-vindo!";

  if (hour >= 5 && hour < 12) {
    message = "Bom dia! Que bom ter você por aqui.";
  } else if (hour >= 12 && hour < 18) {
    message = "Boa tarde! Que bom ter você por aqui.";
  } else {
    message = "Boa noite! Que bom ter você por aqui.";
  }

  greeting.textContent = message;
}

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

function setTheme(isLight) {
  document.documentElement.classList.toggle("light-theme", isLight);
  themeToggle.setAttribute("aria-label", isLight ? "Ativar modo escuro" : "Ativar modo claro");
  themeToggle.querySelector(".theme-icon").textContent = isLight ? "☾" : "☼";
}

themeToggle.addEventListener("click", () => {
  const isLight = !document.documentElement.classList.contains("light-theme");
  setTheme(isLight);
});

function showError(field, message, errorId) {
  const errorElement = document.querySelector(`#${errorId}`);
  errorElement.textContent = message;
  field.classList.toggle("invalid", Boolean(message));
  field.setAttribute("aria-invalid", String(Boolean(message)));
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const consent = document.querySelector("#consent");

  let isValid = true;

  if (name.value.trim() === "") {
    showError(name, "Por favor, informe seu nome.", "name-error");
    isValid = false;
  } else {
    showError(name, "", "name-error");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, "Digite um e-mail válido.", "email-error");
    isValid = false;
  } else {
    showError(email, "", "email-error");
  }

  if (message.value.trim() === "") {
    showError(message, "Escreva uma mensagem antes de continuar.", "message-error");
    isValid = false;
  } else {
    showError(message, "", "message-error");
  }

  const consentError = document.querySelector("#consent-error");
  if (!consent.checked) {
    consentError.textContent = "É necessário marcar o consentimento.";
    consent.setAttribute("aria-invalid", "true");
    isValid = false;
  } else {
    consentError.textContent = "";
    consent.setAttribute("aria-invalid", "false");
  }

  if (isValid) {
    formStatus.textContent = "Formulário validado! Esta é uma demonstração: a mensagem não foi enviada nem armazenada.";
    formStatus.className = "form-note success";
  } else {
    formStatus.textContent = "Confira os campos destacados antes de continuar.";
    formStatus.className = "form-note failure";
    const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
  }
});

document.querySelectorAll("#name, #email, #message").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.value.trim() !== "") {
      const errorId = `${field.id}-error`;
      showError(field, "", errorId);
    }
  });
});

document.querySelector("#consent").addEventListener("change", (event) => {
  document.querySelector("#consent-error").textContent = event.target.checked
    ? ""
    : "É necessário marcar o consentimento.";
  event.target.setAttribute("aria-invalid", String(!event.target.checked));
});

const sections = document.querySelectorAll("main section[id]");
const navigationItems = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navigationItems.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isCurrent);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

updateGreeting();
yearElement.textContent = new Date().getFullYear();
