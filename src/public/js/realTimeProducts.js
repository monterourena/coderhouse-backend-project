const socket = io()
socket.on("productsUpdate", (products)=>{
    const productsElement = document.querySelector("#ProductsContainer");
    let productsRender = "";
    products.forEach(product => {
        productsRender += `<div style="margin: 16px; padding:8px; background-color:cadetblue">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        </div>`
    });
    productsElement.innerHTML= productsRender;
})