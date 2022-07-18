import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { mainRoutes } from '../routes/mainRoutes';
import { MasterComponent } from './master.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { RegisterComponent } from '../register/register.component';



@NgModule({
  declarations: [
    MasterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(mainRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [MasterComponent]
})
export class MasterModule { }
