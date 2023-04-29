const socket = io()
socket.on("productsUpdate", (products)=>{
    const productsElement = document.querySelector("#ProductsContainer");
    let productsRender = "";
    products.forEach(product => {
        productsRender += `<div style="margin: 16px; padding:8px; background-color:#e6eef2">
        <h3>${product.title}</h3>
        <h4>${product.description}</h4>
        <p> ID: ${product.id} Code: ${product.code}</p>
        <p> Price: ${product.price}</p>
        <p> Status: ${product.status}</p>
        <p> Category: ${product.category}</p>
        </div>`
    });
    productsElement.innerHTML= productsRender;
})



// "title": "Apple Watch",
//     "description": "Series 5",
//     "code": "apple001",
//     "price": 1000,
//     "status": true,
//     "stock": 270,
//     "category": "Smart Watch",
//     "thumbnails": [
//         "aws_bucket.com/image.png",
//         "aws_bucket.com/image2.png",
//         "aws_bucket.com/image3.png"
//     ],
//     "id": 0