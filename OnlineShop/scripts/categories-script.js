document.addEventListener('DOMContentLoaded', async () => {

    const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        const login = document.getElementById("login-btn");
        const logout = document.getElementById("logout-btn");
        // https://www.w3schools.com/howto/howto_js_add_class.asp -> to add a html class in js
        if(token) {
            login.classList.add("d-none");
            logout.classList.remove("d-none")

            const isAdmin = await fetch(`/api/isAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if(!isAdmin.ok) {
                document.getElementById("add-category").classList.add("d-none");
                fetch(`/api/categories`)
                .then(response => response.json())
                .then(categories => {
                    const categoriesList = document.getElementById('categories-container');
                    categories.forEach(category => {
                        categoriesList.innerHTML = `${categoriesList.innerHTML}
                
                                    <div class="d-flex flex-row gap-5 justify-content-center mb-5 bg-body-tertiary m-5 p-2">
                                        <h2 class="text-center">${category.name}</h2>
                                    </div>   
                                `;
                    });
                })
            } else {
                fetch(`/api/categories`)
                .then(response => response.json())
                .then(categories => {
                    const categoriesList = document.getElementById('categories-container');
                    categories.forEach(category => {
                        categoriesList.innerHTML = `${categoriesList.innerHTML}
                
                                    <div class="d-flex flex-row gap-5 justify-content-center mb-5 bg-body-tertiary m-5 p-2 justify-content-between">
                                        <a class="icon-link p-2" href="/category/edit/${category.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-pen fs-3" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </a>
                                        <h2>${category.name}</h2>
                                        <a class="icon-link p-2" href="javascript:deleteCategory(${category.id})">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-trash fs-3" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                        </a>

                                    </div>   
                                `;
                    });
                })
            }
        } else {
            document.getElementById("add-category").classList.add("d-none");
                fetch(`/api/categories`)
                .then(response => response.json())
                .then(categories => {
                    const categoriesList = document.getElementById('categories-container');
                    categories.forEach(category => {
                        categoriesList.innerHTML = `${categoriesList.innerHTML}
                
                                    <div class="d-flex flex-row gap-5 justify-content-center mb-5 bg-body-tertiary m-5 p-2">
                                        <h2 class="text-center">${category.name}</h2>
                                    </div>   
                                `;
                    });
                })
        }
    
});

async function deleteCategory(id) {
    const token = document.cookie.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
    const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    console.log(`/api/categories/${id}`)
    if (response.ok) {
        alert("Kategorie wurde gelöscht.")
        window.location.href = '/category';
    } else {
        alert("Kategorie konnte nicht gelöscht!")
    }
}

const logout = document.getElementById("logout-btn");

logout.addEventListener('click', () => {
    document.cookie = "access_token" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})