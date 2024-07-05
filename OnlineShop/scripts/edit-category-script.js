document.addEventListener('DOMContentLoaded', () => {
    // https://stackoverflow.com/questions/6888783/split-path-name-to-get-routing-parameter -->
    // Used for splitting the ID out of the Url
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
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie --> used for getting specific cookie
        const token = document.cookie.split("; ")
            .find((row) => row.startsWith("access_token="))
            ?.split("=")[1]

        if(categoryName == "") {
            alert("Alle felder muessen ausgefuellt sein!")
        } 
        //Updates a category name
        else {
            // https://stackoverflow.com/questions/6888783/split-path-name-to-get-routing-parameter -->
            // Used for splitting the ID out of the Url
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
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie --> used for getting specific cookie
    const token = document.cookie.split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1]
    const login = document.getElementById("login-btn");
    const logout = document.getElementById("logout-btn");
    // https://www.w3schools.com/howto/howto_js_add_class.asp -> to add a html class in js
    // Changes login to logout if user is logged in
    if(token) {
        login.classList.add("d-none");
        logout.classList.remove("d-none")
    }
});

const logout = document.getElementById("logout-btn");

logout.addEventListener('click', () => {
    //https://stackoverflow.com/questions/10593013/delete-cookie-by-name --> Used for cookie deletion
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})