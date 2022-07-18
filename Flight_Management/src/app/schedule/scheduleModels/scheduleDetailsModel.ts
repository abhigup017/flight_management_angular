export class ScheduleDetails {
    flightId: number = 0;
    flightNumber: string = "";
    airLineId: number = 0;
    airlineName: string = "";
    airlineLogo:string="";
    flightDayScheduleId: number = 0;
    instrumentId: number = 0;
    instrumentType: string = "";
    businessSeatsNo: number = 0;
    regularSeatsNo: number = 0;
    ticketCost: number = 0;
    noOfRows: number = 0;
    mealPlanId: number = 0;
    mealPlanType: string = "";
    sourceLocationId: number = 0;
    sourceLocation: string = "";
    destinationLocationId: number = 0;
    destinationLocation: string = "";
    startDateTime: any;
    endDateTime: any;
    durationInMinutes: number = 0;
}