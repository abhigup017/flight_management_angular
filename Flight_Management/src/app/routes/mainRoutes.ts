import { DashboardComponent } from "../dashboard/dashboard.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { AuthguardService } from "../services/authguard.service";

export const mainRoutes = [
    {path:'', component:HomeComponent},
    {path:'Home', component:HomeComponent},
    {path:'Airlines', canActivate:[AuthguardService], loadChildren:()=>import('../airlines/airlines.module').then(m=>m.AirlinesModule)},
    {path:'Login', component:LoginComponent},
    {path:'Dashboard', component:DashboardComponent},
    {path:'Schedule', canActivate:[AuthguardService], loadChildren:()=>import('../schedule/schedule.module').then(sm=>sm.ScheduleModule)},
    {path:'Discount', canActivate:[AuthguardService], loadChildren:()=>import('../discount/discount.module').then(dm=>dm.DiscountModule)},
    {path:'Booking', loadChildren:()=>import('../booking/booking.module').then(bm=>bm.BookingModule)},
    {path:'Register', component:RegisterComponent},
    {path:'Bookings', loadChildren:()=>import('../manageBookings/managebookings.module').then(mb=>mb.ManagebookingsModule)},
    {path:'Ticket', loadChildren:()=>import('../ticketDetails/ticketdetails.module').then(tm=>tm.TicketdetailsModule)}
]