import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  //  selector: 'router-outlet', 
  selector: 'app-product-list', 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product [] = [] ;
  currentCategryId : number =1 ;

  constructor(private productService : ProductService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{this.listProducts()
      this.listProducts()}) ; 
     }

  listProducts () 
  {
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id') ;
    if(hasCategoryId) 
    {
      this.currentCategryId = +this.route.snapshot.paramMap.get('id')! ;
    }
    else
    {
      this.currentCategryId= 1 ;
    }
    this.productService.getProductList(this.currentCategryId).subscribe
    (data => {this.products = data ;})
  }

}
