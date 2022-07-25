import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../_services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  register() {
    this.registerService.register(this.model).subscribe(response => {
      console.log(response)
    })
  }

}
