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
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {

  carts: CartModel[] = [];
  sum: number = 0;

  constructor(private _cart: CartService, private _toastr: ToastrService, private _swal: SwalService){

  }
  ngOnInit(): void {
    this.getAll(); //we are callign the list here.
  }

  getAll(){
    this._cart.getAll(res => {
      this.carts = res; // Assign the response to `carts`
      this.calculate();
  });
  
  }

  calculate(){
    this.sum = 0;
    this.carts.forEach(element => {
      this.sum += (element.price * (element.quantity || 0));

    });
  }

  DeleteById(_id: string){
    this._swal.callSwal("Are you sure you want to delete this item?","Delete?","delete",() => {
      let model = {_id: _id};
      this._cart.removeById(model, res => {
      this._toastr.info(res.message);
      this.getAll();
    });
    });

  }


}
