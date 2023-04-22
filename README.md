# Ecommerce Product Manager 

![Banner](https://user-images.githubusercontent.com/117543842/229423894-364befe8-b822-4f7a-bb1b-90c70e1e3732.png)


## Getting Started
To run this project locally, you should have installed Node.js.

Clone this repository using git clone.

## Project structure

```js
├── src
│   ├── controllers
│   │   └── carts.json
│   │   └── products.json
│   ├── data
│   │   └── carts.json
│   │   └── products.json
│   ├── models
│   │   └── carts.json
│   │   └── products.json
│   ├── routes
│   │   └── carts.json
│   │   └── products.json
│   ├── test
│   │   └── test-bench.js
│   └── utils
│   ├── app.js
├── .gitignore
└── package.json
```
- **src/controllers/carts.json**: Carts Model Controller.
- **src/controllers/products.json**: Products Model Controller.
- **src/data/carts.json**: JSON file where carts are stored.
- **src/data/products.json**: JSON file where products are stored.
- **src/models/carts.js**: Model that handles the management of the carts.
- **src/models/products.js**: Model that handles the management of the products.
- **src/routes/carts.js**: Router file that defines the endpoints for the carts.
- **src/routes/products.js**: Router file that defines the endpoints for the products.
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
| **Request type** | **Path** | **Body** | **Query params** | **Path variables** | **Output** |
|---|---|---|---|---|---|
| GET | /api/products/ |  | limit | | Array |
| GET | /api/products/:pid |  |  | pid : Product ID | Object |
| POST | /api/products/ | Object |  |  | Object |
| PUT | /api/products/:pid | Object |  | pid : Product ID | Object |
| DELETE | /api/products/:pid |  |  | pid : Product ID | Object |
| POST | /api/carts/ |  |  |  | Object |
| GET | /api/carts/:cid |  |  | cid : Cart ID | Array |
| POST | /api/carts/:cid/product/:pid | Object |  | cid : Cart ID, pid : Product ID | Object |

## GET /api/products/
Returns an array of objects associated with the existing products.
#### Query params
- **limit**: Maximum number of returned products


## GET /api/products/:pid
Returns an object with the information associated to a product with a specific ID.
#### Path variables
- **pid**: Product ID

## POST /api/products/
Allows to add a product to the Products model. It receives an object through the body and returns an object with the values entered along with the assigned product ID.
#### Body
```js
title:        String  | Required
description:  String  | Required | Unique
code:         String  | Required
price:        Integer | Required
status:       String  | Required
stock:        Integer | Required
category:     String  | Required
thumbnails:   Array   | Optional
```

## PUT /api/products/:pid
Modifies a product from a given Product ID. Receives through the body an object with attributes. If the attributes exist it replaces them,  if they do not exist they are added. The Product ID is the only one that **is not modified** regardless of whether it is sent in the attributes object.


## DELETE /api/products/:pid
Eliminates a product from the specified id


