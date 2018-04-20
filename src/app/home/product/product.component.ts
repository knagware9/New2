import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

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
    // debugger;
    if (productForm.value.$key == null) {
      this.productService.insertProduct(productForm.value);
      this.tostr.success('Submitted Succcessfully', 'Product Add');
    } else {
      this.productService.updateProduct(productForm.value);
      this.tostr.success('Updated Succcessfully', 'Product Update');
    }
    this.resetForm(productForm);

  }

  resetForm(productForm?: NgForm) {
    if (productForm != null)
    productForm.reset();
    this.productService.selectedProduct = {
      $key: null,
      ownership:'',
      productName: '',
      manufacturerName:'',
      barcode: '',
      batchNumber: '',
      manufacturingDate: '',
      expiryDate: '',
      quantity: '',
      weight: '',
      temperature: '',
      price: '',
      comment:''
    }
  }

}
