import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CheckoutFormService } from 'src/app/services/checkout-form.service';
import { spValidators } from 'src/app/common/validators';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice : number =0.00 ;
  totalQuantity : number = 0 ;
  creditCardYears :number[] = [] ;
  creditCardMonths :number[] = [] ;
  countries : Country[] = [] ;
  shippingAdressStates : State[] = [] ;
  billingAdressStates : State[] = [] ;



  checkoutFormGroup! : FormGroup ;

  constructor(private formBuilder : FormBuilder , private CheckoutFormService : CheckoutFormService ,private cartService : CartService , private checkoutService : CheckoutService,private router : Router) { }

  ngOnInit(): void {
    this.updateCartStatus() ;
    this.checkoutFormGroup  =this.formBuilder.group
    (
      {
        customer : this.formBuilder.group
        (
          {
            firstName : new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace]) ,
            lastName : new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace]) ,
            email : new FormControl('',[Validators.required,
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            spValidators.whiteSpace
            
            ]) , 
          }
        ) ,
        shippingAdress : this.formBuilder.group
        (
          {
            street : new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace]) ,
            city : new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace]) ,
            state : new FormControl('',[Validators.required]) ,
            country : new FormControl('',[Validators.required]) ,
            zipCode :new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace]) 

          }
        ) ,
        billingAdress : this.formBuilder.group
        (
          {
            street : new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace]) ,
            city :new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace]) ,
            state : new FormControl('',[Validators.required]) ,
            country : new FormControl('',[Validators.required]) ,
            zipCode : new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace]) 

          }
        ) ,
        creditCard : this.formBuilder.group
        (
          { 
            cardType :new FormControl('',[Validators.required]) ,
            nameOnCard : new FormControl('',[Validators.required,Validators.minLength(2), spValidators.whiteSpace])  ,
            cardNumber :  new FormControl('',[Validators.required,
              Validators.pattern('[0-9]{16}'),
            spValidators.whiteSpace
            
            ]) , 
            securityCode :  new FormControl('',[Validators.required,
              Validators.pattern('[0-9]{3}'),
            spValidators.whiteSpace
            
            ]) , 
            expirationMonth : [''] ,
            expirationYear : [''] 
          }
        )

      }
    ) ;
    //add months and years
    const startMonth : number = new Date().getMonth() + 1 ;
    this.CheckoutFormService.getCreditCardMonths(startMonth).subscribe
    (
      data =>
      {
        this.creditCardMonths =data ;
      }
    )
    this.CheckoutFormService.getCreditCardYears().subscribe
    (
      data =>
      {
        this.creditCardYears =data ;
      }
    )

    this.CheckoutFormService.getCountries().subscribe
    (
      data =>
      {
        this.countries =data ;
      }
    )

   

  }

  get firstName()
  {
    return this.checkoutFormGroup.get('customer.firstName') ;
  }
  get lastName()
  {
    return this.checkoutFormGroup.get('customer.lastName') ;
  }
  get email()
  {
    return this.checkoutFormGroup.get('customer.email') ;
  }
  //to do
  get shippingAddressStreet()
  {
    return this.checkoutFormGroup.get('shippingAdress.street') ;
  }
  get shippingAddressCity()
  {
    return this.checkoutFormGroup.get('shippingAdress.city') ;
  }
  get shippingAddressState()
  {
    return this.checkoutFormGroup.get('shippingAdress.state') ;
  }
  get shippingAddressCountry()
  {
    return this.checkoutFormGroup.get('shippingAdress.country') ;
  }
  get shippingAddressZipCode()
  {
    return this.checkoutFormGroup.get('shippingAdress.zipCode') ;
  }

  ////// billing

  get billingAdressStreet()
  {
    return this.checkoutFormGroup.get('billingAdress.street') ;
  }
  get billingAdressCity()
  {
    return this.checkoutFormGroup.get('billingAdress.city') ;
  }
  get billingAdressState()
  {
    return this.checkoutFormGroup.get('billingAdress.state') ;
  }
  get billingAdressCountry()
  {
    return this.checkoutFormGroup.get('billingAdress.country') ;
  }
  get billingAdressZipCode()
  {
    return this.checkoutFormGroup.get('billingAdress.zipCode') ;
  }
  //credit card
  get creditCardType()
  {
    return this.checkoutFormGroup.get('creditCard.cardType') ;
  }
  get creditCardNameOnCard()
  {
    return this.checkoutFormGroup.get('creditCard.nameOnCard') ;
  }
  get creditCardNumber()
  {
    return this.checkoutFormGroup.get('creditCard.cardNumber') ;
  }
  get creditSecurityCode()
  {
    return this.checkoutFormGroup.get('creditCard.securityCode') ;
  }
  

  getStates(formGroupName :string)
  {
    const formGroup = this.checkoutFormGroup.get(formGroupName) ;
    const countryCode = formGroup?.value.country.code ;
    this.CheckoutFormService.getStates(countryCode).subscribe
    
      (  data =>
      {
        if(formGroupName==='shippingAdress')
        {
          this.shippingAdressStates = data ;
        }
        else
        {
          this.billingAdressStates = data ;
        }
        formGroup!.get('state')!.setValue(data[0]) ;
      }
    )
  } ;

  copyShippingToBilling(event : any)
  {
    if(event.target?.checked)
    {
      this.checkoutFormGroup.controls['billingAdress']
      .setValue(this.checkoutFormGroup.controls['shippingAdress'].value) ;
      this.billingAdressStates= this.shippingAdressStates;
    }
    else
    {
      this.checkoutFormGroup.controls['billingAdress'].reset() ;
      this.billingAdressStates= [] ;
    }
  }

  onSubmit()
  {
    //console.log(this.checkoutFormGroup.get('customer')?.value) ;
    //console.log(this.checkoutFormGroup.get('shippingAdress')?.value) ;
    //console.log(this.checkoutFormGroup.get('billingAdress')?.value) ;
    //console.log(this.checkoutFormGroup.get('creditCard')?.value) ;
    if (this.checkoutFormGroup.invalid)
    {
      this.checkoutFormGroup.markAllAsTouched() ;
      return ;
    }

    let order = new Order() ;
    order.totalPrice = this.totalPrice ;
    order.totalQuantity = this.totalQuantity ;
    const cartItems = this.cartService.cartItems ;
    let orderItems : OrderItem[] = cartItems.map(tempCartItem =>new OrderItem(tempCartItem)) ;
    let purchase = new Purchase() ;
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.shippingAdress = this.checkoutFormGroup.controls['shippingAdress'].value ;
    const shippingState : State = JSON.parse(JSON.stringify(purchase.shippingAdress?.state))
    const shippingCountry : Country = JSON.parse(JSON.stringify(purchase.shippingAdress?.country))
    purchase.shippingAdress!.state = shippingState.name ;
    purchase.shippingAdress!.country = shippingCountry.name ;

    purchase.billingAdress = this.checkoutFormGroup.controls['billingAdress'].value ;
    const billingState : State = JSON.parse(JSON.stringify(purchase.billingAdress?.state))
    const billingCountry : Country = JSON.parse(JSON.stringify(purchase.billingAdress?.country))
    purchase.shippingAdress!.state = billingState.name ;
    purchase.shippingAdress!.country = billingCountry.name ;

    purchase.order =order ;
    purchase.orderItems = orderItems ;

    this.checkoutService.placeOrder(purchase).subscribe
    (
      {
        next : response =>
        {
           alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`) ;
           this.resetCart() ;
        } ,
        error : err =>
        {
          alert(`There was an error: ${err.message}`)
        }

      }
    )








  }
  resetCart() 
  {
    this.cartService.cartItems= [] ;
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset() ;
    this.router.navigateByUrl("/products")

  }

  handleMonthsAndYears()
  {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear : number = new Date().getFullYear() ;
    const selectedYear : number = Number(creditCardFormGroup?.value.expirationYear) ;

    let startMonth :number ;
    if(currentYear===selectedYear)
    {
      startMonth = new Date().getMonth()+1 ;
    }
    else
    {
      startMonth = 1 ;
    }

    this.CheckoutFormService.getCreditCardMonths(startMonth).subscribe
    (
      data=>
      {
        this.creditCardMonths =data ;
      }
    )

  } ;

  updateCartStatus()
  {
    this.cartService.totalPrice.subscribe
    (data => this.totalPrice = data) ;
    this.cartService.totalQuantity.subscribe
    (data => this.totalQuantity = data) ;
  }
}
