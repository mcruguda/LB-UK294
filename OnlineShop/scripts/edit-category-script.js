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

const logout = document.getElementById("logout-btn");

logout.addEventListener('click', () => {
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})