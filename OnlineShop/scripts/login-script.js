const loginBtn = document.getElementById("login-btn")

loginBtn.addEventListener('click', async () => {
    const loginUser = document.getElementById("username-value").value;
    const loginPassword = document.getElementById("password-value").value;
    //Help from Mister Maier
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: loginUser,
            password: loginPassword
        })
    });

    if (response.ok) {
        document.getElementById("error-msg").innerText = ""
        const data = await response.json();
        console.log(data.token)
        //https://stackoverflow.com/questions/29838539/how-to-store-access-token-value-in-javascript-cookie-and-pass-that-token-to-head ->
        // Used for the creation of the cookie with the token
        document.cookie=`access_token=${data.token}`
        window.location.href = '/products';
    } else if (response.status == 401){
        document.getElementById("error-msg").innerText = "Benutzer oder Passwort falsch"
    }
    else if (response.status == 404 || response.status == 500){
        document.getElementById("error-msg").innerText = "Server nicht erreichbar, probieren sie später nochmal"
    } else {
        document.getElementById("error-msg").innerText = "Ein Fehler ist aufgetretten"
    }
})