import { ProductModel } from "../../products/models/product.model";

export class CartModel{
    _id: string = "";
    userId: string = "";
    productId: string ="";
    products: ProductModel[] = [];//Eventhough  we've one model, it is coming in an array format from api.
    price: number = 0;
    quantity: number = 1;
}