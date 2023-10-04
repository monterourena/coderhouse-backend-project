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

const purchase = async (cid) => {
  console.warn(HOST)
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
  const data = await fetchResponse.json();
  return data;
};