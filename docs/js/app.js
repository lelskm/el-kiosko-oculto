import { jokeProducts } from './products.js';

// ======================================================================
// 👤 LÓGICA DE USUARIO COMPARTIDA
// ======================================================================

const USER_KEY = 'currentUser'; 
let isSubmitting = false; // 💡 Controla si la reseña se está enviando

function getCurrentUser() {
    return localStorage.getItem(USER_KEY);
}

// ======================================================================
// 🛒 LÓGICA DE CARRITO (Adaptada de tu product.js)
// ======================================================================

function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function addToCart(product) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
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


// ======================================================================
// ⭐️ LÓGICA DE RESEÑAS
// ======================================================================

/**
 * Renderiza la lista de reseñas para un producto específico.
 */
function renderReviews(productId) {
    const reviewsList = document.getElementById('reviews-list');
    const allReviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    
    if (!reviewsList) return;

    // Filtra solo las reseñas de ESTE producto
    const productReviews = allReviews.filter(review => review.productId === productId);
    reviewsList.innerHTML = ''; // Limpiar lista

    if (productReviews.length === 0) {
        reviewsList.innerHTML = '<p class="no-reviews">Sé el primero en dejar una reseña para este producto.</p>';
        return;
    }

    productReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item');
        
        const starRatingHtml = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

        // 💥 CAMBIO APLICADO AQUÍ
        reviewElement.innerHTML = `
            <div class="review-header">
                <h3>👤 ${review.author}</h3>
                <div class="review-meta">
                    <span class="review-rating-display">${starRatingHtml(review.rating)}</span>
                    <button class="delete-review-btn" data-review-id="${review.id}">🗑️</button>
                </div>
            </div>
            <p class="review-comment">${review.comment}</p>
        `;
        
        // Listener para borrar reseña individual
        reviewElement.querySelector('.delete-review-btn').addEventListener('click', () => {
            deleteSingleReview(productId, review.id, review.author);
        });

        reviewsList.appendChild(reviewElement);
    });
}

/**
 * Maneja el envío de una nueva reseña.
 */
function submitReview(productId) {
    // 🛑 BLOQUEO DE DOBLE ENVÍO
    if (isSubmitting) {
        return; // Ignora si ya se está procesando
    }
    isSubmitting = true; // Marca como en proceso

    const author = getCurrentUser();
    const commentInput = document.getElementById('review-text');
    
    // 1. VALIDACIÓN DE SESIÓN
    if (!author) {
        isSubmitting = false; // Libera el bloqueo al salir
        alert("🚨 Debes iniciar sesión para poder dejar una reseña.");
        return; 
    }

    // 2. OBTENER DATOS (Leyendo las estrellas)
    const comment = commentInput ? commentInput.value.trim() : ''; 
    const ratingElement = document.querySelector('input[name="rating"]:checked');
    const rating = ratingElement ? parseInt(ratingElement.value) : 0; 
    
    // 3. VALIDACIÓN
    const MIN_LENGTH = 5;
    
    console.log(`[DEBUG] Longitud del comentario: ${comment.length}`);
    console.log(`[DEBUG] Rating detectado: ${rating}`);

    // Comprobamos si hay errores
    if (comment.length < MIN_LENGTH || rating === 0) {
        
        // 🛑 LÓGICA CLAVE: Si el único error es el rating, salimos silenciosamente
        if (rating === 0 && comment.length >= MIN_LENGTH) {
            isSubmitting = false; 
            return; // Evitamos la alerta de "selecciona estrellas"
        }
        
        // Si hay otros errores (o rating + comentario) mostramos la alerta completa
        let errorMessage = "Por favor, corrige lo siguiente:\n";
        if (rating === 0) {
            errorMessage += "- Debes seleccionar una puntuación (1 a 5 estrellas).\n";
        }
        if (comment.length < MIN_LENGTH) {
            errorMessage += `- El comentario debe tener al menos ${MIN_LENGTH} caracteres. (Actual: ${comment.length})\n`;
        }

        isSubmitting = false; // Libera el bloqueo al salir por error
        alert(errorMessage.trim()); 
        return;
    }
    // FIN DE LA VALIDACIÓN

    // 4. Crear el objeto reseña
    const review = {
        id: Date.now(),
        productId: productId,
        author: author,         
        rating: rating,
        comment: comment,
        date: new Date().toLocaleDateString('es-AR'),
    };

    // 5. GUARDAR Y LIMPIAR
    let reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    reviews.push(review);
    localStorage.setItem('productReviews', JSON.stringify(reviews));

    // Limpiar formulario
    commentInput.value = '';
    const allRatings = document.querySelectorAll('input[name="rating"]');
    allRatings.forEach(radio => radio.checked = false);
    
    renderReviews(productId);
    alert("¡Reseña enviada correctamente por " + author + "!");

    isSubmitting = false; // Libera el bloqueo al terminar con éxito
}

/**
 * Borra una reseña individual (Tu requisito)
 * Solo si el autor logueado es el mismo.
 */
function deleteSingleReview(productId, reviewId, reviewAuthor) {
    const currentUser = getCurrentUser();
    
    if (currentUser !== reviewAuthor) {
        alert("❌ Solo puedes borrar tus propias reseñas.");
        return;
    }
    
    if (!confirm("¿Estás seguro de que quieres borrar esta reseña?")) {
        return;
    }
    
    let reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    const filteredReviews = reviews.filter(review => review.id !== reviewId);
    
    localStorage.setItem('productReviews', JSON.stringify(filteredReviews));
    renderReviews(productId);
    alert("Reseña eliminada.");
}

/**
 * Borra TODAS las reseñas de un producto (Tu requisito).
 */
function clearAllReviews(productId) {
    if (!confirm("🚨 ¡ADVERTENCIA! ¿Estás absolutamente seguro de que quieres borrar TODAS las reseñas de ESTE producto? Esta acción no se puede deshacer.")) {
        return;
    }
    
    let reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    const filteredReviews = reviews.filter(review => review.productId !== productId); // Deja solo las de otros productos
    
    localStorage.setItem('productReviews', JSON.stringify(filteredReviews));
    renderReviews(productId);
    alert("Todas las reseñas del producto han sido borradas.");
}

// ======================================================================
// LÓGICA DE INICIALIZACIÓN DE PÁGINA (product.html)
// ======================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del enlace "Compras" (movida de main.js)
    const comprasLink = document.getElementById('compras-link');
    if (comprasLink) {
        comprasLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            alert('⚠️ No se ha realizado ninguna compra aún. ¡Vuelve pronto!');
        });
    }

    // 2. Obtener el producto actual
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = jokeProducts.find(p => p.id === productId);

    // 3. Cargar datos del producto (Nombre, Precio, etc.)
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-seller').textContent = product.seller;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-image').src = product.image;

    // ... (Aquí iría la lógica de cuotas y thumbnails si la tenías en product.js) ...

    // 4. Conectar el Spinner al botón "Comprar Ahora" (usando el ID corregido)
    const buyButton = document.getElementById('buy-now-button');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (buyButton && loadingOverlay) {
        buyButton.addEventListener('click', () => {
            loadingOverlay.style.display = 'flex';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                // Redirige a donación (pasando el ID del producto)
                window.location.href = `donacion.html?product_id=${product.id}`; 
            }, 2500); 
        });
    }

    // 5. Conectar el botón "Agregar al Carrito"
    const addToCartButton = document.querySelector('.add-to-cart-button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
            alert(`"${product.name}" agregado al carrito.`);
        });
    }

    // 6. Conectar los botones de Reseñas
    const reviewForm = document.getElementById('review-form');
    const clearReviewsBtn = document.getElementById('clear-reviews-btn');

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitReview(product.id);
        });
    }

    if (clearReviewsBtn) {
        clearReviewsBtn.addEventListener('click', () => {
            clearAllReviews(product.id);
        });
    }

    // 7. Cargar las reseñas existentes al iniciar
    renderReviews(product.id);
});

// ======================================================================
// EN LA SECCIÓN DE REGISTRO (Register)
// ======================================================================

const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Guardar datos del usuario
        const userData = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem('currentUserData', JSON.stringify(userData));
        localStorage.setItem('currentUser', email);

        alert('✅ Registro exitoso. ¡Bienvenido!');
        window.location.href = 'index.html';
    });
}