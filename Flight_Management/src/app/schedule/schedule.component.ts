import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AddAirlineModel } from '../airlines/airlineModels/AddAirlineModel';
import { DropdownService } from '../services/dropdown.service';
import { ScheduleService } from '../services/schedule.service';
import { DropdownModel } from '../sharedModels/dropdownModel';
import { AddScheduleModel } from './scheduleModels/AddScheduleModel';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['../../styles.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private _router:Router, private _scheduleService: ScheduleService, private _dropdownService:DropdownService) { }

  ngOnInit(): void {
    this.ShowSpinner();
    forkJoin(this._dropdownService.GetMealPlanTypes(), this._dropdownService.GetInstrumentTypes(), this._dropdownService.GetLocationTypes(), this._dropdownService.GetAirlines())
    .subscribe(([mealResponse,instrumentResponse,locationResponse,airlinesResponse]) =>
    {
      this.BindMealTypes(mealResponse);
      this.BindInstrumentTypes(instrumentResponse);
      this.BindLocations(locationResponse);
      this.BindAirlines(airlinesResponse);
      this.HideSpinner();
    });

    this.SetMinDate();
  }

AddSchedule:AddScheduleModel = new AddScheduleModel();
mealTypes:Array<DropdownModel> = new Array<DropdownModel>();
instrumentTypes:Array<DropdownModel> = new Array<DropdownModel>();
locations:Array<DropdownModel> = new Array<DropdownModel>();
airlines:Array<DropdownModel> = new Array<DropdownModel>();
showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
sourceLocationSelected:any;
destinationLocationSelected:any;
instrumentTypeSelected:any;
mealTypeSelected:any;
airlineSelected:any;
selectedRadioOption:string="Daily";
isSundayChecked:boolean=false;
isMondayChecked:boolean=false;
isTuesdayChecked:boolean=false;
isWednesdayChecked:boolean=false;
isThursdayChecked:boolean=false;
isFridayChecked:boolean=false;
isSaturdayChecked:boolean=false;
today:any;
  ToggleDisplay(routeName:string)
  {
    switch(routeName)
    {
      case 'ManageSchedule' :
      {
        this._router.navigate(['Schedule/Manage'])
        break;
      }
    }
  }

  DisplayModalPopup(modalHeader:string, modaltext:string)
{
  this.modalHeader = modalHeader;
  this.modalText=modaltext;
  document.getElementById("btnLaunchModal")?.click();
}

ShowSpinner()
{
  this.showSpinner = true;
}

HideSpinner()
{
  this.showSpinner = false;
}

// test()
// {
//   let test = this.startDate;
//   let testDate = new Date(test);
//   let drop = this.dropdownSelected;
//   console.log(testDate.toISOString());
// }

BindMealTypes(mealTypes:any)
{
  this.mealTypes = mealTypes;
  this.mealTypeSelected = mealTypes[0];
}

BindInstrumentTypes(instrumentTypes:any)
{
this.instrumentTypes = instrumentTypes;
this.instrumentTypeSelected = instrumentTypes[0];
}

BindLocations(locations:any)
{
  this.locations = locations;
  this.sourceLocationSelected = locations[0];
  this.destinationLocationSelected = locations[0];
}

BindAirlines(airlines:any)
{
this.airlines = airlines;
this.airlineSelected = airlines[0];
}

OnRadioOptionChange(radioOption:string)
{
  this.selectedRadioOption = radioOption;
  if(radioOption != 'Specific')
  {
    this.ResetCheckboxOptions();
  }
}

ResetCheckboxOptions()
{
  this.isSundayChecked = false;
  this.isMondayChecked = false;
  this.isTuesdayChecked = false;
  this.isWednesdayChecked = false;
  this.isThursdayChecked = false;
  this.isFridayChecked = false;
  this.isSaturdayChecked = false;
}

AddScheduleData()
{
  if(this.sourceLocationSelected.id == this.destinationLocationSelected.id)
  {
    this.DisplayModalPopup("Error", "Source and Destination cannot be the same");
    return;
  }
  
  this.ProcessDaysSelection();

  let scheduleRequestData = {
    flightNumber: this.AddSchedule.flightNumber,
    airlineId: this.airlineSelected.id,
    instrumentId: this.instrumentTypeSelected.id,
    businessSeatsNo: Number(this.AddSchedule.businessSeatsNo),
    regularSeatsNo: Number(this.AddSchedule.regularSeatsNo),
    ticketCost: Number(this.AddSchedule.ticketCost),
    noOfRows: Number(this.AddSchedule.noOfRows),
    mealPlanId: this.mealTypeSelected.id,
    sourceLocationId: this.sourceLocationSelected.id,
    destinationLocationId: this.destinationLocationSelected.id,
    startDateTime: this.AddSchedule.startDateTime,
    endDateTime: this.AddSchedule.endDateTime,
    durationInMinutes: Number(this.AddSchedule.durationInMinutes),
    sunday: this.AddSchedule.sunday,
    monday: this.AddSchedule.monday,
    tuesday: this.AddSchedule.tuesday,
    wednesday: this.AddSchedule.wednesday,
    thursday: this.AddSchedule.thursday,
    friday: this.AddSchedule.friday,
    saturday: this.AddSchedule.saturday
  }
 this.ShowSpinner();
  this._scheduleService.AddScheduleInventory(scheduleRequestData).subscribe(res=>{this.HideSpinner(), this.DisplayModalPopup("Success", "Airline schedule added successfully"), this.AddSchedule = new AddScheduleModel()},err=>{this.HideSpinner(), this.DisplayModalPopup("Error", "An error occurred while adding the Airline schedule inventory")})
}

ProcessDaysSelection()
{
  if(this.selectedRadioOption == 'Daily')
  {
    this.AddSchedule.sunday = true;
    this.AddSchedule.monday = true;
    this.AddSchedule.tuesday = true;
    this.AddSchedule.wednesday = true;
    this.AddSchedule.thursday = true;
    this.AddSchedule.friday = true;
    this.AddSchedule.saturday = true;
  }
  else if(this.selectedRadioOption == 'Weekdays')
  {
    this.AddSchedule.monday = true;
    this.AddSchedule.tuesday = true;
    this.AddSchedule.wednesday = true;
    this.AddSchedule.thursday = true;
    this.AddSchedule.friday = true;
  }
  else if(this.selectedRadioOption == 'Weekends')
  {
    this.AddSchedule.sunday = true;
    this.AddSchedule.saturday = true;
  }
  else if(this.selectedRadioOption == 'Specific')
  {
    this.AddSchedule.sunday = this.isSundayChecked;
    this.AddSchedule.monday = this.isMondayChecked;
    this.AddSchedule.tuesday = this.isTuesdayChecked;
    this.AddSchedule.wednesday = this.isWednesdayChecked;
    this.AddSchedule.thursday = this.isThursdayChecked;
    this.AddSchedule.friday = this.isFridayChecked;
    this.AddSchedule.saturday = this.isSaturdayChecked;
  }
}

HasError(typeofvalidator:string,controlname:string):Boolean{
  return this.AddSchedule.formScheduleAddGroup.controls[controlname].hasError(typeofvalidator);
}

SetMinDate()
{
  this.today = new Date().toISOString().split('T')[0];
  this.today = this.today + 'T00:00';
}
}
