import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DiscountRoutes } from '../routes/discountRoutes';
import { DiscountManageComponent } from './discount-manage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';



@NgModule({
  declarations: [
    DiscountComponent,
    DiscountManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DiscountRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
})
export class DiscountModule { }
