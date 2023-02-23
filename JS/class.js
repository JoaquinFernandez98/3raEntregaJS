//Constructora
class Producto {
    constructor(id, bebida, marca, precio, imagen, cantidad, subtotal){
        this.id = id,
        this.bebida = bebida,
        this.marca = marca,
        this.precio = precio,
        this.imagen = imagen,
        this.cantidad = cantidad,
        this.subtotal = subtotal
    }
    mostrarInfoProducto(){
        
    }
}

const producto1 = new Producto(1, "Agua", "Villavicencio", 200, '', 0, 0)

const producto2 = new Producto(2, "Bebida cola", "Coca-Cola", 450, '', 0)

const producto3 = new Producto(3, "Cerveza", "Heineken", 600,'', 0, 0)

const producto4 = new Producto(4, "Fernet", "Branca", 8000,'', 0, 0)

const producto5 = new Producto(5, "Whisky", "Jack Daniels", 15000,'', 0, 0)

const producto6 = new Producto(6, "Vino", "Trumpeter", 11000,'', 0, 0)


const carrito = [producto1, producto2, producto3, producto4, producto5, producto6]

//Storage
let gondola = JSON.parse(localStorage.getItem('gondola')) ?? [...carrito]

localStorage.setItem('gondola', JSON.stringify(gondola))