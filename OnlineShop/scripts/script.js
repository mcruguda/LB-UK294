document.addEventListener('DOMContentLoaded', async () => {

    const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        const login = document.getElementById("login-btn");
        const logout = document.getElementById("logout-btn");
        // https://www.w3schools.com/howto/howto_js_add_class.asp -> to add a html class in js
        if(token) {
            login.classList.add("d-none");
            logout.classList.remove("d-none")

            const isAdmin = await fetch(`/api/isAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if(!isAdmin.ok) {
                document.getElementById("add-product").classList.add("d-none");
                fetch(`/api/products`)
                .then(response => response.json())
                .then(products => {
                    const productList = document.getElementById('products-container');
                    products.forEach(product => {
                        fetch(`/api/categories/${product.categoryId}`)
                            .then(response => response.json())
                            .then(category => { 
                            productList.innerHTML = `${productList.innerHTML}
            
                                <div class="card col-md-4 d-flex justify-content-center" style="width: 18rem;">
                                    <img src="./img/Placeholder_view_vector.svg.png" class="card-img-top" alt="image">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text">${product.price}.-</p>
                                        <p class="card-text">Kategorie: ${category.name}</p>
                                        <a href="/products/show/${product.id}" class="btn btn-primary stretched-link">Ansehen</a>
                                    </div>
                                </div>    
                            `;
                        });
                    });
                });
            } else {
                fetch(`/api/products`)
                .then(response => response.json())
                .then(products => {
                    const productList = document.getElementById('products-container');
                    products.forEach(product => {
                        fetch(`/api/categories/${product.categoryId}`)
                            .then(response => response.json())
                            .then(category => { 
                            productList.innerHTML = `${productList.innerHTML}
            
                                <div class="card col-md-4 d-flex justify-content-center" style="width: 18rem;">
                                    <img src="./img/Placeholder_view_vector.svg.png" class="card-img-top" alt="image">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text">${product.price}.-</p>
                                        <p class="card-text">Kategorie: ${category.name}</p>
                                        <a href="/products/edit/${product.id}" class="btn btn-primary stretched-link">Bearbeiten</a>
                                    </div>
                                </div>    
                            `;
                        });
                    });
                });
            }
        } else {
            document.getElementById("add-product").classList.add("d-none");
            fetch(`/api/products`)
                .then(response => response.json())
                .then(products => {
                    const productList = document.getElementById('products-container');
                    products.forEach(product => {
                        fetch(`/api/categories/${product.categoryId}`)
                            .then(response => response.json())
                            .then(category => { 
                            productList.innerHTML = `${productList.innerHTML}
            
                                <div class="card col-md-4 d-flex justify-content-center" style="width: 18rem;">
                                    <img src="./img/Placeholder_view_vector.svg.png" class="card-img-top" alt="image">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text">${product.price}.-</p>
                                        <p class="card-text">Kategorie: ${category.name}</p>
                                        <a href="/products/show/${product.id}" class="btn btn-primary stretched-link">Ansehen</a>
                                    </div>
                                </div>    
                            `;
                        });
                    });
                });
        }

});

const logout = document.getElementById("logout-btn");

logout.addEventListener('click', () => {
    //https://stackoverflow.com/questions/10593013/delete-cookie-by-name --> Used for cookie deletion
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})