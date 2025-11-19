// ===============================================
// LÓGICA DE SIMULACIÓN DE AUTENTICACIÓN (auth.js)
// Usa localStorage para simular una base de datos.
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    const loginOverlay = document.getElementById('login-overlay');
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('login-title');
    const authButton = document.getElementById('auth-button');
    const toggleRegisterLink = document.getElementById('toggle-register');
    const authMessage = document.getElementById('auth-message');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    let isRegistering = false;

    // 1. Verificar si el usuario ya está logueado
    // Si la clave 'isLoggedIn' existe y es 'true', oculta el login.
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginOverlay.style.display = 'none';
    } else {
        loginOverlay.style.display = 'flex';
    }

    // 2. Manejar el cambio entre Login y Registro
    toggleRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        isRegistering = !isRegistering;
        if (isRegistering) {
            authTitle.textContent = 'Crear Cuenta';
            authButton.textContent = 'Registrarse';
            toggleRegisterLink.textContent = 'Inicia sesión aquí';
        } else {
            authTitle.textContent = 'Iniciar Sesión';
            authButton.textContent = 'Entrar';
            toggleRegisterLink.textContent = 'Regístrate aquí';
        }
        authMessage.style.display = 'none'; // Limpia el mensaje al cambiar
        usernameInput.value = ''; // Limpia los campos
        passwordInput.value = '';
    });

    // 3. Manejar el envío del formulario
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        authMessage.textContent = '';
        authMessage.className = 'auth-message';

        if (isRegistering) {
            // Lógica de REGISTRO
            if (storedUser && storedUser.username === username) {
                displayMessage('Este usuario ya existe.', 'error');
            } else {
                const newUser = { username: username, password: password, email: username + '@ejemplo.com' }; // Agrega un email simulado para la cuenta
                localStorage.setItem('user', JSON.stringify(newUser));
                displayMessage('¡Registro exitoso! Ya puedes iniciar sesión.', 'success');
                // Vuelve automáticamente a la vista de login
                isRegistering = false;
                authTitle.textContent = 'Iniciar Sesión';
                authButton.textContent = 'Entrar';
                toggleRegisterLink.textContent = 'Regístrate aquí';
                usernameInput.value = '';
                passwordInput.value = '';
            }
        } else {
            // Lógica de LOGIN
            if (storedUser && storedUser.username === username && storedUser.password === password) {
                localStorage.setItem('isLoggedIn', 'true');
                // 🟢 AGREGADO: Guarda el usuario actual para las reseñas
                localStorage.setItem('currentUser', username);
                
                displayMessage('¡Bienvenido ' + username + '! Entrando a la tienda...', 'success');
                // Oculta el modal después de un breve retraso
                setTimeout(() => {
                    loginOverlay.style.display = 'none';
                    // window.location.reload(); 
                }, 1000);
            } else {
                displayMessage('Usuario o contraseña incorrectos. Inténtalo de nuevo.', 'error');
            }
        }
    });
    
    // Función para mostrar mensajes de estado
    function displayMessage(text, type) {
        authMessage.textContent = text;
        authMessage.classList.add(type);
        authMessage.style.display = 'block';
    }
});