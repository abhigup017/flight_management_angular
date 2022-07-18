import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class AddScheduleModel 
{
    flightNumber:string="";
    airlineId:string="";
    flightDayScheduleId:number=0;
    instrumentId:number=0;
    businessSeatsNo:string="";
    regularSeatsNo:string="";
    ticketCost:any;
    noOfRows:string="";
    mealPlanId:number=0;
    sourceLocationId:number=0;
    destinationLocationId:number=0;
    startDateTime:any;
    endDateTime:any;
    durationInMinutes:string="";
    sunday:boolean=false;
    monday:boolean=false;
    tuesday:boolean=false;
    wednesday:boolean=false;
    thursday:boolean=false;
    friday:boolean=false;
    saturday:boolean=false;
    formScheduleAddGroup:FormGroup;

    constructor() {
        
        var numericValidators = [];
        numericValidators.push(Validators.required);
        numericValidators.push(Validators.pattern("^[0-9]+$"));

        var priceValidators = [];
        priceValidators.push(Validators.required);
        priceValidators.push(Validators.pattern("^[0-9]+(\.[0-9]*)?$"));

        var _builder = new FormBuilder();
        this.formScheduleAddGroup = _builder.group({});
        this.formScheduleAddGroup.addControl("flightNumberControl", new FormControl('', Validators.required));
        this.formScheduleAddGroup.addControl("businessSeatControl", new FormControl('', Validators.compose(numericValidators)));
        this.formScheduleAddGroup.addControl("regularSeatControl", new FormControl('', Validators.compose(numericValidators)));
        this.formScheduleAddGroup.addControl("ticketCostControl", new FormControl('', Validators.compose(priceValidators)));
        this.formScheduleAddGroup.addControl("rowControl", new FormControl('', Validators.compose(numericValidators)));
        this.formScheduleAddGroup.addControl("startDateControl", new FormControl('', Validators.required));
        this.formScheduleAddGroup.addControl("endDateControl", new FormControl('', Validators.required));
        this.formScheduleAddGroup.addControl("durationControl", new FormControl('', Validators.compose(numericValidators)));
    }
}