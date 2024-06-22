import express, { Router, Request, Response } from "express";
import Cart from "../entities/cart";
import { collections } from "../services/database.service";
import { ObjectId } from "mongodb";

const cartRoutes = Router();

cartRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const carts = (await collections.carts?.find({}).toArray()) as Cart[];

        res.status(200).send(carts);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

cartRoutes.get('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const cart = (await collections.carts?.findOne(query)) as Cart;

        res.status(200).send(cart);
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

cartRoutes.put('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCart: Cart = req.body as Cart;
        const query = { _id: new ObjectId(id) };

        const result = await collections.carts?.updateOne(query, { $set: updatedCart });

        result
            ? res.status(200).send('Updated successfully')
            : res.status(304).send('Update failed');
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

cartRoutes.delete('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = {_id: new ObjectId(id)};
        const result = await collections.carts?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed`);
        } else if (!result) {
            res.status(400).send(`Failed to remove`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Cart with id ${id} does not exist`);
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

export default cartRoutes;
