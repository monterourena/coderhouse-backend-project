
const bodyContent = {"quantity":1}

const settings = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body:JSON.stringify(bodyContent)
};


const toast = (message) => Toastify({
  text: message,
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "bottom", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();


const addToCart = async (cid, pid) => {
  console.warn(HOST)
  const fetchResponse = await fetch(
    `${HOST}/api/carts/${cid}/products/${pid}`,
    settings
  );

  if(fetchResponse.status === 200){
    toast("Product has been added to your cart 😊")
  }
  
  else{
    toast("We were unable to add your product to the cart 😣")
  }

  const data = await fetchResponse.json();
  return data;
};
