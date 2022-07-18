import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { scheduleRoutes } from '../routes/scheduleRoutes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScheduleManageComponent } from './schedule-manage.component';
import { TokenInterceptorService } from '../services/token-interceptor.service';



@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(scheduleRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}]
})
export class ScheduleModule { }
