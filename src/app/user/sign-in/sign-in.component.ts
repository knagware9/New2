import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError: boolean = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  OnSubmit(userName, password) {

    if (userName == 1) {
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
