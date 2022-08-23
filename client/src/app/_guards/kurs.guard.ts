import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from 'app/_services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KursGuard implements CanActivate {
  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router) { }

  canActivate(): any {
    if (localStorage.getItem("profesor") || localStorage.getItem("student")) {
      return true
    } else {
      this.toastr.error("Ne mozete da pristupite sadrzaju kurseva ako niste ulogovani.")
      this.router.navigate(["/"])
      return false
    }
  }

}
