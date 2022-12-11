//debugger
/* COMIENZO DEL PROGRAMA */
alert("Bienvenidos a Techno Shop");
alert("Tu tienda electronica favorita!!!")

/* VARIABLES GLOBALES */
let menu;  
let precio;
let nombre;
let stock = 3;

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
const producto1 = new producto(1, "Placa de video", 10000, stock);
const producto2 = new producto(2, "Teclado", 2000, stock);
const producto3 = new producto(3, "Mouse", 1500, stock);

/* ARREGLOS */
const productos = [producto1, producto2, producto3];


/* FUNCIONES */
// Funcion de busqueda por nombre
function buscarNombre() {
    nombre = prompt("Ingrese nombre a buscar por favor.");
    const resultado = productos.find((item) => item.nombre === nombre); 
    if(resultado != null){
        alert(`Nombre: ${resultado.nombre}, Precio: ${resultado.precio}, Stock: ${resultado.stock}.`);
    }else{
        alert("No hay elementos que coincidan con la busqueda.");
    }
}

// Funcion de filtro por precio
function filtrarPrecio() {
    precio = Number(prompt("Ingrese precio a filtrar por favor."));
    const resultado = productos.filter((item) => item.precio < precio);
    if(resultado.length != 0){
        resultado.forEach((item) => {
            alert(`Nombre: ${item.nombre}, Precio: ${item.precio}, stock: ${item.stock}.`);
        }); 
    }else{
        alert("No hay elementos que coincidan con la busqueda.");
    }
}

// Funcion verTienda: Permite ver todos los productos.
function verTienda() {
    const listaProductos = productos.map ((item) => {
        return{
            nombre: item.nombre,
            precio: item.precio,
            stock: item.stock
        }
     }
    );

    listaProductos.forEach((item) => {
        alert(`Nombre: ${item.nombre}, Precio: ${item.precio}, Stock: ${item.stock}.`);
    }); 
}

// Funcion Comprar equipo
function comprarEquipo(){
    let menuCompras = Number(prompt("Seleccione equipo a comprar:\n 1) Placa de video.\n 2) Teclado.\n 3) Mouse."));

    switch (menuCompras) {
        case 1:
            if(productos[0].stock != 0){
                productos[0].stock = productos[0].stock - 1;
                alert("Gracias por su compra!!!"); 
            }else{
                alert("No hay stock del producto.");
            }
            break;
        case 2: 
            if(productos[1].stock != 0){
                productos[1].stock = productos[1].stock - 1;
                alert("Gracias por su compra!!!"); 
            }else{
                alert("No hay stock del producto.");
            }
            break; 
        case 3:
            if(productos[2].stock != 0){
                productos[2].stock = productos[2].stock - 1;
                alert("Gracias por su compra!!!"); 
            }else{
                alert("No hay stock del producto.");
            }
            break;
        default:
            alert("Opción no valida.");
            break;
    }
}




// MAIN
do {
    menu = Number(prompt("Ingrese una opcion de la lista, por favor.\n 1) Ver Tienda.\n 2) Comprar.\n 3) Filtre por precio.\n 4) Busque un producto.\n 5) Salir."));
    
    switch (menu) {
        case 1:
            verTienda();
            break;
        case 2:
            comprarEquipo();
            break;
        case 3: 
            filtrarPrecio();
            break;
        case 4:
            buscarNombre();
            break;
        case 5:
            alert("Gracias. Vuelva pronto.");
            break;
        default:
            alert("Opcion no valida.");
            break;
    }
    
} while (menu != 5);

 



