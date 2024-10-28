import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() {}

    callSwal(text: string, title: string, btnName: string, callBack:() => void){
      Swal.fire({
        text: text,
        title: title,
        showConfirmButton: true,
        confirmButtonText: btnName,
        showCancelButton:true,
        cancelButtonText:"Cancel",
        icon:"question"
      }).then(response => {
        if(response.isConfirmed){
          callBack();
        }
      })
    }
   
}
