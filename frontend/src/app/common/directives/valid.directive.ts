import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValid]',
  standalone: true
})
export class ValidDirective {

  @Input() appValid: boolean = false;
  //we need to reach element,
  constructor( private _el: ElementRef<any>) { }

  //we used keyup to watch every signle key, while typing.
  @HostListener("keyup") keyup(){
    if(this.appValid){
      this._el.nativeElement.className = "form-control is-valid";
    }

    else{
      this._el.nativeElement.className = "form-control is-invalid";
    }
  }

}
