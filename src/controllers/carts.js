import CartsModel from "../models/carts.js";

const controller = {};
const cartsModel = new CartsModel("carts.json");

controller.getCarts = async (req, res) => {
};

controller.createCart = async (req, res) => {
    const cart = await cartsModel.createCart()
    cart ? res.status(201).send(cart) : res.status(500).send()
};

controller.addProductToCart = async (req, res) => {};

export default controller;
