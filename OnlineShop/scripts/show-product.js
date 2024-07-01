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
});