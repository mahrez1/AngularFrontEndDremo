import { Product } from "./product";

export class CartItem {

     id? : number  ;
     name? : string;
     imageUrl? : string;
     unitPrice? : number;
     quantity? : number;

    constructor (product : Product )
    {
        this.id = product.id || 0 ;
        this.name = product.name || '' ;
        this.imageUrl = product.imageUrl || '' ;
        this.unitPrice = product.unitPrice || 0 ;
        this.quantity= 1 || 0  ;
    }
}
