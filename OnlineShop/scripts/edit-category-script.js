document.addEventListener('DOMContentLoaded', () => {
    fetch(`/api/categories/${window.location.pathname.split("/")[3]}`)
    .then(response => response.json())
    .then(category => {
        //https://stackoverflow.com/questions/7609130/set-the-default-value-of-an-input-field -> used for 
        //.value instead of .innerText
        document.getElementById('category-name-edit').value = category.name;
    })
});