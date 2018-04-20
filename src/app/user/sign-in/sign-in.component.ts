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
    this.productSrevice.getNodeData()
    .subscribe(data => this.product = data,
              error => this.errorMessage=error);
              console.log("This is error: "+ this.errorMessage)
    if (userName == 1) {

      debugger;
      this.router.navigate(['/home']);
     // this.router.navigate(['/manufacturer'])
    } else if (userName == 2) {
      this.router.navigate(['/distributer'])
    } else if (userName == 3) {
      this.router.navigate(['/retailer'])
    } else {
      this.router.navigate(['/home']);
    }

    // debugger;

  }
}
