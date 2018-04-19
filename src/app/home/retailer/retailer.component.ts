import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../shared/product.service';
import { Product } from './../../shared/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  productList: Product[];
  constructor(private productService: ProductService, private tostr: ToastrService) { }

  
  ngOnInit() {
   // debugger;
    var x = this.productService.getRetailerData();
    x.snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
    
        this.productList.push(y as Product);
      });
    });
  }
  
  onEdit(pro: Product) {
    this.productService.selectedProduct = Object.assign({}, pro);
  }
 
  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.productService.deleteProduct(key);
      this.tostr.warning("Deleted Successfully", "Employee register");
    }
  }

}
