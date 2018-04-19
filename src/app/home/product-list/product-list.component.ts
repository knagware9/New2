import { ProductService } from './../../shared/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../../shared/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  options = ["Distributer_1", "Distributer_2", "Distributer_3"];
  optionSelected: any;
  constructor(private productService: ProductService, private tostr: ToastrService) { }

  
  ngOnInit() {
   // debugger;
    var x = this.productService.getData();
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

  onTransfer(pro: Product,key: string) {
    if (confirm('Are you sure to transfer this record ?') == true) {
      this.productService.transferProduct(pro,"distributer");
      this.productService.deleteProduct(key);
      
      this.tostr.warning("Transfered Successfully", "Product Transfer");
    }
  }


}
