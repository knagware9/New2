import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Product } from './product.model';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {
  productList: AngularFireList<any>;
  productList2: AngularFireList<any>;
  productList3: AngularFireList<any>;
  selectedProduct: Product = new Product();
  constructor(private firebase: AngularFireDatabase, private http: HttpClient) {

  }

  getData() {
    this.productList = this.firebase.list('products');
    return this.productList;
  }

  private _url: string = 'http://9.193.21.90:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XYZ%22%5D'
  private authentication_url: string = 'http://9.193.21.90:4000/users';
  getNodeData(): Observable<Product[]> {
    return this.http.get<Product[]>(this._url)
      .catch(this.errorHandler);
  }

  getSingleProduct() {
    console.log(localStorage.getItem('accessToken'));
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this._url,{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

  }

  private add_url:string= 'http://9.193.21.90:4000/channels/mgrchannel/chaincodes/mycc'
  addProduct(productData){
   var dataarray;
   //dataarray= ["1","2","3","4","5","6","7","8","9","10","11","12"];
  //  dataarray[0]=productData.batchNumber;
  //  dataarray[1]=productData.barcode;
  //  dataarray[2]=productData.manufacturingDate;
  //  dataarray[3]=productData.expiryDate;
  //  dataarray[4]=productData.productName;
  //  dataarray[5]=productData.manufacturerName;
  //  dataarray[6]=productData.ownership;
  //  dataarray[7]=productData.quantity;
  //  dataarray[8]=productData.weight;
  //  dataarray[9]=productData.temperature;
  //  dataarray[10]=productData.price;
  //  dataarray[11]=productData.comment;

   console.log("This is dataarray"+dataarray);

    var data = "fcn=" + "addProduct" + "&args=" + dataarray;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer '+localStorage.getItem('accessToken') });
    return this.http.post(this.add_url, data, { headers: reqHeader });
  }

  
  userAuthentication(username, password) {
    var data = "username=" + username + "&orgName=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    console.log("username: " + username + "  " +"password: " + password)
    return this.http.post(this.authentication_url, data, { headers: reqHeader });
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getDistributerData() {
    this.productList2 = this.firebase.list('Distributer');
    return this.productList2;
  }
  getRetailerData() {
    this.productList3 = this.firebase.list('Retailer');
    return this.productList3;
  }

  insertProduct(product: Product) {
    this.productList.push({
      batchNumber: product.batchNumber,
      barcode: product.barcode,
      manufacturingDate: product.manufacturingDate,
      expiryDate: product.expiryDate,
      productName: product.productName,
      manufacturerName: product.manufacturerName,
      quantity: product.quantity,
      weight: product.weight,
      temperature: product.temperature,
      price: product.price,
      ownership: product.ownership,
      comment: product.comment

    });
  }

  updateProduct(product: Product) {
    this.firebase.list('products').update(product.$key,
      {
        batchNumber: product.batchNumber,
        barcode: product.barcode,
        manufacturingDate: product.manufacturingDate,
        expiryDate: product.expiryDate,
        manufacturerName: product.manufacturerName,
        productName: product.productName,
        quantity: product.quantity,
        weight: product.weight,
        temperature: product.temperature,
        price: product.price,
        ownership: product.ownership,
        comment: product.comment
      });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }

  deleteDistributerProduct($key: string) {
    this.productList2.remove($key);
  }

  transferProduct(product: Product, type: string) {
    if (type == "distributer") {
      this.productList2 = this.firebase.list('Distributer');
      this.productList2.push({
        batchNumber: product.batchNumber,
        barcode: product.barcode,
        manufacturingDate: product.manufacturingDate,
        expiryDate: product.expiryDate,
        productName: product.productName,
        manufacturerName: product.manufacturerName,
        quantity: product.quantity,
        weight: product.weight,
        temperature: product.temperature,
        price: product.price,
        ownership: product.ownership,
        comment: product.comment

      });
    } else if (type == "retailer") {
      this.productList3 = this.firebase.list('Retailer');
      this.productList3.push({
        batchNumber: product.batchNumber,
        barcode: product.barcode,
        manufacturingDate: product.manufacturingDate,
        expiryDate: product.expiryDate,
        productName: product.productName,
        manufacturerName: product.manufacturerName,
        quantity: product.quantity,
        weight: product.weight,
        temperature: product.temperature,
        price: product.price,
        ownership: product.ownership,
        comment: product.comment
      });
    }
  }
}
