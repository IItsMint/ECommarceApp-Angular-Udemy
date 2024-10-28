import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from './models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../common/services/swal.service';
import { CategoryPipe } from './pipes/category.pipe';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, CategoryPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
//we need to call getall in lifecycle hence, we changed to implements oninit.
export class CategoriesComponent implements OnInit {

categories: CategoryModel[] = [];
updateCategory: CategoryModel = new CategoryModel();
search: string="";

constructor(private _toastr: ToastrService, private _category: CategoryService, private _swal:SwalService){

}
  ngOnInit(): void {
    this.getAll();
  }

getAll(){
this._category.getAll(response => this.categories = response);
}
//for add and update we need structure, so lets use modal from booststrap.
//we paste the code on html file.

get(model:CategoryModel){
  this.updateCategory = {...model};
}

add(form:NgForm){
  if(form.valid){
    this._category.add(form.controls["name"].value, response =>{
      this._toastr.success(response.message);
      let element = document.getElementById("addModalCloseBtn");
      element?.click();//we are closing the form here.
      form.reset();//we are resetting the form here.
      this.getAll();//to refresh the list.
    });
  }
}

update(form:NgForm){
  if(form.valid){
    this._category.update(this.updateCategory, response => {
      this._toastr.warning(response.message);
      this.getAll();
      let element = document.getElementById("updateModalCloseBtn");
      element?.click();
    })
  }
}

  deleteById(model: CategoryModel){
    this._swal.callSwal(`Are you sure you want to remove this? ${model.name} `, "","Delete",()=>{
      this._category.deleteById(model._id, response => {
        this._toastr.info(response.message);
        this.getAll();
      })
    });
  }
}
