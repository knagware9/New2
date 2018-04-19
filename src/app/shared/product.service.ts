import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Product } from './product.model';

@Injectable()
export class ProductService {
  productList: AngularFireList<any>;
  productList2: AngularFireList<any>;
  productList3: AngularFireList<any>;
  selectedProduct: Product = new Product();
  constructor(private firebase: AngularFireDatabase) {

  }

  getData() {
    this.productList = this.firebase.list('products');
    return this.productList;
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
    if(type == "distributer"){
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
    }else if (type=="retailer"){
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
