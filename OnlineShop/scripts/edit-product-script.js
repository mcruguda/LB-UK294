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
});

const editBtn = document.getElementById('product-edit');
const deleteBtn = document.getElementById('product-del');

deleteBtn.addEventListener("click",() => {
    fetch(`/api/products/${window.location.pathname.split("/")[3]}`), {
        method: "DELETE"
    }.then(() => {
        window.location.href = "/products"
    })
})

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