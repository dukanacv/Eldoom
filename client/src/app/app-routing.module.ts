import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProfesorComponent } from './home-profesor/home-profesor.component';
import { HomeComponent } from './home/home.component';
import { KursComponent } from './kurs/kurs.component';
import { LoginComponent } from './login/login.component';
import { ObavestenjeEditComponent } from './obavestenje-edit/obavestenje-edit.component';
import { ProfesorLoginComponent } from './profesor-login/profesor-login.component';
import { ProfesorPrijavaComponent } from './profesor-prijava/profesor-prijava.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { KursGuard } from './_guards/kurs.guard';
import { ProfesorLoggedinGuard } from './_guards/profesor-loggedin.guard';
import { ProfesorLoginGuard } from './_guards/profesor-login.guard';
import { UnsavedChangesGuard } from './_guards/unsaved-changes.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent, canActivate: [ProfesorLoggedinGuard] },
  { path: "profesor-login", component: ProfesorLoginComponent, canActivate: [ProfesorLoggedinGuard] },
  { path: "register", component: RegisterComponent, canDeactivate: [UnsavedChangesGuard] },
  { path: "kurs/:id", component: KursComponent, canActivate: [KursGuard] },
  { path: "home-profesor", component: HomeProfesorComponent, canActivate: [ProfesorLoginGuard] },
  { path: "obavestenje-edit/:id", component: ObavestenjeEditComponent, canActivate: [ProfesorLoginGuard] },
  { path: "profesor-prijava", component: ProfesorPrijavaComponent, canActivate: [ProfesorLoginGuard] },
  { path: "**", component: HomeComponent }//wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
