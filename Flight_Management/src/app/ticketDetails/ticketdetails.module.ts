import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketdetailsComponent } from './ticketdetails.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketRoutes } from '../routes/ticketRoutes';



@NgModule({
  declarations: [
    TicketdetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(TicketRoutes),
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
})
export class TicketdetailsModule { }
