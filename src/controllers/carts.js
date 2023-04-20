import CartsModel from "../models/carts.js";

const controller = {};
const cartsModel = new CartsModel()

controller.getCarts = async (req, res)=>{
    cartsModel.myFunction(req.params.cid)
    res.status(200).send(req.params.cid)
}

export default controller;