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

const currentButton = document.querySelector('#currentButton')
currentButton.addEventListener('click', async (event) => {
  window.location.replace('/current')
})


const cartButton = document.querySelector('#cartButton')
cartButton.addEventListener('click', async (event) => {
  window.location.replace('/cart')
})
