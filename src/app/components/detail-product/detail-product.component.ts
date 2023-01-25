import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  product : Product = new Product();


  constructor(private route : ActivatedRoute , private productService : ProductService , private cartService : CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{this.handleProductDetail() ;})
  }
  handleProductDetail() {
    const theProductId = +this.route.snapshot.paramMap.get('id')! ;
    this.productService.getProduct(theProductId).subscribe
    (
      data => 
      {
        this.product = data ;
      }
    )

  }

  addToCard()
  {
    console.log(`add to card : ${Product.name}`) ;
    const theCartItem = new CartItem(this.product) ;
    this.cartService.addToCart(theCartItem) ;
  }



}
