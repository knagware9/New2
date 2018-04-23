import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError = true;
  constructor(private router: Router, private productSrevice: ProductService) { }

  ngOnInit() {
  }

  public errorMessage;

  public product=[];
  OnSubmit(userName, password) {
    // this.productSrevice.getNodeData()
    // .subscribe(data => this.product = data,
    //           error => this.errorMessage=error);
    //           console.log("This is error: "+ this.errorMessage)



      this.productSrevice.userAuthentication(userName,password).subscribe((data : any ) => {
          localStorage.setItem('accessToken', data.token)
        //  this.router.navigate(['/sample'])
          console.log("This is Token: "+ data.token)
      },
      (err: HttpErrorResponse)=> {
        this.isLoginError = true;

      });





    if (password == "org1") {
  //   debugger;
      this.router.navigate(['/home']);
     // this.router.navigate(['/manufacturer'])
    } else if (password == "org2") {
      this.router.navigate(['/distributer'])
    } else if (password == "org3") {
      this.router.navigate(['/retailer'])
    } else {
      this.router.navigate(['/home']);
    }

  }
}
