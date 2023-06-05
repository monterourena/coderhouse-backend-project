const logoutButton = document.querySelector("#logoutButton")

logoutButton.addEventListener("click", async (event) =>{
    event.preventDefault();
    await fetch("/api/session/endSession",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        }
    })

    window.location.replace("/login")
})
