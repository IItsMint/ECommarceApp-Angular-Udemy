import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { loginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _hhtp: GenericHttpService) { 

  }
  //This is api request, it includes api adress, api body model, and response respectively.
  login(model:LoginModel, callBack:(response:loginResponseModel) => void){
    this._hhtp.post<loginResponseModel>("auth/login",model,response => callBack(response))
  }
}
