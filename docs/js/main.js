import { jokeProducts } from './products.js';

// ================================
// 🟢 Cargar productos creados por el usuario
// ================================
function getUserProducts() {
    const saved = localStorage.getItem("userProducts");
    return saved ? JSON.parse(saved) : [];
}

// Mezcla los productos base con los creados por el usuario
function getAllProducts() {
    return [...jokeProducts, ...getUserProducts()];
}


// ----------------------------------------------------
// 🖼️ MAPA DE IMÁGENES PERSONALIZADAS PARA CATEGORÍAS 🖼️
// ----------------------------------------------------
const CATEGORY_IMAGES = {
    'Armas Cuerpo a Cuerpo': 'imagenes/categorias/cuchillo.png',
    'Armas de Fuego': 'imagenes/categorias/arma.jpg',
    'Armas de Energía': 'imagenes/categorias/arma energia.png',
    'Dispositivos de Viaje': 'imagenes/categorias/portal.jpg',
    'Herramientas': 'imagenes/categorias/martillo.jpg',
    'Ítems Mágicos': 'imagenes/categorias/magia.png',
};

let currentCategoryFilter = null; // Variable para mantener la categoría actual

// ----------------------------------------------------
// 💡 FUNCIONES AUXILIARES DE PRECIO Y FILTROS
// ----------------------------------------------------

/**
 * Convierte el precio de string ($X,XXX) a un número flotante limpio.
 * CORREGIDO: Maneja el formato con comas como separador de miles.
 * @param {string} priceString - Precio en formato string (ej: "$95,000").
 * @returns {number} Precio numérico (ej: 95000).
 */
function getNumericPrice(priceString) {
    if (!priceString) return 0;
    
    // 1. Elimina el signo de peso ($), cualquier espacio y todas las comas (separadores de miles).
    const cleanString = priceString.replace('$', '').trim().replace(/,/g, ''); 
    
    // 2. Parsea el número.
    return parseFloat(cleanString) || 0; 
}

// ----------------------------------------------------
// 💾 FUNCIONES DE HISTORIAL
// ----------------------------------------------------
function getHistory() {
    const history = localStorage.getItem('viewedHistory');
    return history ? JSON.parse(history) : [];
}

function saveHistory(history) {
    localStorage.setItem('viewedHistory', JSON.stringify(history));
}

function addToHistory(product) {
    let history = getHistory();
    history = history.filter(p => p.id !== product.id);
    history.unshift({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price
    });
    if (history.length > 20) {
        history.pop();
    }
    saveHistory(history);
}

function clearHistory() {
    let confirmClear = true;
    if (document.body.classList.contains('showing-history')) {
        confirmClear = confirm('¿Estás seguro de que quieres vaciar TODO el historial de navegación?');
    }

    if (confirmClear) {
        localStorage.removeItem('viewedHistory');
        if (document.body.classList.contains('showing-history')) {
            renderHistory();
        }
    }
}


// ----------------------------------------------------
// 🖼️ FUNCIÓN CENTRAL DE DIBUJO DE PRODUCTOS
// ----------------------------------------------------
function renderProducts(productsToRender) {
    const productGrid = document.querySelector('#product-grid');
    if (!productGrid) {
        console.error("ERROR: No se encontró el elemento con ID 'product-grid'.");
        return;
    }

    const isHistory = document.body.classList.contains('showing-history');
    productGrid.innerHTML = ''; // Limpia la cuadrícula

    if (productsToRender.length === 0) {
        let message = '😔 No se encontraron productos que coincidan.';
        if (isHistory) {
            message = '⌛ Tu historial de navegación está vacío.';
        } else if (document.body.classList.contains('showing-offers')) {
            message = '✨ ¡Vuelve pronto! Por ahora no tenemos ofertas.';
        }
        
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px;">
                <h2>${message}</h2>
            </div>
        `;
        return;
    }

    // Si estamos en Historial, dibujamos el botón de "Vaciar" primero
    if (isHistory) {
        const headerControl = document.createElement('div');
        headerControl.style.cssText = `
            grid-column: 1 / -1;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 100%;
        `;
        headerControl.innerHTML = `
            <h2 style="margin: 0;">⌛ Historial de Productos Vistos</h2>
            <button id="clear-history-button" style="background-color: #f44336; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Vaciar Historial</button>
        `;
        productGrid.appendChild(headerControl);
        
        headerControl.querySelector('#clear-history-button').addEventListener('click', clearHistory);
    }

    // Dibujamos las tarjetas de producto
    productsToRender.forEach(product => {
        // Usamos la función corregida para obtener el precio numérico
        let numericPrice = getNumericPrice(product.price);
        
        let monthlyInstallmentMessage = 'Consultar cuotas';
        if (numericPrice > 0) {
            const installmentValue = numericPrice / 12;
            const formattedInstallment = installmentValue.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            monthlyInstallmentMessage = `12 cuotas de $${formattedInstallment}`;
        }

        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <a href="producto.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </a>
            
            <div class="product-info-bottom">
                <p class="product-price">${product.price}</p>
                <p class="product-installment">${monthlyInstallmentMessage}</p>
            </div>
        `;

        card.addEventListener('click', (e) => {
            e.preventDefault(); 
            addToHistory(product);
            window.location.href = `producto.html?id=${product.id}`;
        });

        productGrid.appendChild(card);
    });
    
    document.body.classList.remove('showing-offers');
    if (!isHistory) {
        document.body.classList.remove('showing-history');
    }
}


// ----------------------------------------------------
// 🧠 FUNCIÓN CENTRAL DE APLICAR FILTROS Y ORDENAMIENTO (CORREGIDA Y MODIFICADA)
// ----------------------------------------------------

/**
 * Aplica los filtros (categoría, precio, envío) y el ordenamiento actual.
 * @param {Array} initialProducts - La lista base de productos a filtrar (ej: jokeProducts).
 * @param {string|null} currentCategory - La categoría seleccionada si estamos filtrando por categoría.
 */
function applyAllFilters(initialProducts, currentCategory = null) {
    const sortSelect = document.getElementById('sort-order');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const envioGratisCheckbox = document.getElementById('filter-envio-gratis');
    
    if (!sortSelect) {
        renderProducts(initialProducts);
        return;
    }

    // 🟢 NUEVA LÓGICA AGREGADA: FORZAR MENSAJE DE ERROR SI ENVÍO GRATIS ESTÁ MARCADO 🟢
    if (envioGratisCheckbox && envioGratisCheckbox.checked) {
        // Si está marcado, renderizamos con un array vacío para activar el mensaje de "no se encontraron"
        renderProducts([]); 
        return; 
    }
    // --------------------------------------------------------------------------------

    let filteredProducts = [...initialProducts]; // Creamos una copia para no modificar el original

    // 1. FILTRADO POR CATEGORÍA (Si aplica)
    if (currentCategory) {
        filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
    }

    // 2. FILTRADO POR ENVÍO GRATIS (Esta sección queda comentada o obsoleta por el bloque de arriba)
    /* if (envioGratisCheckbox && envioGratisCheckbox.checked) {
        filteredProducts = filteredProducts.filter(product => {
            // AJUSTA ESTA LÓGICA SI TU CRITERIO DE ENVÍO ES OTRO
            return product.id < 10; 
        });
    } */

    // 3. FILTRADO POR RANGO DE PRECIO
    const minPrice = (priceMinInput && parseFloat(priceMinInput.value)) || 0;
    const maxPrice = (priceMaxInput && parseFloat(priceMaxInput.value)) || Infinity; 

    filteredProducts = filteredProducts.filter(product => {
        const price = getNumericPrice(product.price);
        return price >= minPrice && price <= maxPrice;
    });


    // 4. ORDENAMIENTO (Corregido para mantener el orden por defecto)
    const sortBy = sortSelect.value;

    if (sortBy !== 'default') {
        // Solo ordenar si el usuario eligió Menor a Mayor o Mayor a Menor
        filteredProducts.sort((a, b) => {
            const priceA = getNumericPrice(a.price);
            const priceB = getNumericPrice(b.price);

            if (sortBy === 'price-asc') {
                return priceA - priceB; // Menor a Mayor
            } else if (sortBy === 'price-desc') {
                return priceB - priceA; // Mayor a Menor
            }
            return 0;
        });
    } 
    // Si sortBy es 'default', el array 'filteredProducts' mantiene el orden inicial de 'jokeProducts'.


    // 5. RENDERIZAR RESULTADOS
    renderProducts(filteredProducts);
}


// ----------------------------------------------------
// 🗂️ LÓGICA DE FILTRADO (Productos) - MODIFICADA
// ----------------------------------------------------

function filterAndRender(type, value) {
    document.body.classList.remove('showing-history', 'showing-offers');
    
    const sectionTitle = document.getElementById('section-title');
    let newTitle = "Productos Destacados";
    
    let productsToFilter = getAllProducts();
    
    if (type === 'category') {
        currentCategoryFilter = value;
        newTitle = `🏷️ Categoría: ${value}`;
    } else {
        currentCategoryFilter = null; // Reiniciar categoría si es 'all' o 'oferta'
    }
    
    if (sectionTitle) {
        sectionTitle.textContent = newTitle;
    }

    // Aplica todos los filtros y ordenamiento sobre el set inicial de productos
    applyAllFilters(productsToFilter, currentCategoryFilter);
}


// ----------------------------------------------------
// 🔎 LÓGICA DE BUSCADOR
// ----------------------------------------------------
function handleSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sectionTitle = document.getElementById('section-title');
    
    if (searchTerm === '') {
        // Si la búsqueda está vacía, volvemos a mostrar todo
        filterAndRender('all', null);
        return;
    }

    if (sectionTitle) {
        sectionTitle.textContent = `Resultados de búsqueda para: "${searchTerm}"`;
    }

    const searchResults = getAllProducts().filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
        
        return nameMatch || descriptionMatch;
    });

    // En la búsqueda, solo se muestran los resultados sin aplicar filtros de la barra lateral
    renderProducts(searchResults); 
}


// ----------------------------------------------------
// 📜 LÓGICA DE RENDERIZACIÓN DE HISTORIAL
// ----------------------------------------------------
function renderHistory() {
    document.body.classList.add('showing-history');
    const history = getHistory();
    
    const sectionTitle = document.getElementById('section-title');
    if (sectionTitle) {
        sectionTitle.textContent = "Historial de Productos Vistos";
    }
    
    renderProducts(history);
}

// ----------------------------------------------------
// 🗂️ LÓGICA DE RENDERIZACIÓN DE CATEGORÍAS
// ----------------------------------------------------
function getFirstImageForCategory(categoryName) {
    if (CATEGORY_IMAGES[categoryName]) {
        return CATEGORY_IMAGES[categoryName];
    }
    const product = getAllProducts().find(p => p.category === categoryName && p.image);
    return product ? product.image : 'imagenes/placeholder.png';
}

function renderAllCategories() {
    document.body.classList.remove('showing-history', 'showing-offers');
    
    const productGrid = document.querySelector('#product-grid');
    const sectionTitle = document.getElementById('section-title');
    
    if (!productGrid) return;
    
    const categories = [...new Set(getAllProducts().map(p => p.category).filter(c => c))].sort();
    
    if (sectionTitle) {
        sectionTitle.textContent = "Nuestras Categorías";
    }
    productGrid.innerHTML = '';
    
    categories.forEach(category => {
        const categoryImg = getFirstImageForCategory(category);
        
        const card = document.createElement('div');
        card.classList.add('category-card');
        
        card.innerHTML = `
            <img src="${categoryImg}" alt="${category}">
            <h3>${category}</h3>
        `;
        
        card.addEventListener('click', () => {
            filterAndRender('category', category); 
        });
        
        productGrid.appendChild(card);
    });
}


// ----------------------------------------------------
// 🎧 INICIALIZACIÓN DE LA APLICACIÓN (LISTENERS DE FILTROS)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    
    // ====================================================
    // ✅ CORRECCIÓN: Lógica global de navegación movida fuera del bloque condicional de 'index.html'
    // ====================================================
    
    // 1. Función de alerta para "Compras"
    function noPurchasesAlert() {
        alert('⚠️ No se ha realizado ninguna compra aún. ¡Vuelve pronto!');
    }
    
    // 2. Asignación del Listener al enlace "Compras" (debe tener id="compras-link" en el HTML)
    const comprasLink = document.getElementById('compras-link');
    if (comprasLink) {
        comprasLink.addEventListener('click', (e) => {
            e.preventDefault(); // Evita la navegación por defecto (href="#")
            noPurchasesAlert(); // Ejecuta la alerta
        });
    }
    
    // ====================================================
    
    const path = window.location.pathname.toLowerCase();
    const isIndexPage = path.endsWith('/') || path.includes('index.html');
    
    // Si NO estamos en la página de inicio, detenemos la ejecución de la lógica de filtros y productos.
    if (!isIndexPage) {
        return; 
    }

    const productGrid = document.querySelector('#product-grid');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (!productGrid) {
        console.error("Inicialización fallida: No se encontró product-grid.");
        return;
    }

    // --- LÓGICA DE FILTRO INICIAL (Solo para index.html) ---
    const urlParams = new URLSearchParams(window.location.search);
    const filterType = urlParams.get('filter');

    if (filterType === 'ofertas') {
        window.location.href = 'ofertas.html'; 
        return;
    } else if (filterType === 'historial') {
        renderHistory();
    } else if (filterType === 'categorias') {
        renderAllCategories();
    } else {
        // RENDERIZADO INICIAL PREDETERMINADO (Muestra todos los productos)
        filterAndRender('all', null);
    }

    // --- LISTENERS DEL BUSCADOR (Solo para index.html) ---
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSearch();
            }
        });
    }

    // --- 🟢 LISTENERS PARA LOS NUEVOS FILTROS 🟢 (Solo para index.html) ---
    const sortSelect = document.getElementById('sort-order');
    const applyPriceFilterButton = document.getElementById('apply-price-filter');
    const envioGratisCheckbox = document.getElementById('filter-envio-gratis');
    const resetFiltersButton = document.getElementById('reset-filters');

    // Escuchar el selector de Ordenar y el checkbox de Envío Gratis
    if (sortSelect) {
        sortSelect.addEventListener('change', () => applyAllFilters(getAllProducts(), currentCategoryFilter));
    }
    if (envioGratisCheckbox) {
        envioGratisCheckbox.addEventListener('change', () => applyAllFilters(getAllProducts(), currentCategoryFilter));
    }

    // Escuchar el botón de Aplicar Filtro de Precio
    if (applyPriceFilterButton) {
        applyPriceFilterButton.addEventListener('click', () => applyAllFilters(getAllProducts(), currentCategoryFilter));
    }
    
    // 🟢 LISTENERS DE RESET (Solo para index.html) 🟢
    if (resetFiltersButton) {
        const priceMinInput = document.getElementById('price-min');
        const priceMaxInput = document.getElementById('price-max');
        
        resetFiltersButton.addEventListener('click', () => {
            // 1. Resetear la UI
            if (sortSelect) sortSelect.value = 'default';
            if (priceMinInput) priceMinInput.value = '0';
            if (priceMaxInput) priceMaxInput.value = ''; 
            if (envioGratisCheckbox) envioGratisCheckbox.checked = false;
            
            // 2. Ejecutar el filtro para volver al estado inicial (Productos Destacados)
            filterAndRender('all', null); 
        });
    }
});

let index = 0;

const track = document.querySelector(".carousel-track");
const middleLink = document.getElementById("middle-link");

// Imágenes
const imagenes = [
    "imagenes/logos/img1.png",
    "imagenes/logos/img2.png",
    "imagenes/logos/img3.png"
];

// Links SOLO para la imagen del medio
const links = [
    "https://primer-link.com",
    "https://segundo-link.com",
    "https://tercer-link.com"
];

// Cambio automático
setInterval(() => {
    index = (index + 1) % 3;

    // Deslizar carrusel
    track.style.transform = `translateX(-${index * 100}%)`;

    // Cambiar el link del centro
    middleLink.href = links[index];

}, 4000); // 4 segundos
