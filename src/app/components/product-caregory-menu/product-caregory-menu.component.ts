import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-caregory-menu',
  templateUrl: './product-caregory-menu.component.html',
  styleUrls: ['./product-caregory-menu.component.css']
})
export class ProductCaregoryMenuComponent implements OnInit {
  productCategories : ProductCategory[] = [] ;
  constructor(private productService : ProductService) { }

  ngOnInit(): void {

    this.listProductCategory()
    
  }
  listProductCategory() 
  {
    this.productService.getProductCategories().subscribe(
      data => {
       // console.log(`Product Categories=` + JSON.stringify(data)) ;
        this.productCategories = data ;
      }

    );
  }

}
