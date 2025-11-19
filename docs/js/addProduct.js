document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addProductForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const category = document.getElementById("category").value;
        const image = document.getElementById("image").value;
        const description = document.getElementById("description").value;

        // Obtener el nombre del usuario logueado
        const userData = JSON.parse(localStorage.getItem("currentUserData")) || {};
        const sellerName = userData.name || "Usuario";

        const newProduct = {
            id: Date.now().toString(), // ✅ Convertir a string
            name,
            price,
            category,
            image,
            description,
            seller: sellerName
        };

        let products = JSON.parse(localStorage.getItem("userProducts")) || [];
        products.push(newProduct);

        localStorage.setItem("userProducts", JSON.stringify(products));

        alert("Producto agregado con éxito");
        window.location.href = "index.html";
    });
});
