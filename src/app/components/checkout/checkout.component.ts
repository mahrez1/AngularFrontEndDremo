import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
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
  countries : Country[] = [] ;
  shippingAdressStates : State[] = [] ;
  billingAdressStates : State[] = [] ;



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

    this.CheckoutFormService.getCountries().subscribe
    (
      data =>
      {
        this.countries =data ;
      }
    )

   

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

  } ;

}
