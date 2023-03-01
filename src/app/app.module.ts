import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCaregoryMenuComponent } from './components/product-caregory-menu/product-caregory-menu.component';
import { SearchComponent } from './components/search/search.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import {  OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';

const oktaConfig =myAppConfig.oidc ;
const oktaAuth = new OktaAuth(oktaConfig) ; 

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCaregoryMenuComponent,
    SearchComponent,
    DetailProductComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    OktaAuthModule
  ],
  providers: [ProductService , {provide : OKTA_CONFIG , useValue:{oktaAuth}}], 
  bootstrap: [AppComponent]
})
export class AppModule { }
