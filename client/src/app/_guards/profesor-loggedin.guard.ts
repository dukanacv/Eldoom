import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from 'app/_services/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProfesorLoggedinGuard implements CanActivate {
  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router) { }

  canActivate(): any {
    if (localStorage.getItem("profesor") || localStorage.getItem("student")) {
      this.toastr.error("Ne mozete da pristupite dok ste ulogovani")
      this.router.navigate(["/"])
      return false
    } else {
      return true
    }
  }

}
