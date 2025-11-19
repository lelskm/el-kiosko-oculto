// ===============================================
// LÓGICA DE LA PÁGINA MI CUENTA (mi-cuenta.js)
// Maneja la edición y eliminación de la cuenta localmente
// ===============================================

// 💡 FUNCIÓN AUXILIAR AGREGADA: Borra todas las reseñas de un usuario específico 💡
function deleteUserReviews(username) {
    let reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    // Filtra las reseñas: solo mantén las que NO son del usuario que se va a eliminar.
    const remainingReviews = reviews.filter(review => review.author !== username);
    localStorage.setItem('productReviews', JSON.stringify(remainingReviews));
}

document.addEventListener('DOMContentLoaded', () => {
    const userDetailsForm = document.getElementById('user-details-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const loginStatusMessage = document.getElementById('login-status-message');
    
    // Campos de edición
    const editUsernameInput = document.getElementById('edit-username');
    const editEmailInput = document.getElementById('edit-email');
    const editPasswordInput = document.getElementById('edit-password');
    
    // Botones
    const togglePasswordButton = document.getElementById('toggle-password');
    const logoutButton = document.getElementById('logout-button');
    const deleteButton = document.getElementById('delete-button');
    const editMessage = document.getElementById('edit-message');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let storedUser = JSON.parse(localStorage.getItem('user'));

    // Función para mostrar mensajes de estado
    function displayMessage(text, type, element) {
        element.textContent = text;
        // Limpia clases anteriores y añade las nuevas
        element.className = 'auth-message ' + type; 
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }

    // 1. Inicialización: Cargar datos si el usuario está logueado
    if (isLoggedIn && storedUser) {
        welcomeMessage.textContent = `Mi Cuenta: ${storedUser.username}`;
        loginStatusMessage.style.display = 'none';
        userDetailsForm.style.display = 'flex'; // Usamos flex para el formulario, aunque puedes cambiarlo a 'block' si prefieres.

        // Llenar los campos con los datos actuales
        editUsernameInput.value = storedUser.username || '';
        editEmailInput.value = storedUser.email || '';
        editPasswordInput.value = storedUser.password || '';

    } else {
        // Usuario no logueado
        welcomeMessage.textContent = 'Acceso Denegado';
        loginStatusMessage.textContent = 'Debes iniciar sesión para ver esta página.';
        loginStatusMessage.style.color = '#f44336';
        userDetailsForm.style.display = 'none';
    }
    
    // 2. Lógica para guardar cambios (Editar Cuenta)
    userDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newUsername = editUsernameInput.value.trim();
        const newEmail = editEmailInput.value.trim();
        const newPassword = editPasswordInput.value.trim();

        if (!newUsername || !newPassword) {
            displayMessage('El usuario y la contraseña son obligatorios para guardar.', 'error', editMessage);
            return;
        }

        // Actualizar el objeto de usuario localmente (esto asegura que el nuevo login funcione)
        storedUser.username = newUsername;
        storedUser.email = newEmail;
        storedUser.password = newPassword;

        // Guardar la nueva configuración en localStorage
        localStorage.setItem('user', JSON.stringify(storedUser));
        
        // Actualizar el mensaje de bienvenida
        welcomeMessage.textContent = `Mi Cuenta: ${storedUser.username}`;

        displayMessage('¡Cambios guardados con éxito!', 'success', editMessage);
    });

    // 3. Lógica para el toggle de visibilidad de contraseña
    togglePasswordButton.addEventListener('click', () => {
        const type = editPasswordInput.type === 'password' ? 'text' : 'password';
        editPasswordInput.type = type;

        // Cambiar el icono del botón
        const icon = togglePasswordButton.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // 4. Lógica para cerrar sesión
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        // 🟢 MODIFICADO: Elimina el usuario logueado para detener la autoría de reseñas
        localStorage.removeItem('currentUser'); 
        window.location.href = 'index.html'; 
    });

    // 5. Lógica para BORRAR LA CUENTA
    deleteButton.addEventListener('click', () => {
        const confirmation = confirm('¿Estás seguro de que quieres borrar tu cuenta? Esta acción es irreversible y tu cuenta local será eliminada.');
        
        if (confirmation) {
            const usernameToDelete = storedUser.username;
            
            // 🟢 AGREGADO: Borrar todas las reseñas escritas por este usuario
            deleteUserReviews(usernameToDelete); 
            
            // Borrar todas las claves de autenticación
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            // 🟢 MODIFICADO: Elimina el usuario logueado
            localStorage.removeItem('currentUser'); 
            
            alert('Tu cuenta ha sido eliminada. Serás redirigido a la página de inicio.');
            window.location.href = 'index.html';
        }
    });
});