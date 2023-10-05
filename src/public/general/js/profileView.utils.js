const logoutButton = document.querySelector('#logoutButton')

logoutButton.addEventListener('click', async (event) => {
  event.preventDefault()
  await fetch('/api/session/endSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  window.location.replace('/login')
})

const productsButton = document.querySelector('#productsButton')

productsButton.addEventListener('click', async (event) => {
  window.location.replace('/products')
})

const cartButton = document.querySelector('#cartButton')
cartButton.addEventListener('click', async (event) => {
  window.location.replace('/cart')
})

const toast = (message) => Toastify({
  text: message,
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "bottom", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();


// FILES FORM
const form = document.getElementById('filesForm')
form?.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const response = await fetch(`/api/users/${UID}/documents`, {
    method: 'POST',
    body: data,
  })

  if(response.status === 200){
    toast("Documents uploaded successfully 😊")
    setTimeout(()=>{window.location.replace("/current")}, 5000)
  }
  
  else{
    toast("An error has occurred, please try again later. 😣")
    setTimeout(()=>{window.location.replace("/cart")}, 5000)
  }
})
