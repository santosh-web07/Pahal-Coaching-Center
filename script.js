const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


// ================= MOBILE MENU =================

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show-menu");

  if (navMenu.classList.contains("show-menu")) {
    menuBtn.textContent = "✕";
    menuBtn.setAttribute("aria-label", "Close Menu");
  } else {
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-label", "Open Menu");
  }
});


// Close mobile menu after clicking a navigation link

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-label", "Open Menu");
  });
});


// ================= ENQUIRY FORM =================

const enquiryForm = document.getElementById("enquiryForm");
const studentName = document.getElementById("studentName");
const studentPhone = document.getElementById("studentPhone");
const courseSelect = document.getElementById("courseSelect");
const formMessage = document.getElementById("formMessage");


enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = studentName.value.trim();
  const phone = studentPhone.value.trim();
  const course = courseSelect.value;

  // Name validation

  if (name.length < 2) {
    formMessage.textContent = "❌ Please enter a valid name.";
    formMessage.style.color = "#dc2626";
    return;
  }


  // Indian phone number validation

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(phone)) {
    formMessage.textContent =
      "❌ Please enter a valid 10-digit Indian mobile number.";
    formMessage.style.color = "#dc2626";
    return;
  }


  // Course validation

  if (!course) {
    formMessage.textContent = "❌ Please select a course.";
    formMessage.style.color = "#dc2626";
    return;
  }


  // Save enquiry locally

  const enquiryData = {
    name: name,
    phone: phone,
    course: course,
    date: new Date().toLocaleString()
  };

  localStorage.setItem(
    "pahalEnquiry",
    JSON.stringify(enquiryData)
  );


  // Create WhatsApp message

  const whatsappMessage =
    `Hello Pahal Coaching Center,%0A%0A` +
    `I want admission information.%0A%0A` +
    `Student Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Course: ${encodeURIComponent(course)}`;


  const whatsappURL =
    `https://wa.me/919953041384?text=${whatsappMessage}`;


  // Success message

  formMessage.textContent =
    "✅ Enquiry ready! Opening WhatsApp...";

  formMessage.style.color = "#16a34a";


  // Open WhatsApp

  window.open(whatsappURL, "_blank");


  // Reset form

  enquiryForm.reset();
});


// ================= CURRENT YEAR =================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ================= PHONE INPUT =================

// Allow only numbers in phone field

studentPhone.addEventListener("input", () => {
  studentPhone.value = studentPhone.value.replace(/\D/g, "");
});
