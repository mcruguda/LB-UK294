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

document.addEventListener('DOMContentLoaded', () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie --> used for getting specific cookie
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
    //https://stackoverflow.com/questions/10593013/delete-cookie-by-name --> Used for cookie deletion
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})