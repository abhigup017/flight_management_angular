import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { bookingRoutes } from '../routes/bookingRoutes';
import { TokenInterceptorService } from '../services/token-interceptor.service';



@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(bookingRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}]
})
export class BookingModule { }
