//DarkMode:

const botonDarkMode = document.getElementById("botonDarkMode");
const botonLightMode = document.getElementById("botonLightMode");
const eliminarModeBtn = document.getElementById("eliminarMode");
const modoOscuro = JSON.parse(localStorage.getItem("modoOscuro") || "false");

document.body.classList.toggle("darkMode", modoOscuro);

botonDarkMode.addEventListener("click", () => {
  document.body.classList.add("darkMode");
  localStorage.setItem("modoOscuro", true);
});

botonLightMode.addEventListener("click", () => {
  document.body.classList.remove("darkMode");
  localStorage.setItem("modoOscuro", false);
});