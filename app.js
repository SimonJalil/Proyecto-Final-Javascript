// ARREGLO DE PRODUCTOS
const stockProductos = [
    {
			id: 1, 
			nombre: "mouse",
			cantidad: 1, 
			desc: "Mouse con cable USB",
			precio: 700, 
			img: "/images/mouse.svg" 
    },			
    
    {
			id: 2, 
			nombre: "monitor",
			cantidad: 1,
			desc: "Monitor 17''",
			precio: 1000,
			img: "/images/monitor.svg"
    },

    {
			id: 3, 
			nombre: "teclado",
			cantidad: 1,
			desc: "Teclado inalambrico",
			precio: 500,
			img: "/images/teclado.svg"
    },

		{
			id: 4, 
			nombre: "laptop",
			cantidad: 1,
			desc: "Laptop intel i5",
			precio: 2000,
			img: "/images/notebook.jpg"
		}
];

let carrito = [];



const contenedor = document.querySelector('#contenedor');
const carritoContenedor = document.querySelector('#carritoContenedor');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const precioTotal = document.querySelector('#precioTotal');
const procesarCompra = document.querySelector('#procesarCompra');
const activarFuncion = document.querySelector('#activarFuncion');
const totalProceso = document.querySelector('#totalProceso');
const formulario = document.querySelector('#procesar-pago');


if(activarFuncion){
  activarFuncion.addEventListener('click', procesarPedido);
}

if(formulario){
  formulario.addEventListener('submit', enviarPedido);
}
  

// Metodo para almacenar la lista de productos en carritoante alguna recarga de pagina.
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  mostrarCarrito(); 

  if(activarFuncion){
  document.querySelector('#activarFuncion').click(procesarPedido);  
  }


});


// Generar Tarjetas para cada uno de los productos
stockProductos.forEach((prod) => {
    const {id, nombre, precio, desc, img, cantidad} = prod;  
    if(contenedor){
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
      <img src="${img}" class="card-img-top mt-2" alt="...">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion:${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button onclick="agregarProducto(${id})" class="btn btn-primary">Agregar al carrito</button>
      </div>
    </div>
    `
  }
})

// Evento para continuar con la compra
if(procesarCompra){
  procesarCompra.addEventListener('click',() => {
    if(carrito.length === 0){
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }else{
      location.href="compra.html"; 
      procesarPedido();
    }
  })
}

// Metodo para eliminar carrito de compras.
if(vaciarCarrito){
  vaciarCarrito.addEventListener('click', () => {
    carrito.length = [];
    mostrarCarrito();
  }) 
}

// Agregar producto al arreglo carrito.
function agregarProducto(id){
  const existe = carrito.some(prod => prod.id === id);
  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++;
      }
    })
  }else{
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item); 
  }

  mostrarCarrito();
}


// Metodo para mostrar carrito.
const mostrarCarrito = () => {
  const modalBody = document.querySelector('.modal .modal-body');
  if(modalBody){
    modalBody.innerHTML = '';
    carrito.forEach((prod) => {
      const {id, nombre, img, desc, cantidad, precio} = prod;
      modalBody.innerHTML += `
        <div class="modal-contenedor"> 
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          
          <div>
            <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}</p>
            <p>Cantidad: ${cantidad}</p>

            <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar producto</button>
          </div>
      `
    })
  }

  // Agrego mensaje de carrito vacio.
  if(carrito.length === 0){ 
    modalBody.innerHTML = `
      <p class="text-center text-primary parrafo"> Aun no agreagaste nada... </p>
    `;
  }

  // Aumento el numero de elementos del carrito.
  carritoContenedor.textContent = carrito.length;
  
  // Acumulardor para calcular el precio total de la lista
  if(precioTotal){
    precioTotal.innerHTML = carrito.reduce((acc,prod) => acc + prod.cantidad * prod.precio,0);
  }
  // Almaceno en local storage.
  guardarStorage();
}


// Metodo para eliminar producto de carrito.
function eliminarProducto(id){
  const productoId = id;
  carrito = carrito.filter((prod) => prod.id != productoId);
  console.log(carrito);
  mostrarCarrito();
} 

// Metodo para almacenar en Storage el carrito.
function guardarStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function procesarPedido(){
  carrito.forEach((prod) =>{
    const listaCompra = document.querySelector('#lista-compra tbody');
    const {id,nombre,precio,cantidad,img} = prod;

    if(listaCompra){
      const  row = document.createElement('tr');
      row.innerHTML += `
        <td>
          <img class="img-fluid img-carrito" src="${img}"/>
        </td> 

        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${precio*cantidad}</td>
      `;

      listaCompra.appendChild(row);
    } 
  });
  
  if(totalProceso){
    totalProceso.innerText = carrito.reduce((acc,prod) => acc + prod.cantidad * prod.precio, 0);
  }
  
}


function enviarPedido(e){
  e.preventDefault();
  const cliente = document.querySelector('#cliente').value;
  const email = document.querySelector('#correo').value;

  if(email === '' || cliente == ''){
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
  })
  }else{
    const spinner = document.querySelector('#spinner');
    spinner.classList.add('d-flex');
    spinner.classList.remove('d-none');

    setTimeout(() => {
      spinner.classList.remove('d-flex');
      spinner.classList.add('d-none');
      formulario.reset();
    },3000); 

    const alertExito = document.createElement('p')
    alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
    alertExito.textContent = 'Compra realizada correctamente'
    formulario.appendChild(alertExito); 

    setTimeout(() => {
      alertExito.remove()
    }, 3000)

    localStorage.clear();
  }   
}