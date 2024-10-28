import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidDirective } from '../directives/valid.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BlankComponent } from '../components/blank/blank.component';
import { TableComponent } from '../components/table/table.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidDirective,
    BlankComponent,
    TableComponent
  ],

  //we need to use export to access.
  exports:[
    CommonModule,
    FormsModule,
    RouterModule,
    ValidDirective,
    BlankComponent,
    TableComponent
  ]

})
export class SharedModule { }
