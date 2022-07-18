import { BookingPassengers } from "./bookingPassengers";

export class TicketHistoryModel {
    airlineLogo:string="";
    bookingId:number=0;
    flightId:number=0;
    customerName:string="";
    customerEmailId:string="";
    noOfSeats:number=0;
    mealPlanId:number=0;
    mealPlanType:string="";
    pnrnumber:string="";
    travelDate:any;
    bookedOn:any;
    totalCost:any;
    isCancelled:boolean=false;
    sourceLocation:string="";
    destinationLocation:string="";
    bookingPassenger:Array<BookingPassengers> = new Array<BookingPassengers>();
}