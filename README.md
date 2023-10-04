# Ecommerce Product Manager 

![Banner](https://user-images.githubusercontent.com/117543842/229423894-364befe8-b822-4f7a-bb1b-90c70e1e3732.png)

## Getting Started
### Installation
- Clone this repository locally
- Add the environment variables to the .env file at the root folder of the project
- From the terminal, navigate to the project root folder and run the following command to install the required dependencies:
```console
npm install
```
### Usage
- To start the server in development environment, run the following command:
```console
npm run dev
```
## Demo and Deploy
You can access the deploy of this project by clicking on [this link](https://coderhouse-backend-project.onrender.com/). In order to test email notifications you are required to register with a real email address.

### Admin Credentials
> email: admin@email.com
> 
> password: password1234



## Views
| **Endpoint**            | **Description**                                                                                                 | **Policy**          | **Role Required** |
|-------------------------|-----------------------------------------------------------------------------------------------------------------|---------------------|-------------------|
| _/current_              | Profile of the logged in user. Premium and regular users will be able to upload their documents from this view. | AUTH_USERS_ONLY     | -                 |
| _/products_             | View of existing products. Deletion, creation and modification can only be done from the API with postman.      | AUTH_USERS_ONLY     | -                 |
| _/users_                | View of existing users and their information                                                                    | AUTH_USERS_ONLY     | admin             |
| _/cart_                 | Shopping cart with all the products that have been added for the logged in user.                                | AUTH_USERS_ONLY     | -                 |
| _/login_                | Login View. Users logging in via github will be automatically registered if they do not have an account.        | NOT_AUTH_USERS_ONLY | -                 |
| _/register_             | User registration view                                                                                          | NOT_AUTH_USERS_ONLY |                   |
| _/resetPasswordRequest_ | Password reset view. Only registered users will be able to request a password reset.                            | NOT_AUTH_USERS_ONLY | -                 |

## API Endpoints
### Cart
| **Method**   | **Endpoint**                    | **Description**                              | **Body Schema**                                                | **Queries** | **Params**                    |
|--------------|---------------------------------|----------------------------------------------|----------------------------------------------------------------|-------------|-------------------------------|
| **_POST_**   | _/api/carts/_                   | Create new empty cart                        | -                                                              |             | -                             |
| **_GET_**    | _/api/carts/:cid_               | Get products in cart                         | -                                                              |             | cid: Cart ID                  |
| **_POST_**   | _/api/carts/:cid/products/:pid_ | Add one product to cart                      | -                                                              |             | cid: Cart ID / pid:Product DI |
| **_POST_**   | _/api/carts/:cid/purchase_      | Process a shopping cart purchase             | -                                                              |             | cid: Cart ID                  |
| **_PUT_**    | _/api/carts/:cid/products/:pid_ | Update the quantity of a product in the cart | {quantity: Number}                                             | -           | cid: Cart ID / pid:Product DI |
| **_PUT_**    | _/api/carts/:cid_               | Update a cart's content                      | {"cartContent": [{"quantity": Number,"pid":Mongo Product ID}]} |             | cid: Cart ID                  |
| **_DELETE_** | _/api/carts/:cid_               | Remove all content from a shopping cart      | -                                                              | -           | cid: Cart ID                  |
| **_DELETE_** | _/api/carts/:cid/products/:pid_ | Remove an item from a shopping cart          | -                                                              | -           | cid: Cart ID / pid:Product DI |

### Users
> Documentation in progress

| **Method** | **Endpoint** | **Description** | **Body Schema** | **Queries** | **Params** |
|---|---|---|---|---|---|
| **_GET_** | /api/users/ | Gets all registered users |  |  |  |
| **_DELETE_** | /api/users/ | Delete all users who have been inactive for a period of time defined in the controller |  |  |  |
| **_POST_** | /api/users/:uid/documents | It is used to upload the user's documents. The fieldName/Key considered to indicate if a user has the required files or not are "identifications", "proof-of-addresses" and "bank-statements". Files can be uploaded individually or simultaneously, but always with an individual Fieldname/Key for each file. |  |  |  |
| **_POST_** | /api/users/premium/:uid | Toggles the role of a user between premium and user. |  |  |  |

### Products
> Documentation in progress
### Session
> Documentation in progress
