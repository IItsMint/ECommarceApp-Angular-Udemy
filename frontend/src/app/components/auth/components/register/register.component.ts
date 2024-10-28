import { Component } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { RegisterModel } from '../../models/register.model';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model:RegisterModel = new RegisterModel;
  //we need auth service.
  constructor(private _auth: AuthService, private _toastr: ToastrService, private _router:Router){}

  register(form:NgForm){
    if(form.valid){
      this._auth.register(this.model, response => {
        //We are storing token and user in local storage.
        localStorage.setItem("token",response.token);
        localStorage.setItem("user",JSON.stringify(response.user));
        this._toastr.success("New User Successfuly Created, Welcome!")

        this._router.navigateByUrl("/");
      });
    }
  }
}
