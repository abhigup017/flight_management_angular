import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirlinesComponent } from './airlines.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { airlineRoutes } from '../routes/airlinesRoutes';
import { AirlinesListComponent } from './airlinesList.component';
import { TokenInterceptorService } from '../services/token-interceptor.service';



@NgModule({
  declarations: [
    AirlinesComponent,
    AirlinesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(airlineRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}]
})
export class AirlinesModule { }
