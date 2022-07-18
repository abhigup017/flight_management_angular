import { BookingPassenger } from "./bookingPassenger";

export class BookingHistory 
{
    airlineLogo:string="";
    airlineName:string="";
    flightNumber:string="";
    totalCost:any;
    travellingDate:any;
    BookingId:number=0;
    pnrNumber:string="";
    isCancelled:boolean=false;
    isCancellationAllowed:boolean=false;
    customerName:string="";
    customerEmailid:string="";
    noOfSeats:number=0;
    mealPlanId:number=0;
    mealPlanType:string="";
    bookedOn:any;
    sourceLocation:string="";
    destinationLocation:string="";
    bookingPassengers:Array<BookingPassenger> = new Array<BookingPassenger>();
}