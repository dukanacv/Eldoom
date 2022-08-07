import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../_services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  unsaved: boolean = true

  @HostListener("window:beforeunload", ['$event']) unloadNotification($event: any) {
    if (this.unsaved) {
      $event.returnValue = true
    }
  }

  constructor(private registerService: RegisterService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.registerService.register(this.model).subscribe(response => {
      console.log(response)
      this.toastr.success("Vasa registracija je uspesna")
    }, err => {
      this.toastr.error("Svi parametri moraju biti uneti. E-mail adresa validna i unikatan broj indeksa.")
    })
  }

}
