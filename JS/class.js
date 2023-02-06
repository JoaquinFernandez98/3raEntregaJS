//constructora
class Producto {
    constructor(id, bebida, marca, precio){
        this.id = id,
        this.bebida = bebida,
        this.marca = marca,
        this.precio = precio
        
    }
    mostrarInfoProducto(){
        console.log(`La bebida es ${this.bebida}, la marca es ${this.marca} y su precio es ${this.precio}`)
    }
}

const producto1 = new Producto(1, "Agua", "Villavicencio", 200)

const producto2 = new Producto(2, "Bebida cola", "Coca-Cola", 450)

const producto3 = new Producto(3, "Cerveza", "Heineken", 600)

const producto4 = new Producto(4, "Fernet", "Branca", 8000)

const producto5 = new Producto(5, "Whisky", "Jack Daniels", 15000)

const producto6 = new Producto(6, "Vino", "Trumpeter", 11000)


const carrito = [producto1, producto2, producto3, producto4, producto5, producto6]

//Storage
let gondola = []
if(localStorage.getItem("gondola")){
    gondola = JSON.parse(localStorage.getItem("gondola"))
}else{
    console.log("Seteando stock de productos")
    gondola.push(producto1,producto2,producto3,producto4,producto5,producto6)
    localStorage.setItem("gondola", JSON.stringify(gondola))
}
