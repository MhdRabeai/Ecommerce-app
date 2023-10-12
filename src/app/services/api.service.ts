import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public cartItemList: any = [];
  public amount: number = 0;
  public productsList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get<Product[]>('https://dummyjson.com/products');
  }
  getProductById(id: any) {
    return this.http.get<Product[]>('https://dummyjson.com/products/' + id);
  }
  addToCart(data: Product) {
    this.cartItemList.map((ele: Product, index: Product) => {
      if (data.id === ele.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.cartItemList.push(data);
    this.productsList.next(this.cartItemList);
  }
  products() {
    return this.productsList.asObservable();
  }
  removeCartItem(data: Product) {
    this.cartItemList.map((ele: Product, index: Product) => {
      if (data.id === ele.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productsList.next(this.cartItemList);
  }
  // Total Calc
  calcPrice() {
    let total = 0;
    this.cartItemList.map((ele: any) => {
      total += ele.price;
    });
    return total;
  }
  // remove all items
  removeAllItems() {
    this.cartItemList = [];
    this.productsList.next(this.cartItemList);
  }
  // Passing Data From one Component to another
  sendFinalAmount(data: number) {
    this.amount = data;
  }

  reciveFinalAmount() {
    return this.amount;
  }
}
