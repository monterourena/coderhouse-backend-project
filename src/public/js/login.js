const form = document.querySelector("#loginForm");
const submit = document.querySelector("#submitButton");

submit.addEventListener("click", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const dataObject = {};

  data.forEach((value, key) => (dataObject[key] = value));

  const response = await fetch("/api/session/login", {
    method: "POST",
    body: JSON.stringify(dataObject),
    headers: {
      "Content-Type": "application/json",
    },
  });

  response.ok
    ? window.location.replace("/products")
    : window.location.replace("/login");
});
