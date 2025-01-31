
let productos = document.getElementById("productos")
let guardarProductoBtn = document.getElementById("guardarProductoBtn")
let verCatalogoBtn = document.getElementById("verCatalogo")
let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
const VaciarCarritoBtn = document.getElementById("botonVaciar")
const quitarBtn = document.getElementById("quitarBtn")
const finalizarCompra = document.getElementById("botonFinalizarCompra")



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
                            <img src="./imagenes/imagen${producto.id}.jpg"/>
                            <p class="">Precio: $${producto.precio}</p>
                        <button id="agregarBtn${producto.id}" class="btn btn-outline-success" >Agregar al carrito</button>
                <div class='botonesMasMenos' id='btnMasMenos${producto.id}' style='display:none'>  
                        <button id="menos${producto.id}">-</button>
                        <span id="contador${producto.id}">${producto.cantidad}</span>
                        <button id="mas${producto.id}">+</button>
                </div>
                </div>
        </div>`

        //Agregar al carrito
        productos.appendChild(nuevoProducto)
        let btnAgregar = document.getElementById(`agregarBtn${producto.id}`)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(producto)
            btnAgregar.style.display = 'none'
            document.getElementById(`contador${producto.id}`).innerHTML = producto.cantidad
            document.getElementById(`btnMasMenos${producto.id}`).style.display = 'inline'
        })
        //boton mas
        let btnMas = document.getElementById(`mas${producto.id}`)
        btnMas.addEventListener("click", ()=>{
            producto.cantidad += 1
            producto.subtotal = producto.subtotal + producto.precio
            let plantilla = document.getElementById(`productoCarrito${producto.id}`)
            plantilla.innerHTML = `${producto.cantidad} - ${producto.bebida} - ${producto.marca}: -------------------  $${producto.subtotal} <button id="quitarBtn" onclick="quitarDelCarrito(${producto.id})" class="btn btn-danger btn-sm">Quitar</button>`
            actualizarPrecioTotal(productosEnCarrito)
            document.getElementById(`contador${producto.id}`).innerHTML = producto.cantidad
        })

        //boton menos
        let btnMenos = document.getElementById(`menos${producto.id}`)
        btnMenos.addEventListener("click", ()=>{
            producto.cantidad -= 1
            producto.subtotal = producto.subtotal - producto.precio
            let plantilla = document.getElementById(`productoCarrito${producto.id}`)
            plantilla.innerHTML = `${producto.cantidad} - ${producto.bebida} - ${producto.marca}: -------------------  $${producto.subtotal} <button id="quitarBtn" onclick="quitarDelCarrito(${producto.id})" class="btn btn-danger btn-sm">Quitar</button>`
            actualizarPrecioTotal(productosEnCarrito)
            document.getElementById(`contador${producto.id}`).innerHTML = producto.cantidad
        })
        
    }
}


let productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || []

// AGREGAR PRODUCTO EXISTENTE AL CARRITO
function agregarAlCarrito(producto){
    producto.cantidad = 1
    producto.subtotal = producto.precio
    productosEnCarrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    const carrito = document.getElementById('modal-bodyCarrito')
    let plantilla = document.createElement('div')
    plantilla.innerHTML = `<li id="productoCarrito${producto.id}"> ${producto.cantidad} - ${producto.bebida} - ${producto.marca}: -------------------  $${producto.subtotal} <button id="quitarBtn" onclick="quitarDelCarrito(${producto.id})" class="btn btn-danger btn-sm">Quitar</button></li>
                `
    carrito.appendChild(plantilla)
    actualizarPrecioTotal(productosEnCarrito)

}


//Quitar del carrito
const quitarDelCarrito = (id) => {
    for (let i = 0; i < productosEnCarrito.length; i++) {
        if (productosEnCarrito[i].id === id) {
            productosEnCarrito.splice(i, 1);
            const storage = JSON.parse(localStorage.getItem('carrito'))
            const filtrarCarrito = storage.filter((producto => producto.id !== id))
            localStorage.setItem('carrito', JSON.stringify(filtrarCarrito))
            document.getElementById(`productoCarrito${id}`).remove()
            break;
        }
    }
    actualizarPrecioTotal(productosEnCarrito)
    mostrarCatalogo(gondola)
    document.getElementById(`agregarBtn${id}`).style.display = 'inline'
    document.getElementById(`btnMasMenos${id}`).style.display = 'none'
    

}


const actualizarPrecioTotal = (productosEnCarrito) => {
    let precioTotal = 0
    for (let producto of productosEnCarrito) {
        precioTotal += Number(producto.subtotal)
    }
    let element = document.getElementById('precioTotal')
    element.innerHTML = `Precio total:  <span class="badge bg-success">$${precioTotal}</span>`
}

//Cargar producto nuevo
function cargarProducto(array){
    
    let inputMarca = document.getElementById("marcaInput")
    let inputBebida = document.getElementById("bebidaInput")
    let inputPrecio = document.getElementById("precioInput")
    let inputImagen = document.getElementById("imagenInput")

    if (inputImagen.value === "" || inputMarca.value  === "" || inputBebida.value === "" || inputPrecio.value === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Todos los campos son obligatorios',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        return
    }

    const productoNuevo = new Producto(array.length+1, inputMarca.value, inputBebida.value, inputPrecio.value, inputImagen.value)
    console.log(productoNuevo)
    array.push(productoNuevo)
    localStorage.setItem("gondola", JSON.stringify(array))
    mostrarCatalogo(array)

    inputMarca.value = ""
    inputBebida.value = ""
    inputPrecio.value = ""
    inputImagen.value = ""
}

//Buscador
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

//Ordenar productos
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


guardarProductoBtn.addEventListener("click", ()=>{
    cargarProducto(gondola)
})

//Catalogo y compra
verCatalogoBtn.onclick = () => {
    mostrarCatalogo(gondola)
    Toastify({
        text: "Prohibida la venta de bebidas alcohólicas a menores de 18 años",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #4b0082, #0f0f0f)",
        },
        onClick: function(){}
      }).showToast();
    
      document.getElementById('fotoInicio').style.display = 'none'
    document.getElementById('verCatalogo').style.display = 'none'
    document.getElementById('ocultarCatalogo').style.display = 'block'
    
}

ocultarCatalogoBtn.onclick = function(){
    productos.innerHTML = ""

    document.getElementById('fotoInicio').style.display = 'flex'
    document.getElementById('ocultarCatalogo').style.display = 'none'
    document.getElementById('verCatalogo').style.display = 'block'
}

buscador.addEventListener("input", ()=>{
    document.getElementById('fotoInicio').style.display = 'none'
    buscarInfo(buscador.value, gondola)
}) 



VaciarCarritoBtn.onclick = () => {
    if (productosEnCarrito.length === 0) {
        Swal.fire({
            title: 'Error!',
            text: '¡El carrito está vacío!',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        return
    }
    document.getElementById('modal-bodyCarrito').innerHTML = ''
    localStorage.clear()
    productosEnCarrito = []
    actualizarPrecioTotal(productosEnCarrito)  
    mostrarCatalogo(gondola)
    document.getElementById(`agregarBtn${id}`).style.display = 'inline'
    document.getElementById(`btnMasMenos${id}`).style.display = 'none'
}

selectOrden.addEventListener("change", ()=>{
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


const selector = document.getElementById('selectOrden')
selector.onclick = () => {
    const item = document.getElementById('ordenarPor')
    item.remove()
}

finalizarCompra.onclick = () => {
    Swal.fire({
        title: 'Compra exitosa',
        text: '¡Muchas gracias por su compra!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
}


