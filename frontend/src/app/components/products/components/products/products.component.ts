import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginationResultModel } from '../../../../common/models/pagination-result.model';
import { ProductModel } from '../../models/product.model';
import { RequestModel } from '../../../../common/models/request.model';
import { ProductService } from '../../services/product.service';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { SwalService } from '../../../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
//we turned implements oninit to, with the lifecycle, as soon as the page opens it is gonna call getall.
export class ProductsComponent implements OnInit {

  result: PaginationResultModel<ProductModel[]> = new PaginationResultModel<ProductModel[]>();
  request: RequestModel = new RequestModel();
  pageNumbers: number[] = [];
  product: ProductModel = new ProductModel();

  constructor(private _product: ProductService, private _swal: SwalService, private _toastr: ToastrService) {

  };

  //In here we are definign as soon as the page opens it call getall method.
  ngOnInit(): void {
    this.getAll();
  };

  getAll(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this._product.getAll(this.request, res => {
      this.result = res;
      this.setPageNumbers();
    });
  };
  //Imagine having 100 pages, at the bar we shouldnt show every single page, we should only show current page, previous and the next one.
  setPageNumbers() {
    const startPage = Math.max(1, this.result.pageNumber - 2);
    const endPage = Math.min(this.result.totalPageCount, this.result.pageNumber + 2);
    this.pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    };
  };

  search() {
    if (this.request.search.length >= 3) {
      this.getAll(1);
    };
  };

};