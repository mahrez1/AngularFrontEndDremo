import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list', 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product [] = [] ;
  currentCategryId : number =1 ;
  currentCategoryName: string = "";
  searchMode : boolean = false ;
  thePageNumber : number = 1 ;
  thePageSize : number = 5 ;
  theTotalElements : number = 0 ;
  previousCategoryId: number = 1;
  previousKeyWord: string = "";



  constructor(private productService : ProductService , private route : ActivatedRoute, private cartService : CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{this.listProducts()
      this.listProducts()}) ; 
     }

  listProducts () 
  {
    this.searchMode = this.route.snapshot.paramMap.has('keyword') ;
    if (this.searchMode)
    {
      this.handleSearchProducts() ;
    }
    else 
    {
      this.handleListProducts() ;
    }
  }

  handleSearchProducts() 
  {
    const theKeyword : string = this.route.snapshot.paramMap.get('keyword')! ;
   // this.productService.searchProducts(theKeyword).subscribe
   // (data => {this.products = data ;})

    if(this.previousKeyWord != theKeyword)
    {
      this.thePageNumber = 1 ;
    }
    this.previousKeyWord = theKeyword ;

    this.productService.searchProductsPaginate(this.thePageNumber - 1,this.thePageSize ,theKeyword).subscribe(this.processResult())
  }

  handleListProducts()
  {
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id') ;
    if(hasCategoryId) 
    {
      this.currentCategryId = +this.route.snapshot.paramMap.get('id')! ;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;

    }
    else
    {
      this.currentCategryId= 1 ;
      this.currentCategoryName= 'Books' ;
    }

    if(this.previousCategoryId != this.currentCategryId)
    {
      this.thePageNumber = 1 ;
    }

    this.previousCategoryId = this.currentCategryId ;


    this.productService.getProductListPaginate(this.thePageNumber - 1,this.thePageSize ,this.currentCategryId).subscribe(this.processResult())
   
  }

  updatePageSize(pageSize : string) 
  {
    this.thePageSize = + pageSize ;
    this.thePageNumber= 1;
    this.listProducts() ;
  }

  processResult() 
  {
   return (data : any)  => {this.products = data._embedded.products;
      this.thePageNumber = data.page.number+ 1 ;
      this.thePageSize = data.page.size ;
      this.theTotalElements = data.page.totalElements ;
  } ;
  }

  addToCard(theProduct : Product)
  {
    console.log(`add to card : ${theProduct.name}`) ;
    const theCartItem = new CartItem(theProduct) ;
    this.cartService.addToCart(theCartItem) ;
  }


}
