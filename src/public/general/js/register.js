const form = document.querySelector("#registerForm")
const submit = document.querySelector("#submitButton")

submit.addEventListener("click", async (event) =>{
    event.preventDefault();
    const data = new FormData(form);
    const dataObject = {}

    data.forEach((value,key)=>(dataObject[key]=value))  
    
    const response = await fetch("/api/session/register",{
        method: "POST",
        body:JSON.stringify(dataObject),
        headers:{
            "Content-Type":"application/json"
        }
    })
    
    response.ok
    ? window.location.replace("/login")
    : window.location.replace("/register");
})


