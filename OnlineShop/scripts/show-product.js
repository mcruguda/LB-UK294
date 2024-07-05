document.addEventListener('DOMContentLoaded', () => {

    fetch(`/api/products/${window.location.pathname.split("/")[3]}`)
        .then(response => response.json())
        .then(product => {
            const productName = document.getElementById('product-name');
            const productCategory = document.getElementById('product-category');
            const productPrice = document.getElementById('product-price');
            const productImage = document.getElementById('product-img');
            
            fetch(`/api/categories/${product.categoryId}`)
                .then(response => response.json())
                .then(category => { 
                productName.innerText = product.name;
                productCategory.innerText = category.name;
                productPrice.innerText = product.price;
            });
        });

        const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        const login = document.getElementById("login-btn");
        const logout = document.getElementById("logout-btn");
        // https://www.w3schools.com/howto/howto_js_add_class.asp -> to add a html class in js
        if(token) {
            login.classList.add("d-none");
            logout.classList.remove("d-none")
        }
});

const logout = document.getElementById("logout-btn");

logout.addEventListener('click', () => {
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})