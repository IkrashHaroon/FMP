console.log("JS Loaded Successfully 🔥");
import { db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

const form = document.getElementById("appointmentForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email_address.value;
  const phone = form.phone.value;
  const category = form.category.value;
  const date = form.date.value;
  const message = form.message.value;

  const appointmentRef = ref(db, "appointments");

  push(appointmentRef, {
    name: name,
    email: email,
    phone: phone,
    category: category,
    date: date,
    message: message,
    createdAt: new Date().toISOString()
  })
  .then(() => {
    alert("Appointment Booked Successfully");
    form.reset();
  })
  .catch((error) => {
    console.error(error);
    alert("Error submitting form");
  });

});
