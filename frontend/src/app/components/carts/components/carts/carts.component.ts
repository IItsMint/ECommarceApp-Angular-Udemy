import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { CartModel } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../common/services/swal.service';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'] // Corrected this to 'styleUrls'
})
export class CartsComponent implements OnInit {
  
  carts: CartModel[] = [];
  sum: number = 0;
  appliedCoupon: string | null = null; // Track applied coupon
  errorMessage: string | null = null; // Track error message

  // Change to allow indexing by string
  validCoupons: { [key: string]: number } = {
    "DISCOUNT10": 10, // Example valid coupon for 10% discount
    "SAVE20": 20 // Example valid coupon for 20% discount
  };

  constructor(private _cart: CartService, private _toastr: ToastrService, private _swal: SwalService) {}

  ngOnInit(): void {
    this.getAll(); // Fetch the cart items
  }

  getAll() {
    this._cart.getAll(res => {
      this.carts = res; // Assign the response to `carts`
      this.calculate();
    });
  }

  calculate() {
    this.sum = 0;
    this.carts.forEach(element => {
      this.sum += (element.price * (element.quantity || 0));
    });
  }

  DeleteById(_id: string) {
    this._swal.callSwal("Are you sure you want to delete this item?", "Delete?", "delete", () => {
      let model = { _id: _id };
      this._cart.removeById(model, res => {
        this._toastr.info(res.message);
        this.getAll();
      });
    });
  }

  applyCoupon() {
    const couponCode = (document.getElementById('couponCode') as HTMLInputElement).value.trim();

    // Check if a coupon is already applied
    if (this.appliedCoupon) {
      this.errorMessage = "You can only use one coupon at a time.";
      return;
    }

    // Validate the coupon code
    if (this.validCoupons[couponCode]) {
      this.appliedCoupon = couponCode; // Set the applied coupon
      const discount = this.validCoupons[couponCode];
      this.sum *= (1 - (discount / 100)); // Apply the discount
      this.errorMessage = null; // Clear error message
      document.getElementById('couponMessage')!.innerText = `Coupon applied: ${this.appliedCoupon} (${discount}%)`;
    } 
    else {
      this.errorMessage = "Invalid coupon code or coupon has already been used.";
      document.getElementById('couponMessage')!.innerText = this.errorMessage;
    }

    // Clear the input field
    (document.getElementById('couponCode') as HTMLInputElement).value = '';
  }
}
