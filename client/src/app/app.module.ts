import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { KursComponent } from './kurs/kurs.component';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { ProfesorLoginComponent } from './profesor-login/profesor-login.component';
import { HomeProfesorComponent } from './home-profesor/home-profesor.component';
import { ObavestenjeEditComponent } from './obavestenje-edit/obavestenje-edit.component';
import { VestComponent } from './vest/vest.component';
import { ProfesorPrijavaComponent } from './profesor-prijava/profesor-prijava.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    KursComponent,
    ObavestenjeComponent,
    ProfesorLoginComponent,
    HomeProfesorComponent,
    ObavestenjeEditComponent,
    VestComponent,
    ProfesorPrijavaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
