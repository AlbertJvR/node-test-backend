import { Collection, Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import Cart from '../entities/cart';

export const collections: { carts?: Collection<Cart> } = {};

export async function connectToDatabase() {
    dotenv.config();

    console.info(process.env.DB_CONN_STRING);
    
    const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING || '');
    await client.connect();

    const db: Db = client.db(process.env.DB_NAME);
    const cartsCollection: Collection<Cart> = db.collection<Cart>(process.env.CART_COLLECTION_NAME || '');

    collections.carts = cartsCollection;
}