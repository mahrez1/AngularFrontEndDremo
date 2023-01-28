import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice : number =0 ;
  totalQuantity : number = 0 ;

  checkoutFormGroup! : FormGroup ;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup  =this.formBuilder.group
    (
      {
        customer : this.formBuilder.group
        (
          {
            firstName : [''] ,
            lastName : [''] ,
            email : ['']
          }
        ) ,
        shippingAdress : this.formBuilder.group
        (
          {
            street : [''] ,
            city : [''] ,
            state : [''] ,
            country : [''] ,
            zipCode : [''] 

          }
        ) ,
        billingAdress : this.formBuilder.group
        (
          {
            street : [''] ,
            city : [''] ,
            state : [''] ,
            country : [''] ,
            zipCode : [''] 

          }
        ) ,
        creditCard : this.formBuilder.group
        (
          {
            cardType : [''] ,
            nameOnCard : [''] ,
            cardNumber : [''] ,
            securityCode : [''] ,
            expirationMonth : [''] ,
            expirationYear : [''] 
          }
        )

      }
    ) ;
  }

  copyShippingToBilling(event : any)
  {
    if(event.target?.checked)
    {
      this.checkoutFormGroup.controls['billingAdress']
      .setValue(this.checkoutFormGroup.controls['shippingAdress'].value) ;
    }
    else
    {
      this.checkoutFormGroup.controls['billingAdress'].reset() ;
    }
  }

  onSubmit()
  {
    console.log(this.checkoutFormGroup.get('customer')?.value) ;
    console.log(this.checkoutFormGroup.get('shippingAdress')?.value) ;
    console.log(this.checkoutFormGroup.get('billingAdress')?.value) ;
    console.log(this.checkoutFormGroup.get('creditCard')?.value) ;

  }

}
