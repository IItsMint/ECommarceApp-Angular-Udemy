import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { CartService } from '../../carts/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public _cart:CartService){
    this._cart.getCount();
  }

}
