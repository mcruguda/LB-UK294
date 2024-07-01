document.addEventListener('DOMContentLoaded', () => {

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
});