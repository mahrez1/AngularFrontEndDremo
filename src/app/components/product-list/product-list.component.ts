import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
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


  constructor(private productService : ProductService , private route : ActivatedRoute) { }

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
    this.productService.searchProducts(theKeyword).subscribe
    (data => {this.products = data ;})
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
    this.productService.getProductList(this.currentCategryId).subscribe
    (data => {this.products = data ;})
  }

}
