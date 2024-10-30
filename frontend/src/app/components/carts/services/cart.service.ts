import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { CartModel } from '../models/cart.model';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

count: number = 0;

  constructor(private _hhtp: GenericHttpService) { }

  getAll(callBack: (res: CartModel[]) => void){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString); //we are changing format her into json.
    let model = {userId: user._id};

    this._hhtp.post<CartModel[]>("carts", model, res => callBack(res));
  };

  getCount(){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString); //we are changing format her into json.
    let model = {userId: user._id};

    this._hhtp.post<any>("carts/getCount", model, res =>this.count = res.count);
  };

  add(model: CartModel, callBack: (res: MessageResponseModel) => void){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString); //we are changing format her into json.
    model.userId = user._id;
    this._hhtp.post<MessageResponseModel>("carts/add", model, res => {
      this.getCount();
      callBack(res);
    });
  };

  removeById(model: any, callBack: (res: MessageResponseModel) => void){
    this._hhtp.post<MessageResponseModel>("carts/removeById", model, res => {
      this.getCount();
      callBack(res);
    });
  };


}
