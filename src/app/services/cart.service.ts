import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItems : CartItem[] = [] ;
totalPrice : Subject<number> = new Subject<number>() ;
totalQuantity : Subject<number> = new Subject<number>() ;

  constructor() { }
  addToCart(theCartItem : CartItem) 
  {
    let alreadyExistsInCart : boolean = false ;
    let existingCartItem : CartItem = undefined! ;
    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!
    /*for(let tempCartItem of this.cartItems) 
    {
    if(  tempCartItem.id === theCartItem.id)
    { existingCartItem = tempCartItem ;
      break ;

    }
  }*/

  alreadyExistsInCart = (existingCartItem!= undefined) ;
  if(alreadyExistsInCart)
  {
    existingCartItem.quantity!++ ;
  }
  else
  {
    this.cartItems.push(theCartItem) ;
  }

  this.calculateTotal() ;

  }
  calculateTotal() 
  {
    let totalPriceValue : number = 0 ;
    let totalQuantityValue :number = 0 ;
    for(let currentCartItem of this.cartItems)
    {
      totalPriceValue += currentCartItem.quantity! * currentCartItem.unitPrice!;
      totalQuantityValue += currentCartItem.quantity! ;
    }
    this.totalPrice.next(totalPriceValue) ;
    this.totalQuantity.next(totalQuantityValue) ;
  }
  decrementQuantity(theCartItem : CartItem)
  {
    theCartItem.quantity!-- ;
    if(theCartItem.quantity==0)
    {
      this.remove(theCartItem) ;
    }
    else
    {
      this.calculateTotal() ;

    }
  }
  remove (theCartItem: CartItem)
  {
   const itemIndex = this.cartItems.findIndex
   (tempCartItem => tempCartItem.id == theCartItem.id)
   if(itemIndex>-1)
   {
    this.cartItems.splice(itemIndex , 1) ;
    this.calculateTotal() ;
   }
  }
}

