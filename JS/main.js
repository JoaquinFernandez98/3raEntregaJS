
let productos = document.getElementById("productos")
let guardarProductoBtn = document.getElementById("guardarProductoBtn")
let verCatalogoBtn = document.getElementById("verCatalogo")
let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")


function mostrarCatalogo(array){
    productos.innerHTML = ""
    for(let producto of array){
        
        let nuevoProducto = document.createElement("div")
        nuevoProducto.classList.add("col-12", "col-md-6", "col-lg-4", "my-3")
        nuevoProducto.innerHTML = `
        <div id="${producto.id}" class="card" style="width: 18rem;">
                <div class="card-body">
                            <h4 class="card-title">${producto.bebida}</h4>
                            <p>Marca: ${producto.marca}</p>
                            <p class="">Precio: ${producto.precio}</p>
                        <button id="agregarBtn${producto.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
        </div>`
        productos.appendChild(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${producto.id}`)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(producto)
            
        })
    }
}

//array de productosComprados
// let productosEnCarrito 
// if(localStorage.getItem("carrito")){
//     productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
// }else{
//     productosEnCarrito = []
// }

let productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || []

function agregarAlCarrito(producto){
    console.log(`El producto ${producto.bebida} de ${producto.marca} ha sido agregado. Vale ${producto.precio}`)
    productosEnCarrito.push(producto)
    console.log(productosEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}
function cargarProducto(array){
    
    let inputMarca = document.getElementById("marcaInput")
    let inputBebida = document.getElementById("bebidaInput")
    let inputPrecio = document.getElementById("precioInput")

    const productoNuevo = new Producto(array.length+1, inputMarca.value, inputBebida.value, inputPrecio.value, "bebidasGondola.jpg")
    console.log(productoNuevo)
    array.push(productoNuevo)
    console.log(array)
    localStorage.setItem("gondola", JSON.stringify(array))
    mostrarCatalogo(array)

    inputMarca.value = ""
    inputBebida.value = ""
    inputPrecio.value = ""
}

function buscarInfo(buscado, array){
    let busquedaArray = array.filter(
        (producto) => producto.marca.toLowerCase().includes(buscado.toLowerCase()) || producto.bebida.toLowerCase().includes(buscado.toLowerCase())
    ) 

    if(busquedaArray.length == 0){
        coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`
        mostrarCatalogo(busquedaArray)
    }else{
        coincidencia.innerHTML = ""
        mostrarCatalogo(busquedaArray)

    }
}
//ordenar:

function ordenarMenorMayor(array){
    const menorMayor = [].concat(array)
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}
function ordenarMayorMenor(arr){
const mayorMenor = [].concat(arr)
mayorMenor.sort((param1, param2)=>{
    return param2.precio - param1.precio
})
mostrarCatalogo(mayorMenor)
}
function ordenarAlfabeticamenteBebida(array){
const ordenadoAlfabeticamente = [].concat(array)
 ordenadoAlfabeticamente.sort((a,b) => {
      if(a.bebida > b.bebida) {
        return 1
      }
      if (a.bebida < b.bebida) {
        return -1
      }
      return 0;
})
mostrarCatalogo(ordenadoAlfabeticamente)
}

//EVENTOS:
guardarProductoBtn.addEventListener("click", ()=>{
    cargarProducto(gondola)
})

verCatalogoBtn.onclick = () => {
    mostrarCatalogo(gondola)
}

ocultarCatalogoBtn.ondblclick = function(){
    productos.innerHTML = ""
}
buscador.addEventListener("input", ()=>{
    buscarInfo(buscador.value, gondola)
}) 

selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(gondola)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(gondola)
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamenteBebida(gondola)
    }else{
        mostrarCatalogo(gondola)
    }
})
