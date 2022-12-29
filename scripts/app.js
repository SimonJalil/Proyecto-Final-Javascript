//debugger

/* VARIABLES GLOBALES */
let menu;  
let precio;
let nombre;
let stock = 3;


/* VARIABLES DOM */
let tbody = document.querySelector("#tabla_producto");
let inputBuscar = document.querySelector("#inputBuscar");

let nombreForm = document.querySelector("#nombre");
let emailForm = document.querySelector("#email");
let productoForm = document.querySelector("#producto");
let cantidadForm = document.querySelector("#cantidad");
let formulario = document.querySelector("#form");
let aviso = document.querySelector("#aviso");

let tcompras = document.querySelector("#tabla_compras");

/* CLASES */ 
class producto{
    constructor(id, nombre, precio, stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

/* OBJETOS */
const producto1 = new producto(1, "PLACA DE VIDEO", 10000, stock);
const producto2 = new producto(2, "TECLADO", 2000, stock);
const producto3 = new producto(3, "MOUSE", 1500, stock);

/* ARREGLOS */
const productos = [producto1, producto2, producto3];

/* ARMAR TABLA */
const armarTabla = (prod) => {
    return `<tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td> 
            </tr> 
    `
}

// Funcion para cargar productos en una tabla
const cargarProductos = (array) => {
    let tabla = "";
    if(array.length > 0){
        array.forEach(prod => {
            tabla += armarTabla(prod);
        })
        tbody.innerHTML = tabla;
    }
}

// Funcion filtrar productos por busqueda
const filtrarProductos = () => {
    let parametro = inputBuscar.value.trim().toUpperCase();
    //console.log(parametro);
    let resultado = productos.filter(prod => prod.nombre.includes(parametro))
    if(resultado.length > 0){
        cargarProductos(resultado);
    }
}

const cargarCompra = () => {
    const compraArray = JSON.parse(localStorage.getItem("Compra"));
    tcompras.innerHTML = `
    <tr>
        <td>${compraArray[0]}</td>
        <td>${compraArray[1]}</td>
        <td>${compraArray[2]}</td> 
        <td>${compraArray[3]}</td> 
    </tr>  
    `; 
}

/* MAIN */
const comprasArray = JSON.parse(localStorage.getItem("Compra"));
cargarProductos(productos);


/* EVENTOS */ 
inputBuscar.addEventListener("search", ()=>{
    filtrarProductos();
})

nombreForm.addEventListener("input", function (){
    if(nombreForm.value === ""){
        alert("Ingrese un nombre valido por favor.");
    }
})

emailForm.addEventListener("input", function (){
    if(emailForm.value === ""){
        alert("Ingrese un email valido por favor.");
    }
})

productoForm.addEventListener("input", function (){
    if(productoForm.value != 1 && productoForm.value != 2 && productoForm.value != 3){
        alert("Ingrese un producto valido por favor.");
    } 
})

cantidadForm.addEventListener("input", function (){
    if(cantidadForm.value === ""){
        alert("Ingrese una cantidad valida por favor.");
    }   
})

const imprimirData = formulario.addEventListener("submit", function(e){
    e.preventDefault();
    aviso.innerHTML = `
    <div class="alert alert-warning" role="alert">
        <h5> Muchas gracias  ${nombreForm.value} por tu compra, te enviamos la factura a ${emailForm.value}. </h5>
    </div>
    `;

    /* ALMACENAR EN LOCAL STORAGE */
    const array = [nombreForm.value,emailForm.value, productoForm.value, cantidadForm.value];
    const aJson  = JSON.stringify(array);
    localStorage.setItem("Compra",aJson);

    /* MOSTRAR LA COMPRA EFECTUADA */
    cargarCompra();
})