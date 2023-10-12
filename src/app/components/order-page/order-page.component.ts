import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent {
  public grandAmount!: number;
  public userData!: any;

  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.api.removeAllItems();
      this.router.navigate(['']);
    }, 5000);

    // Recieving Amount
    this.grandAmount = this.api.reciveFinalAmount();

    // Getting Item From Localstorage
    this.userData = localStorage.getItem('ecomDate');
  }
}
