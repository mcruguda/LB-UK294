document.addEventListener('DOMContentLoaded', () => {
    fetch(`/api/categories/${window.location.pathname.split("/")[3]}`)
    .then(response => response.json())
    .then(category => {
        //https://stackoverflow.com/questions/7609130/set-the-default-value-of-an-input-field -> used for 
        //.value instead of .innerText
        document.getElementById('category-name-edit').value = category.name;
    })

const editCategoryBtn = document.getElementById("editcategory-btn")

editCategoryBtn.addEventListener('click', async () => {
    const categoryName = document.getElementById("category-name-edit").value;

    if(categoryName == "") {
        alert("Alle felder muessen ausgefuellt sein!")
    } else {
        const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        const response = await fetch(`/api/categories/${window.location.pathname.split("/")[3]}`, {
            method: 'PUT',
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
            alert("Produkt konnte nicht erstellt werden.")
        }
    }

    
})
});