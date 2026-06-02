const whatsappForm = document.querySelector("#whatsapp-form");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".main-menu a");
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentImage = 0;

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

whatsappForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#contact-name").value.trim();
  const phone = document.querySelector("#contact-phone").value.trim();
  const message = document.querySelector("#contact-message").value.trim();
  const text = [
    "Olá, gostaria de solicitar um orçamento.",
    name ? `Nome: ${name}` : "",
    phone ? `Telefone: ${phone}` : "",
    message ? `Mensagem: ${message}` : ""
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/5511970124349?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank", "noopener");
});

function showImage(index) {
  currentImage = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentImage];
  const title = item.dataset.title;

  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = title;
  lightboxCaption.textContent = title;
}

function openLightbox(index) {
  showImage(index);
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  closeButton.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", () => showImage(currentImage - 1));
nextButton.addEventListener("click", () => showImage(currentImage + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
    closeMenu();
  }

  if (event.key === "ArrowLeft") {
    showImage(currentImage - 1);
  }

  if (event.key === "ArrowRight") {
    showImage(currentImage + 1);
  }
});
