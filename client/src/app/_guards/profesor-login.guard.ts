import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from 'app/_services/login.service';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorLoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private toastr: ToastrService) { }

  canActivate(): any {
    return this.loginService._currentProfesor$.pipe(
      map(profesor => {
        if (profesor) {
          return true
        }
        else {
          this.toastr.error("Ne mozete da pristupite ovoj stranici ako niste ulogovani.")
          return false
        }
      })
    )
  }

}
