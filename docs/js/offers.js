// js/offers.js
// Muestra la página de ofertas vacía.

import { jokeProducts } from './products.js';

// ----------------------------------------------------
// 🖼️ FUNCIÓN DE DIBUJO DE PRODUCTOS (Solo para el mensaje)
// ----------------------------------------------------
function renderProducts(productsToRender) {
    const productGrid = document.querySelector('#product-grid');
    if (!productGrid) {
        console.error("ERROR: No se encontró el elemento con ID 'product-grid'.");
        return; 
    }

    productGrid.innerHTML = ''; 

    if (productsToRender.length === 0) {
        // Mensaje de "No hay ofertas"
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px;">
                <h2>✨ ¡Vuelve pronto! Por ahora no tenemos ofertas.</h2>
                <p>Nuestros productos destacados siguen disponibles en el Inicio.</p>
            </div>
        `;
        return;
    }
    
    // (No se renderizarán productos porque el filtro devuelve vacío)
}

// ----------------------------------------------------
// 🎧 INICIALIZACIÓN (Ofertas)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('#product-grid');
    
    if (!productGrid) {
        return; 
    }
    
    // Filtro forzado a vacío (isOffer: false en products.js)
    const filtered = jokeProducts.filter(p => p.isOffer === true); 
    
    renderProducts(filtered);
});