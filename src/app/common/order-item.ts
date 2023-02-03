import { CartItem } from "./cart-item";

export class OrderItem {
         imageUrl : string ;
         unitPrice : number ;
         Quantity : number ;
         productId : string ;

    constructor(cartItem : CartItem )
        {
            this.imageUrl =cartItem.imageUrl! ;
            this.unitPrice = cartItem.unitPrice! ;
            this.Quantity = cartItem.quantity! ;
            this.productId = cartItem.id?.toString()!;
        }
}
