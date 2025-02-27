document.addEventListener('DOMContentLoaded', () => {

    // https://stackoverflow.com/questions/6888783/split-path-name-to-get-routing-parameter -->
    // Used for splitting the ID out of the Url
    fetch(`/api/products/${window.location.pathname.split("/")[3]}`)
    .then(response => response.json())
    .then(product => {
        const productName = document.getElementById('product-name');
        const productPrice = document.getElementById('product-price');
        const productImage = document.getElementById('product-img');
        
        // https://stackoverflow.com/questions/6888783/split-path-name-to-get-routing-parameter -->
        // Used for splitting the ID out of the Url
        fetch(`/api/products/${window.location.pathname.split("/")[3]}`)
            .then(response => response.json())
            .then(product => { 
            productName.value = product.name;
            const productCategory = document.getElementById('product-category');
            fetch(`/api/categories`)
            .then(response => response.json())
            .then(categories => {
                categories.forEach(category => {
                    if(category.id == product.categoryId) {
                        productCategory.innerHTML = `${productCategory.innerHTML}
                                    <option selected value="${category.id}">${category.name}</option>  
                                `;
                    } else {
                        productCategory.innerHTML = `${productCategory.innerHTML}
                                    <option value="${category.id}">${category.name}</option>  
                                `;
                    }
                });
            })
            productPrice.value = product.price;
        });
    });
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie --> used for getting specific cookie
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

const editBtn = document.getElementById('product-edit');
const deleteBtn = document.getElementById('product-del');

editBtn.addEventListener('click', async () => {
    const productName = document.getElementById('product-name').value;
    const productCategory = document.getElementById('product-category').value;
    const productPrice = document.getElementById('product-price').value;
    //const productImage = document.getElementById('product-img');

    if(productName == "" || productCategory == "" || productPrice == "") {
        alert("Alle felder muessen ausgefuellt sein!")
    } else {
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie --> used for getting specific cookie
        const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        // https://stackoverflow.com/questions/6888783/split-path-name-to-get-routing-parameter -->
        // Used for splitting the ID out of the Url
        const response = await fetch(`/api/products/${window.location.pathname.split("/")[3]}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: productName,
                price: productPrice,
                categoryId: productCategory,
                image: "abc123"
            })
        });
    
        if (response.ok) {
            window.location.href = '/products';
        } else {
            alert("Produkt verändert werden!")
        }
    }

    
});

deleteBtn.addEventListener('click', async () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie --> used for getting specific cookie
    const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
    // https://stackoverflow.com/questions/6888783/split-path-name-to-get-routing-parameter -->
    // Used for splitting the ID out of the Url
    const response = await fetch(`/api/products/${window.location.pathname.split("/")[3]}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if (response.ok) {
        alert("Produkt wurde gelöscht.")
        window.location.href = '/products';
    } else {
        alert("Produkt konnte nicht gelöscht werden!")
    }

    
});

const logout = document.getElementById("logout-btn");

logout.addEventListener('click', () => {
    //https://stackoverflow.com/questions/10593013/delete-cookie-by-name --> Used for cookie deletion
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})