import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RegisterComponent } from 'app/register/register.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<unknown> {
  unsaved: boolean = true

  constructor() { }

  canDeactivate(component: RegisterComponent): Observable<boolean> | boolean {
    if (this.unsaved) {
      return confirm("Imate nesacuvane podatke. Zelite li da napustite stranicu?")
    }
    return true
  }

}
