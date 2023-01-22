// ARREGLO DE PRODUCTOS
const stockProductos = [
    {
			id: 1, 
			nombre: "Mouse",
			cantidad: 1, 
			desc: "Mouse con cable USB",
			precio: 700, 
			img: "images/mouse.svg" 
    },			
    
    {
			id: 2, 
			nombre: "Monitor",
			cantidad: 1,
			desc: "Monitor 17''",
			precio: 1000,
			img: "images/monitor.svg"
    },

    {
			id: 3, 
			nombre: "Teclado",
			cantidad: 1,
			desc: "Teclado inalambrico",
			precio: 500,
			img: "images/teclado.svg"
    },

		{
			id: 4, 
			nombre: "Laptop",
			cantidad: 1,
			desc: "Laptop intel i7",
			precio: 2000,
			img: "images/notebook.jpg"
		},

    {
			id: 5, 
			nombre: "Ropa interior femenina",
			cantidad: 1,
			desc: "Ropa interior",
			precio: 800,
			img: "images/bombacha.svg"
		},

    {
			id: 6, 
			nombre: "Cigarro electronico",
			cantidad: 1,
			desc: "Vaper",
			precio: 2000,
			img: "images/cigarrillo.svg"
		},

    {
			id: 7, 
			nombre: "Brazalete",
			cantidad: 1,
			desc: "Brazalete dorado",
			precio: 300,
			img: "images/brazalete.svg"
		},

    {
			id: 8, 
			nombre: "Boxer",
			cantidad: 1,
			desc: "Ropa interior masculina",
			precio: 1000,
			img: "images/boxer.svg"
		},

    {
			id: 9, 
			nombre: "Zapatillas Running",
			cantidad: 1,
			desc: "Zapatillas color Rojo",
			precio: 1200,
			img: "images/zapatillas.jpg"
		},

    {
			id: 10, 
			nombre: "Pelota de futból 5",
			cantidad: 1,
			desc: "Pelota futbol 5 clasica",
			precio: 2000,
			img: "images/pelota.jpg"
		},
];

// API REST OTROS PRODUCTOS
function cargarProductos(){
  fetch('https://fakestoreapi.com/products')
    .then(function(res){
      return res.json();
    })
    .then((data) => {
      pintarProductos(data);
    })
}


// VARIABLES Y ARREGLOS
let carrito = [];
const contenedor = document.querySelector('#contenedor');
const carritoContenedor = document.querySelector('#carritoContenedor');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const precioTotal = document.querySelector('#precioTotal');
const procesarCompra = document.querySelector('#procesarCompra');
const activarFuncion = document.querySelector('#activarFuncion');
const totalProceso = document.querySelector('#totalProceso');
const formulario = document.querySelector('#procesar-pago');
const top5 = document.querySelector('#top-5');

// EVENTO PARA PROCESAR PEDIDO
if(activarFuncion){
  activarFuncion.addEventListener('click', procesarPedido);
}

// EVENTO PARA ENVIAR FORMULARIO
if(formulario){
  formulario.addEventListener('submit', enviarPedido);
}
  

// EVENTO PARA ALMACENAR LA LISTA DE PRODUCTOS EN CARRITO ANTE ALGUNA RECARGA DE PAGINA
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  mostrarCarrito(); 

  if(activarFuncion){
  document.querySelector('#activarFuncion').click(procesarPedido);  
  }

  cargarProductos();
});


// GENERA TARJETAS DE CADA UNO DE LOS PRODUCTOS DEL ARRAY
stockProductos.forEach((prod) => {
    const {id, nombre, precio, desc, img, cantidad} = prod;  
    if(contenedor){
      contenedor.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${img}" class="card-img-top mt-2 imagen" alt="${desc}">
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

// EVENTO PARA PROCESAR LA COMPRA
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

// EVENTO PARA ELIMINAR EL CARRITO DE COMPRAS
if(vaciarCarrito){
  vaciarCarrito.addEventListener('click', () => {
    carrito.length = [];
    mostrarCarrito();
  }) 
}

// FUNCION PARA AGREGAR PRODUCTOS AL CARRITO DE COMPRAS
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

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Agregado al carrito',
    showConfirmButton: false,
    timer: 1500
  })
  mostrarCarrito();
}


// METODO PARA MOSTRAR EL CARRITO DE COMPRAS
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


// METODO PARA ELIMINAR PRODUCTO DE CARRITO
function eliminarProducto(id){
  const productoId = id;
  carrito = carrito.filter((prod) => prod.id != productoId);
  console.log(carrito);
  mostrarCarrito();
} 

// METODO PARA ALMACENAR EN STORAGE EL CARRITO
function guardarStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// FUNCION PARA PROCESAR PEDIDO
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

// FUNCION PARA ENVIAR EL PEDIDO
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

//FUNCION PARA PINTAR LOS PRODUCTOS DE LA API
function pintarProductos(data){
  
  data.forEach((data) => {
    const{id, category, image, price, title} = data;
    if(id < 6){
      top5.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top imagen" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${category}.</p>
          <p class="card-text">$${price}</p>
        </div>
      </div>    
    `;
    }
  })
}