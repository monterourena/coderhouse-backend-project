
const bodyContent = {"quantity":1}

const settings = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body:JSON.stringify(bodyContent)
};

const addToCart = async (pid) => {
  const DEFAULT_CART_ID = "6470f7907ba3639eb9354505";
  const fetchResponse = await fetch(
    `http://localhost:8080/api/carts/${DEFAULT_CART_ID}/products/${pid}`,
    settings
  );
  const data = await fetchResponse.json();
  return data;
  console.log(result);
};
