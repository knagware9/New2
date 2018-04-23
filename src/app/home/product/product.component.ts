import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

// import { ProductService } from '../shared/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private tostr: ToastrService) { }


  ngOnInit() {
    this.resetForm();
  }

  onSubmit(productForm: NgForm) {
    console.log("submit button clicked")
    this.productService.addProduct(productForm.value).subscribe((data:any) =>{
      console.log("This is response data"+data);
      this.tostr.success('Added Succcessfully', 'Product Added');
    },
    (err: HttpErrorResponse)=> {
      console.log("Something went wrong: This is error")
  
    });


    // debugger;
    // if (productForm.value.$key == null) {
    //   this.productService.insertProduct(productForm.value);
    //   this.tostr.success('Submitted Succcessfully', 'Product Add');
    // } else {
    //   this.productService.updateProduct(productForm.value);
    //   this.tostr.success('Updated Succcessfully', 'Product Update');
    // }
    this.resetForm(productForm);

  }

  resetForm(productForm?: NgForm) {
    if (productForm != null)
      productForm.reset();
    this.productService.selectedProduct = {
      $key: null,
      ownership: '',
      productName: '',
      manufacturerName: '',
      barcode: '',
      batchNumber: '',
      manufacturingDate: '',
      expiryDate: '',
      quantity: '',
      weight: '',
      temperature: '',
      price: '',
      comment: ''
    }
  }

}
