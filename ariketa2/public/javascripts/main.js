function prestatu(event) {
    event.preventDefault();
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let mezua = document.getElementById("errorea")
    const egin = async () => {
    await fetch('/egiaztapena', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
        }).then(
            r => r.json())
        .then(bakoitza => {  
                console.log(bakoitza)
                if (bakoitza.erantzuna == true) document.getElementsByTagName("form")[0].submit()
                else mezua.innerText = "Datuak okerrak dira"
        })
}
egin()
}