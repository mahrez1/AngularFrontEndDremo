import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private PurchaseUrl = 'http://localhost:8080/api/checkout/purchase' ;

  constructor(private HttpClient : HttpClient) 
  { }

  placeOrder(purchase : Purchase):Observable<any>
  {
    return  this.HttpClient.post<Purchase>(this.PurchaseUrl, purchase) ;
  }
}
 