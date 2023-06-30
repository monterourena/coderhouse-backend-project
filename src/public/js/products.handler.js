
const bodyContent = {"quantity":1}

const settings = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body:JSON.stringify(bodyContent)
};

const addToCart = async (cid, pid) => {
  const fetchResponse = await fetch(
    `http://localhost:8080/api/carts/${cid}/products/${pid}`,
    settings
  );
  const data = await fetchResponse.json();
  return data;
};
