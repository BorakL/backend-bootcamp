import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from '../controllers/orderController';

const orderRouter = express.Router();
orderRouter
    .route("/")
    .get(getAllOrders)
    .post(createOrder)
orderRouter
    .route("/:id")
    .get(getOrder)
    .patch(updateOrder)
    .delete(deleteOrder)

export default orderRouter