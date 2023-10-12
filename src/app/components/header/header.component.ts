import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public cartItems: number = 0;
  public showProduct: Product[] = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.products().subscribe((res) => {
      this.cartItems = res.length;
      this.showProduct = res;
    });
  }
}
