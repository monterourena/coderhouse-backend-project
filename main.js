import ProductManager from "./Managers/ProductManager.js"

// Testing script

async function TestBench(){
  const myProductManager = new ProductManager("products.json")

  console.log(await myProductManager.getProducts())
  //[]

  await myProductManager.addProduct("myTitle","myDescription",200,"path","abc123",25) 
  // "Product added: {title: "myTitle", ... , id: 0}"

  console.log(await myProductManager.getProducts())
  //[{title: "myTitle", ... , id: 0}]

  await myProductManager.addProduct("myTitle","myDescription",200,"path","abc123",25) 
  // "Invalid product: missing parameters or repeated product code"

  await myProductManager.getProductById(25) 
  // "Not found"

  await myProductManager.getProductById(0) 
  // Product found {title: "myTitle", ... , id: 0}

  await myProductManager.addProduct("myTitle2","myDescription2",201,"path2","def456",30) 
  // "Product added: {title2: "myTitle2", ... , id: 1}"

  console.log(await myProductManager.getProducts())
  //[{title: "myTitle", ... , id: 0}, {title: "myTitle2", ... , id: 1}]
}


TestBench();