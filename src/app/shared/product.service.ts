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

  private _url: string = 'http://9.193.21.90:8000'
  private authentication_url: string = 'http://9.193.21.90:8000';
  getNodeData(): Observable<Product[]> {
    return this.http.get<Product[]>(this._url)
      .catch(this.errorHandler);
  }

  getSingleProduct() {
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this._url,{headers: new HttpHeaders({'Authorization':'Bearer'+localStorage.getItem('userToken')})});

  }

  userAuthentication(username, passowrd) {
    var data = "username=" + username + "&password=" + passowrd + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });
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
