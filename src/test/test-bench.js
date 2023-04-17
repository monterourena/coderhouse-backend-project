

// Testing script

import ProductManager from "../managers/product-manager.js"

async function testBenchA(){
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


async function testBenchB(){
  const myProductManager = new ProductManager("products.json")
  await myProductManager.getProductById(10);
  // "Not found"

  await myProductManager.getProductById(0);
  // "Successful operation" {title: "myTitle", ... , id: 0}

  await myProductManager.updateProduct(12);
  // "Not found"

  await myProductManager.updateProduct(1,{id:28, price:2000, stock:930, category:"myCategory"});
  // "Successful operation" {title: "myTitle2", price:2000, stock:930, category:"myCategory", ... , id: 1}

  await myProductManager.deleteProduct(0);
  // "Successful operation"
}



export { testBenchA, testBenchB} 