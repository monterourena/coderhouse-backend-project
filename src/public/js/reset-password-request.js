const form = document.getElementById('resetPasswordRequestForm')
const text = document.getElementById('message')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))
  const response = await fetch('/api/session/sendPasswordReset', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  console.log(response)
  if (response.ok) {
    text.innerText = `Se ha enviado un correo de verificación al correo solicitado`
  } else {
    text.innerText = json.meta.message
  }
})
