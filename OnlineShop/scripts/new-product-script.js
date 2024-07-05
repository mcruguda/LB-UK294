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