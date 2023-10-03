const form = document.getElementById('resetPasswordForm')
const text = document.getElementById('message')

const urlParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop)
})

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))
  obj.token = urlParams.token
  const response = await fetch('/api/session/restorePassword', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  if (response.ok) {
    window.location.replace("/login")
  } else {
    text.innerText = json.meta.message
  }
})
