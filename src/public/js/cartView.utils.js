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
