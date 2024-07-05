const createProductBtn = document.getElementById("newproduct-btn")

createProductBtn.addEventListener('click', async () => {
    const productName = document.getElementById("product-name").value;
    const productCategory = document.getElementById("product-category").value;
    const productPrice = document.getElementById("product-price").value;
    //const productImg = document.getElementById("product-img").value;

    console.log(productName)
    console.log(productCategory)
    console.log(productPrice)

    if(productName == "" || productPrice == "" /*|| productImg == "" || productImg == null*/) {
        alert("Alle felder muessen ausgefuellt sein!")
    } else {
        const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: productName,
                categoryId: parseInt(productCategory),
                price: parseFloat(productPrice),
                image: "test"
            })
        });
    
        if (response.ok) {
            window.location.href = '/products';
        } else {
            alert("Produkt konnte nicht erstellt werden.")
        }
    }

    
})

document.addEventListener('DOMContentLoaded', () => {
    const token = document.cookie.split("; ")
            .find((row) => row.startsWith("access_token="))
            ?.split("=")[1]
    const login = document.getElementById("login-btn");
    const logout = document.getElementById("logout-btn");
    // https://www.w3schools.com/howto/howto_js_add_class.asp -> to add a html class in js
    if(token) {
        login.classList.add("d-none");
        logout.classList.remove("d-none");
    }
})
const logout = document.getElementById("logout-btn");

logout.addEventListener('click', () => {
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})