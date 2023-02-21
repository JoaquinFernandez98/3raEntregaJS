//DarkMode:
// let botonDarkMode = document.getElementById("botonDarkMode")
// let botonLightMode = document.getElementById("botonLightMode")
// let eliminarModeBtn = document.getElementById("eliminarMode")

// let modoOscuro 
// if(localStorage.getItem("modoOscuro")){
//     modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
// }else{
//     console.log("Entra por primera vez")
//     localStorage.setItem("modoOscuro", false)
//     modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
// } 

// if(modoOscuro == true){
//     document.body.classList.add("darkMode")
// }else{
//     document.body.classList.remove("darkMode")
// }

// botonDarkMode.addEventListener("click",()=>{
//     console.log("Btn oscuro funciona")
//     document.body.classList.add("darkMode")
//     localStorage.setItem("modoOscuro", true)
// })

// botonLightMode.addEventListener("click",()=>{
//     console.log("Btn claro funciona")
//     document.body.classList.remove("darkMode")
//     localStorage.setItem("modoOscuro", false)
// })


const botonDarkMode = document.getElementById("botonDarkMode");
const botonLightMode = document.getElementById("botonLightMode");
const eliminarModeBtn = document.getElementById("eliminarMode");
const modoOscuro = JSON.parse(localStorage.getItem("modoOscuro") || "false");

document.body.classList.toggle("darkMode", modoOscuro);

botonDarkMode.addEventListener("click", () => {
  console.log("Btn oscuro funciona");
  document.body.classList.add("darkMode");
  localStorage.setItem("modoOscuro", true);
});

botonLightMode.addEventListener("click", () => {
  console.log("Btn claro funciona");
  document.body.classList.remove("darkMode");
  localStorage.setItem("modoOscuro", false);
});