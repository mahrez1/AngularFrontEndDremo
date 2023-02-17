import { Component, Inject, OnInit } from '@angular/core';
import MyAppConfig from '../../config/my-app-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaSignin  from '@okta/okta-signin-widget';
import myAppConfig from '../../config/my-app-config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  oktaSignin : any ;

  constructor(@Inject(OKTA_AUTH) private oktaAuth : OktaAuth) 
  { 
    this.oktaSignin = new OktaSignin
    ({
      logo: 'assets/images/logo.png' ,
      baseUrl : MyAppConfig.oidc.issuer.split('/aouth2')[0] ,
      clientId : myAppConfig.oidc.clientId ,
      redirectUri : myAppConfig.oidc.redirectUri ,
      authParams :
      {
        pkce : true ,
        issuer : myAppConfig.oidc.issuer ,
        scopes : myAppConfig.oidc.scopes
      }
    }) ;
  }

  ngOnInit(): void 
  {
    this.oktaSignin.remove() ;
    this.oktaSignin.renderEl
    (
      {
        el : '#okta-sign-in-widget'
      } ,
      (Response : any) =>
      {
        if(Response.status === 'Success')
        {
          this.oktaAuth.signInWithRedirect() ;
        }
      } ,
      (error :any) =>
      {
        throw error ;
      }
    ) ;
  }

}
