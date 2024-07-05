document.addEventListener('DOMContentLoaded', () => {

    fetch(`/api/products/${window.location.pathname.split("/")[3]}`)
        .then(response => response.json())
        .then(product => {
            const productName = document.getElementById('product-name');
            const productCategory = document.getElementById('product-category');
            const productPrice = document.getElementById('product-price');
            const productImage = document.getElementById('product-img');
            
            fetch(`/api/products/${window.location.pathname.split("/")[3]}`)
                .then(response => response.json())
                .then(product => { 
                productName.value = product.name;
                //productCategory.innerText = product.name;
                productPrice.value = product.price;
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
        const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        const response = await fetch(`/api/products/${window.location.pathname.split("/")[3]}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: productName,
                price: productPrice,
                categoryId: 1,
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
    const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
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
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})