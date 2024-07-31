import { NextFunction, Request, Response } from "express";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";
import OrderModel from "../models/orderModel";

export const getAllOrders = getAll(OrderModel);
export const getOrder = getOne(OrderModel);
export const createOrder = createOne(OrderModel);
export const updateOrder = updateOne(OrderModel);
export const deleteOrder = deleteOne(OrderModel);