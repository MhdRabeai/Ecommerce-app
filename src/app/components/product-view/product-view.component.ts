import { Product } from './../../models/product';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent {
  products: any | Product[] = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.displayProducts();
    localStorage.removeItem('ecomDate');
  }
  displayProducts() {
    this.api.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
  addToCart(date: any) {
    this.api.addToCart(date);
  }
  remove(data: any) {
    this.api.removeCartItem(data);
  }
}
