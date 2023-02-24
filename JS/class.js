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

//JSON y storage
let carrito = []
let gondola = []

fetch('gondola.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      let newproduct = item;
      carrito.push(newproduct);
    });
    gondola = JSON.parse(localStorage.getItem('gondola')) ?? [...carrito]
    localStorage.setItem('gondola', JSON.stringify(gondola))
    console.log(carrito);
  })
  .catch(error => console.error(error));


