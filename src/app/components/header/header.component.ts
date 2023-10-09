import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public cartItems: number = 0;
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.products().subscribe((res) => {
      this.cartItems = res.length;
    });
  }
}
