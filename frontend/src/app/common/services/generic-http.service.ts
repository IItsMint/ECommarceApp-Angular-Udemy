import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  //with this service, we are going to make every api request connected to here.
  api: string="http://localhost:5001/api";
  constructor(private _http: HttpClient, private _toastr: ToastrService,private _spinner: NgxSpinnerService) { }
  
  //first we need the rest of the api url,
  //to make it more generic, instead of any, we used T element.
  //auth/register
  post<T>(api: string, model:T, callBack: (response:T)=> void){
    this._spinner.show();
    this._http.post <T>(`${this.api}/${api}`,model,{}).subscribe({
      next:(response:T) => {callBack(response);this._spinner.hide();},
      error:(error:HttpErrorResponse) => {
        console.log(error);
        this._toastr.error(error.error.message);
        this._spinner.hide();
      }
    });
  }

  get<T>(api: string, callBack: (response:T) => void){
    this._spinner.show();
    this._http.get<T>(`${this.api}/${api}`).subscribe({
      next:(response:T) => {callBack(response);this._spinner.hide();},
      error:(error:HttpErrorResponse) => {
        console.log(error);
        this._toastr.error(error.error.message);
        this._spinner.hide();
      }
    });
  }
}
