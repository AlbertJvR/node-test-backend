import express, { Router, Request, Response } from "express";
import Cart from "../entities/cart";
import { collections } from "../services/database.service";

const cartRoutes = Router();

cartRoutes.use(express.json());

cartRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const carts = (await collections.carts?.find({}).toArray()) as Cart[];

        res.status(200).send(carts);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

cartRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const newCart = req.body as Cart;
        console.info(newCart);
        const result = await collections.carts?.insertOne(newCart);

        result
            ? res.status(200).send('Look at that it worked wow')
            : res.status(500).send('Well looks like I still suck at this');   
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

export default cartRoutes;
