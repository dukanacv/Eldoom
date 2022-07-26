import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any = {}

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }
}
