import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  showProduct: any = [];
  public totalAmount: number = 0;
  public taxAmount: any = 0;
  public allAmount: number = 0;
  public sendAmount: number = 0;
  public form: boolean = false;
  myForm!: FormGroup;
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.products().subscribe((res) => {
      this.showProduct = res;
      this.totalAmount = this.api.calcPrice();

      // calcilation of 15% taxation amount
      this.taxAmount = (this.totalAmount / 100) * 15;

      // AllAmount
      this.allAmount = this.taxAmount + this.totalAmount;

      // sending Final Amount To order page component
      this.sendAmount = this.allAmount;
      this.api.sendFinalAmount(this.allAmount);
    });
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }
  remove(data: any) {
    this.api.removeCartItem(data);
  }
  removeAllItems() {
    this.api.removeAllItems();
  }
  onSubmit() {
    localStorage.setItem('ecomDate', this.myForm.value.name);
    this.myForm.reset();
  }
}
