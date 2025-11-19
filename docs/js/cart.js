// --- Inicializar carrito ---
function cargarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// --- AGREGAR PRODUCTO ---
export function agregarAlCarrito(producto) {
    const carrito = cargarCarrito();

    carrito.push(producto);

    guardarCarrito(carrito);

    alert("Producto agregado al carrito");
}

// --- OBTENER CARRITO COMPLETO ---
export function obtenerCarrito() {
    return cargarCarrito();
}

// --- ELIMINAR PRODUCTO ---
export function eliminarProducto(id) {
    let carrito = cargarCarrito();
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito(carrito);
}
