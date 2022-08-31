import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  count = 0

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.count++
    this.spinnerService.show()
  }

  idle() {
    this.count--
    if (this.count <= 0) {
      this.count = 0
      this.spinnerService.hide()
    }
  }
}
