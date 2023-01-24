import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  

  private basedUrl = 'http://localhost:8080/api/products' ;
  private categoryUrl = 'http://localhost:8080/api/product-category' ;


  constructor(private HttpClient : HttpClient) { }

  getProductList(theCategoryId : number) : Observable<Product[]> 
  {
    const searchUrl = `${this.basedUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.getproducts(searchUrl) ;
  }
  getProductCategories() : Observable<ProductCategory[]> 
  {
    return this.HttpClient.get<GetResponseProductCategoty>(this.categoryUrl).pipe(map(response => response._embedded.productCategory)) ;  }
  searchProducts(theKeyword: any) : Observable<Product[]> 
   {
    const searchUrl = `${this.basedUrl}/search/findByNameContaining?name=${theKeyword}`
    return this.getproducts(searchUrl) ;
    }

  private getproducts(searchUrl: string): Observable<Product[]> {
    return this.HttpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProduct(theProductId: number) : Observable<Product> {
    const ProductIdUrl = `${this.basedUrl}/${theProductId}` ;
    return this.HttpClient.get<Product>(ProductIdUrl);

  }
  getProductListPaginate(thePage : number,thePageSize : number,theCategoryId : number) : Observable<GetResponseProducts> 
  {
    const searchUrl = `${this.basedUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`
    return this.HttpClient.get<GetResponseProducts>(searchUrl);
  }

}

interface GetResponseProducts 
{
  _embedded : {products : Product[] ;}

  page : 
  {
    size : number ,
    totalElements : number ,
    totalPages : number ,
    number : number
  }
}

interface GetResponseProductCategoty
{
  _embedded : {productCategory : ProductCategory[] ;}
}