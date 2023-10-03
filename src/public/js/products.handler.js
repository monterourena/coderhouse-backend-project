
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
    `${process.env.HOST}/api/carts/${cid}/products/${pid}`,
    settings
  );
  const data = await fetchResponse.json();
  return data;
};
