import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { CategoryModel } from '../models/category.model';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: GenericHttpService) { }

  getAll(callBack: (response: CategoryModel[]) => void){
    //since it does not ask for parameter, we can just wrote return value here.
    this._http.get<CategoryModel[]>("categories", response=> callBack(response));
  }

  add(name: string, callBack:(response:MessageResponseModel) => void){
    let model = {name: name};
    this._http.post<MessageResponseModel>("categories/add",model,response => callBack(response));
  }

  update(model: CategoryModel, callBack:(response:MessageResponseModel) => void){
    this._http.post<MessageResponseModel>("categories/update",model,response => callBack(response));
  }

  deleteById(_id:string, callBack:(response:MessageResponseModel) => void){
    let model = {_id: _id};
    this._http.post<MessageResponseModel>("categories/deleteById",model,response => callBack(response));
  }
}
