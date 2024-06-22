import { ObjectId } from "mongodb";

export default class Cart {
    public id?: ObjectId;
    public items: CartItem[];
    public totalQuantity: number;

    constructor() {
        this.items = [];
        this.totalQuantity = 0;
    }
}

export class CartItem {
    constructor(
        public price: number, 
        public quantity: number, 
        public totalPrice: number, 
        public name: string,
        public id?: ObjectId
    ) {}
}