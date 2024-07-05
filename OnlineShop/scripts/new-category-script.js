const createCategoryBtn = document.getElementById("newcategory-btn")

createCategoryBtn.addEventListener('click', async () => {
    const categoryName = document.getElementById("category-name").value;

    if(categoryName == "") {
        alert("Alle felder muessen ausgefuellt sein!")
    } else {
        const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: categoryName
            })
        });
    
        if (response.ok) {
            window.location.href = '/category';
        } else {
            alert("Kategorie konnte nicht erstellt werden.")
        }
    }

    
})