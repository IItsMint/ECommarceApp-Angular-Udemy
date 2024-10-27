import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';
import { LoginModel } from './models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(
  private _auth: AuthService,private _toastr: ToastrService,private _router: Router
){}

login(form:NgForm){
  if(form.valid){
    let model = new LoginModel();
    model.email = form.controls["email"].value;
    model.password = form.controls["password"].value;

    this._auth.login(model, response => {
      this._toastr.success("Successfully logged on...");
      localStorage.setItem("token",response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      this._router.navigateByUrl("/");
    })
  }
}
}
