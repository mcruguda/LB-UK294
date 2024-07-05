const registerBtn = document.getElementById("register-btn")

registerBtn.addEventListener('click', async () => {
    const registerUser = document.getElementById("username-value").value;
    const registerPassword = document.getElementById("password-value").value;
    const registerPassword2 = document.getElementById("password-value2").value;

    if(registerUser == "" || registerPassword == "" || registerPassword2 == "") {
        document.getElementById("error-msg").innerText = "Alle Felder muessen ausgefuellt sein"
    } else {
        if(registerPassword == registerPassword2) {
            
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: registerUser,
                    password: registerPassword,
                    role: "user"
                })
            });
        
            if (response.ok) {
                document.getElementById("error-msg").innerText = ""
                window.location.href = '/login';
            } else {
                document.getElementById("error-msg").innerText = "Ein Fehler ist aufgetretten"
            }
        } else {
            document.getElementById("error-msg").innerText = "Passwoerter stimmen nicht ueberein."
        }
    }

    
})