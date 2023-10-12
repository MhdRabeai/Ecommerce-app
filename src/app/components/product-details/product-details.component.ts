import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productDate!: Product | any;
  showAdd: boolean = true;
  showRemove: boolean = false;
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.params['id'];

    this.api.getProductById(productId).subscribe((res) => {
      this.productDate = res;
    });
  }
  addToCart(product: Product) {
    this.api.addToCart(product);
    this.showAdd = false;
    this.showRemove = true;
  }
  remove(product: Product) {
    this.api.removeCartItem(product);
    this.showAdd = true;
    this.showRemove = false;
  }
}
