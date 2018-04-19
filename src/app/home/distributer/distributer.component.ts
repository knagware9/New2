import { Product } from './../../shared/product.model';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatOptgroup,MatOption, MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';

@Component({
  selector: 'app-distributer',
  templateUrl: './distributer.component.html',
  styleUrls: ['./distributer.component.css']
})
export class DistributerComponent implements OnInit {

  productList: Product[];
  animal: string;
  name: string;
  options = ["Retailer_1", "Retailer_2", "Retailer_3"];
  optionSelected: any;
  constructor(private productService: ProductService, private tostr: ToastrService, public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      position: { top: '50px', right: '150px' },
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }



  ngOnInit() {
    // debugger;
    var x = this.productService.getDistributerData();
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
      this.productService.transferProduct(pro,"retailer");
      this.productService.deleteDistributerProduct(key);
      
      this.tostr.warning("Transfered Successfully", "Product Transfer");
    }
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html'
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    
    this.dialogRef.close();
  }
}
