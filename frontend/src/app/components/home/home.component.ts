import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryService } from '../categories/services/category.service';
import { RequestModel } from '../../common/models/request.model';
import { ProductService } from '../products/services/product.service';
import { ProductModel } from '../products/models/product.model';
import { CartModel } from '../carts/models/cart.model';
import { CartService } from '../carts/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  categories: CategoryModel[] = [];


  request: RequestModel = new RequestModel();
  products: ProductModel[] = [];

  constructor(private _category:CategoryService, private _product: ProductService, private _cart: CartService, private _toastr: ToastrService){

  }
  ngOnInit(): void {
    this.getCategories();
    this.getAll();
  }

  getAll(){
    this._product.getAllForHomePage(this.request, res => this.products = res);
  }

  getCategories(){
    this._category.getAll(res => {this.categories = res})
  }

  changeCategory(categoryId:string, categoryName: string){
    this.request.categoryName = categoryName;
    this.request.categoryId = categoryId;
    this.getAll();
  }

  addCart(productId: string, price: number){
    let model = new CartModel();
    model.productId = productId;
    model.price = price;
    model.quantity = 1;
    this._cart.add(model, res => {
      this._toastr.success(res.message);
      this.getAll();
    });
  }

}
