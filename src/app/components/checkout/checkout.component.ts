import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckoutFormService } from 'src/app/services/checkout-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice : number =0 ;
  totalQuantity : number = 0 ;
  creditCardYears :number[] = [] ;
  creditCardMonths :number[] = [] ;


  checkoutFormGroup! : FormGroup ;

  constructor(private formBuilder : FormBuilder , private CheckoutFormService : CheckoutFormService) { }

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

  }

}
