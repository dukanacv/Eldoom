import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KursService } from 'app/_services/kurs.service';
import { LoginService } from 'app/_services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KursGuard implements CanActivate {
  constructor(private toastr: ToastrService, private kursService: KursService, private router: Router) { }

  id_kurs!: string
  id_kurseva!: number[]

  canActivate(route: ActivatedRouteSnapshot): any {
    return new Observable<boolean | UrlTree>(observer => {
      if (localStorage.getItem("student")) {
        observer.next(true)
        return
      }
      if (localStorage.getItem("profesor")) {
        this.kursService.getKurseviIdByProfesorId(Number(localStorage.getItem("id")))
          .subscribe(response => {
            this.id_kurs = route.url[1].path
            this.id_kurseva = response
            for (let i = 0; i < this.id_kurseva.length; i++) {
              if (Number(this.id_kurs) == this.id_kurseva[i]) {
                observer.next(true)
                return
              }
              continue
            }
            observer.next(false)
            this.router.navigate(['home-profesor']);
            this.toastr.error("Ne mozete pristupiti kursu koji nije Vas.")
            return
          })
      }
    })
  }
}
