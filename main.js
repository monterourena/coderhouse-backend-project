import ProductManager from "./Managers/ProductManager.js"

// Testing script

const myProductManager = new ProductManager()
console.log(myProductManager.getProducts()) //[]
myProductManager.addProduct("myTitle","myDescription",200,"path","abc123",25) // "Product added: {title: "myTitle", ... , id: 0}"
console.log(myProductManager.getProducts()) //[{title: "myTitle", ... , id: 0}]
myProductManager.addProduct("myTitle","myDescription",200,"path","abc123",25) // "Invalid product: missing parameters or repeated product code"
myProductManager.getProductById(25) // "Not found"
myProductManager.getProductById(0) // {title: "myTitle", ... , id: 0}
myProductManager.addProduct("myTitle2","myDescription2",201,"path2","def456",30) // "Product added: {title2: "myTitle2", ... , id: 1}"
console.log(myProductManager.getProducts()) //[{title: "myTitle", ... , id: 0}, {title: "myTitle2", ... , id: 1}]