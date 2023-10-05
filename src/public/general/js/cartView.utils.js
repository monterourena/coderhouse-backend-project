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

const currentButton = document.querySelector('#currentButton')

currentButton.addEventListener('click', async (event) => {
  window.location.replace('/current')
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

const purchase = async (cid) => {
  const fetchResponse = await fetch(
    `${HOST}/api/carts/${cid}/purchase`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }
  );

  if(fetchResponse.status === 200){
    toast("Your order has been placed 😊")
    setTimeout(()=>{window.location.replace("/cart")}, 5000)
  }

  else if (fetchResponse.status === 400){
    toast("There are no products in your cart, your order cannot be processed 😣")
    setTimeout(()=>{window.location.replace("/cart")}, 5000)
  }
  
  else if (fetchResponse.status === 422){
    toast("Not enough stock for your selected products 😣")
    setTimeout(()=>{window.location.replace("/cart")}, 5000)
  }

  else{
    toast("An error has occurred, please try again later. 😣")
    setTimeout(()=>{window.location.replace("/cart")}, 5000)
  }
 
};