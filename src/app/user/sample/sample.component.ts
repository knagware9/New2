import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  constructor(private productService: ProductService) { }
  product: any;

  ngOnInit() {
    this.productService.getSingleProduct().subscribe((data: any) => {
      this.product = data;
      console.log(JSON.stringify(data)); 
  })

  }
}
