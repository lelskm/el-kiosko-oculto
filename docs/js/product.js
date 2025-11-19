import { jokeProducts } from './products.js';

// ----------------------------------------------------
// 🛒 LÓGICA DE CARRITO
// ----------------------------------------------------

/**
 * Obtiene el carrito del LocalStorage.
 * @returns {Array} El array del carrito.
 */
function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

/**
 * Guarda el carrito actualizado en el LocalStorage.
 * @param {Array} cart - El array del carrito a guardar.
 */
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

/**
 * Agrega un producto al carrito, manejando las cantidades si ya existe.
 * @param {Object} product - El objeto del producto a agregar.
 */
function addToCart(product) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // Si ya existe, incrementa la cantidad
        existingItem.quantity += 1;
    } else {
        // Si no existe, agrégalo con cantidad 1
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
}


// ----------------------------------------------------
// 🖼️ FUNCIÓN DE DIBUJO DE PRODUCTOS (Reutilizada y Adaptada)
// ----------------------------------------------------
function renderProducts(productsToRender, targetElementId) {
    const productGrid = document.querySelector(`#${targetElementId}`);
    if (!productGrid) return;

    productGrid.innerHTML = ''; // Limpia la cuadrícula

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1 / -1;">No encontramos otros productos similares.</p>';
        return;
    }
    
    // Limita a mostrar 4 productos como máximo
    const limitedProducts = productsToRender.slice(0, 4);

    limitedProducts.forEach(product => {
        let cleanPriceString = product.price.replace('$', '').trim().replace(/[.,]/g, '');
        let numericPrice = parseFloat(cleanPriceString);
        
        let monthlyInstallmentMessage = 'Consultar cuotas';
        if (!isNaN(numericPrice) && numericPrice > 0) {
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

        // Al hacer clic en un producto relacionado, recarga la página con el nuevo ID
        card.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = `producto.html?id=${product.id}`;
        });

        productGrid.appendChild(card);
    });
}


// ----------------------------------------------------
// 💡 FUNCIÓN NUEVA: ENCONTRAR Y RENDERIZAR RELACIONADOS
// ----------------------------------------------------
function loadRelatedProducts(currentProduct) {
    // Solo procede si el producto actual tiene una categoría definida
    if (!currentProduct || !currentProduct.category) {
          const section = document.querySelector('.related-products-section');
          if (section) section.style.display = 'none';
          return;
    }
    
    // 1. Filtrar todos los productos que tengan la misma categoría,
    // y excluyendo el producto que ya estamos viendo
    const relatedProducts = jokeProducts.filter(p =>
        p.category === currentProduct.category && p.id !== currentProduct.id
    );
    
    // 2. Si hay productos relacionados, actualiza el título y dibújalos
    if (relatedProducts.length > 0) {
        const titleElement = document.getElementById('related-title');
        if(titleElement) {
             titleElement.textContent = `Más en ${currentProduct.category}`;
        }
        
        // Renderiza en el nuevo grid de relacionados
        renderProducts(relatedProducts, 'related-products-grid');
    } else {
        // Si no hay relacionados, oculta la sección completa
        const section = document.querySelector('.related-products-section');
        if (section) section.style.display = 'none';
    }
}

// ----------------------------------------------------
// 📝 FUNCIÓN ACTUALIZADA Y CORREGIDA PARA ESTILOS: CARGAR INFORMACIÓN EXTENDIDA
// ----------------------------------------------------
function loadExtendedInfo(product) {
    const extendedInfoArea = document.getElementById('extended-info-area');
    
    if (!product || !product.extendedInfo) {
        if (extendedInfoArea) extendedInfoArea.style.display = 'none';
        return;
    }

    let htmlContent = '<h3>Información Extendida del Producto</h3><p>';
    const info = product.extendedInfo;
    
    if (info.origen) {
        htmlContent += `<strong>Origen:</strong> ${info.origen}<br><br>`;
    }
    
    if (info.funcionamiento) {
        htmlContent += `<strong>Funcionamiento:</strong> ${info.funcionamiento}<br><br>`;
    }

    if (info.specs) {
        htmlContent += `<strong>Especificaciones Técnicas:</strong> ${info.specs}`;
    }
    
    htmlContent += `</p>`;
    
    extendedInfoArea.innerHTML = htmlContent;
    extendedInfoArea.style.display = 'block';
}

// ----------------------------------------------------
// 💡 NUEVA FUNCIÓN: SIMULAR COMPRA CON SPINNER Y REDIRECCIÓN
// ----------------------------------------------------
function simulatePurchase() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Muestra el overlay/spinner
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }

    // Simula la espera (ej: 2.5 segundos)
    setTimeout(() => {
        // Oculta el overlay/spinner
        if (loadingOverlay) {
             loadingOverlay.style.display = 'none';
        }
        // Redirige a la página de donación (o la que uses para finalizar)
        window.location.href = 'donacion.html'; 
    }, 2500); // 2500 milisegundos = 2.5 segundos
}


// ----------------------------------------------------
// 🎧 INICIALIZACIÓN DE LA APLICACIÓN
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. OBTENER ID DEL PRODUCTO
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log('🔍 ID buscado:', productId);

    // 2. Cargar elementos del DOM PRIMERO
    const productNameElement = document.getElementById('product-name');
    const productPriceElement = document.getElementById('product-price');
    const productImageElement = document.getElementById('product-image');
    const thumbnailSlider = document.getElementById('thumbnail-slider');
    const productDescriptionElement = document.getElementById('product-description');
    const productSellerElement = document.getElementById('product-seller');
    const buyButton = document.getElementById('buy-button');
    const addToCartButton = document.getElementById('add-to-cart-button');
    const reviewForm = document.getElementById('review-form');
    const reviewRatingInput = document.getElementById('review-rating');
    const reviewListContainer = document.getElementById('reviews-list');
    const clearReviewsButton = document.getElementById('clear-reviews-btn');

    // 3. Cargar productos almacenados por el usuario
    const userProducts = JSON.parse(localStorage.getItem("userProducts")) || [];
    console.log('👥 Productos de usuario:', userProducts);

    // 4. Unir productos originales + productos del usuario
    const allProducts = [...jokeProducts, ...userProducts];
    console.log('📦 Todos los productos:', allProducts);

    // 5. Buscar el producto según ID
    const product = allProducts.find(p => {
        const match = String(p.id) === String(productId);
        console.log(`Comparando: ${p.id} === ${productId} = ${match}`);
        return match;
    });

    console.log('✅ Producto encontrado:', product);

    // 6. MOSTRAR NOMBRE INMEDIATAMENTE (aunque no encuentre el producto)
    if (product) {
        productNameElement.textContent = product.name || "Sin nombre";
        productPriceElement.textContent = product.price || "$0,00";
        productImageElement.src = product.image || "imagenes/default.png";
        productImageElement.alt = product.name;
        productDescriptionElement.textContent = product.description || "Este producto no tiene descripción.";

        // MOSTRAR VENDEDOR
        let sellerName = "El Kiosco Oculto";
        const isUserProduct = userProducts.some(p => String(p.id) === String(productId));
        
        if (isUserProduct) {
            sellerName = product.seller || "Usuario";
        } else if (product.seller) {
            sellerName = product.seller;
        }
        
        productSellerElement.textContent = sellerName;
    } else {
        console.error('❌ Producto no encontrado');
        productNameElement.textContent = 'Producto no encontrado';
        const detailContainer = document.querySelector('.product-detail-container');
        if (detailContainer) detailContainer.style.display = 'none';
        return;
    }

    // Elementos de Reseñas
    const stars = document.querySelectorAll('.rating-stars .star');
    
    let selectedRating = 0;

    // Clave dinámica para el LocalStorage
    const productReviewKey = `reviews_product_${productId}`;

    // Cargar reseñas guardadas al inicio (con lógica de borrado individual)
    const loadReviews = () => {
        if (!reviewListContainer) return;
        
        const storedReviews = JSON.parse(localStorage.getItem(productReviewKey) || '[]');
        reviewListContainer.innerHTML = '';
        
        if (storedReviews.length === 0) {
            reviewListContainer.innerHTML = '<p>Sé el primero en dejar una reseña para este producto.</p>';
            return;
        }

        storedReviews.forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review-item');
            
            const ratingDisplay = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            
            reviewDiv.innerHTML = `
                <div class="review-meta">
                    <strong>${review.name}</strong>
                    <span class="review-rating-display">${ratingDisplay}</span>
                </div>
                <p>${review.text}</p>
                <button class="delete-review-btn" data-review-index="${index}">🗑️</button>
            `;
            reviewListContainer.appendChild(reviewDiv);
        });
        
        document.querySelectorAll('.delete-review-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToDelete = parseInt(e.currentTarget.getAttribute('data-review-index'));
                
                if (confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
                    const currentReviews = JSON.parse(localStorage.getItem(productReviewKey) || '[]');
                    currentReviews.splice(indexToDelete, 1);
                    localStorage.setItem(productReviewKey, JSON.stringify(currentReviews));
                    loadReviews();
                }
            });
        });
    };
    
    // LÓGICA DE BORRADO TOTAL
    if (clearReviewsButton) {
        clearReviewsButton.addEventListener('click', () => {
            if (confirm('ADVERTENCIA: ¿Estás seguro de que quieres eliminar TODAS las reseñas de ESTE producto?')) {
                localStorage.removeItem(productReviewKey);
                loadReviews();
            }
        });
    }

    // 🟢 ASIGNAR EVENTO AL BOTÓN COMPRAR AHORA 🟢
    if (buyButton) {
        buyButton.addEventListener('click', simulatePurchase);
    }
    
    // LISTENERS DEL CARRITO
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
            alert(`✅ ¡"${product.name}" ha sido agregado al carrito! Cantidad actual: ${getCart().find(item => String(item.id) === String(productId))?.quantity || 1}`);
        });
    }

    // LÓGICA DE CUOTAS
    let monthlyInstallmentMessage = 'Consultar cuotas';
    let cleanPriceString = product.price.replace('$', '').trim().replace(/[.,]/g, '');
    let numericPrice = parseFloat(cleanPriceString);

    if (!isNaN(numericPrice) && numericPrice > 0) {
        // Caso especial para el producto con ID 21 (solo por si acaso)
        if (product.id === 21) {
             monthlyInstallmentMessage = `12 cuotas de $833.333.333,33`;
        } else {
            const installmentValue = numericPrice / 12;
            
            const formattedInstallment = installmentValue.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            monthlyInstallmentMessage = `12 cuotas de $${formattedInstallment}`;
        }
    }
    
    const installmentP = document.createElement('p');
    installmentP.classList.add('product-installment-detail');
    installmentP.textContent = monthlyInstallmentMessage;
    productPriceElement.insertAdjacentElement('afterend', installmentP);
    
    // LÓGICA DEL SLIDER (CARRUSEL)
    const allImages = [product.image, ...(product.images || [])];
    
    if (thumbnailSlider) {
        allImages.forEach(imageSrc => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imageSrc;
            thumbnail.alt = `Vista de ${product.name}`;
            thumbnail.classList.add('thumbnail');

            if (imageSrc === product.image) {
                thumbnail.classList.add('active-thumbnail');
            }

            thumbnail.addEventListener('click', () => {
                productImageElement.src = imageSrc;
                document.querySelectorAll('.thumbnail').forEach(t => {
                    t.classList.remove('active-thumbnail');
                });
                thumbnail.classList.add('active-thumbnail');
            });

            thumbnailSlider.appendChild(thumbnail);
        });
    }

    const renderStars = (rating) => {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    };

    stars.forEach(star => {
        const rating = parseInt(star.getAttribute('data-rating'));
        
        star.addEventListener('mouseover', () => renderStars(rating));
        star.addEventListener('mouseout', () => renderStars(selectedRating));
        star.addEventListener('click', () => {
            selectedRating = rating;
            reviewRatingInput.value = rating;
            renderStars(selectedRating);
        });
    });

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (selectedRating === 0) {
                alert('Por favor, selecciona una calificación con estrellas.');
                return;
            }

            const newReview = {
                name: document.getElementById('reviewer-name').value,
                text: document.getElementById('review-text').value,
                rating: selectedRating,
            };

            const storedReviews = JSON.parse(localStorage.getItem(productReviewKey) || '[]');
            storedReviews.push(newReview);
            localStorage.setItem(productReviewKey, JSON.stringify(storedReviews));

            reviewForm.reset();
            selectedRating = 0;
            renderStars(0);
            loadReviews();
        });
    }
    
    if (reviewListContainer) {
        loadReviews();
    }
    
    loadExtendedInfo(product);
    loadRelatedProducts(product);
});