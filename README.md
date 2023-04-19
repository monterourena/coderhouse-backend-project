# Ecommerce Product Manager 

![Banner](https://user-images.githubusercontent.com/117543842/229423894-364befe8-b822-4f7a-bb1b-90c70e1e3732.png)


## Getting Started
To run this project locally, you should have installed Node.js.

Clone this repository using git clone.

## Project structure

```js
├── src
│   ├── data
│   │   └── products.json
│   ├── managers
│   │   └── product-manager.js
│   ├── routes
│   │   └── products.router.js
│   ├── test
│   │   └── test-bench.js
│   └── utils
│   ├── app.js
├── .gitignore
└── package.json
```

- **src/data/products.json**: JSON file where the products are stored.

- **src/managers/product-manager.js**: Class that handles the management of the products.

- **src/routes/products.router.js**: Router file that defines the endpoints for the products.

- **src/app.js**: Main file that sets up the server and defines the middleware.

### Installation
From the terminal, navigate to the project folder and run the following command to install the required dependencies:
```console
npm install
```
### Usage
To start the server, run the following command:
```console
npm run dev
```
The server will be listening on port 8080.

# Endpoints

## Get all products
```vbnet 
GET /products
```
Returns an array with all the products stored in products.json. An optional query parameter limit can be used to limit the number of results returned.

#### Query Parameters:
```vbnet 
limit (integer)
```
- **Limit**: Maximum quantity of returned products. If no value is defined for the limit or if it is less than one, all existing products are returned.
## Get product by ID
```vbnet 
- GET /products/:id
```
Returns the product with the specified id.
