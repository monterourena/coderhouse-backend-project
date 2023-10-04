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

// FILES FORM
const form = document.getElementById('filesForm')
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData(form)
  await fetch(`/api/users/${UID}/documents`, {
    method: 'POST',
    body: data,
  })
})
