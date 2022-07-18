import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DropdownService } from '../services/dropdown.service';
import { ScheduleService } from '../services/schedule.service';
import { DropdownModel } from '../sharedModels/dropdownModel';
import { ScheduleDetails } from './scheduleModels/scheduleDetailsModel';
import { ScheduleSearchModel } from './scheduleModels/scheduleSearchModel';

@Component({
  selector: 'app-schedule-manage',
  templateUrl: './schedule-manage.component.html',
  styleUrls: ['../../styles.css']
})
export class ScheduleManageComponent implements OnInit {

  constructor(private _router:Router, private _scheduleService:ScheduleService, private _dropdownService:DropdownService) { }

  ngOnInit(): void {
    this.ShowSpinner();
    forkJoin(this._dropdownService.GetInstrumentTypes(), this._dropdownService.GetLocationTypes(), this._dropdownService.GetAirlines())
    .subscribe(([instrumentResponse,locationResponse,airlinesResponse]) =>
    {
      
      this.BindInstrumentTypes(instrumentResponse);
      this.BindLocations(locationResponse);
      this.BindAirlines(airlinesResponse);
      this.HideSpinner();
    });
  }

showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
airlines:Array<DropdownModel> = new Array<DropdownModel>();
instrumentTypes:Array<DropdownModel> = new Array<DropdownModel>();
locations:Array<DropdownModel> = new Array<DropdownModel>();
airlineSelected:any;
sourceLocationSelected:any;
destinationLocationSelected:any;
instrumentTypeSelected:any;
none:any={
  id:0,
  value:"None"
};
scheduleSearchRequest:ScheduleSearchModel = new ScheduleSearchModel();
scheduleResults:Array<ScheduleDetails> = new Array<ScheduleDetails>();
showNoResultsFound:boolean=false;

  ToggleDisplay(routeName:string)
  {
    switch(routeName)
    {
      case 'AddSchedule' :
      {
        this._router.navigate(['Schedule/Add'])
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

BindInstrumentTypes(instrumentTypes:any)
{
this.instrumentTypes = instrumentTypes;
this.instrumentTypes.splice(0, 0, this.none);
this.instrumentTypeSelected = instrumentTypes[0];
}

BindLocations(locations:any)
{
  this.locations = locations;
  this.locations.splice(0, 0, this.none);
  this.sourceLocationSelected = locations[0];
  this.destinationLocationSelected = locations[0];
}

BindAirlines(airlines:any)
{
this.airlines = airlines;
this.airlines.splice(0, 0, this.none);
this.airlineSelected = airlines[0];
}

SearchSchedule()
{
  let searchRequest = {
    airlineId:this.airlineSelected.id,
    destinationLocationId: this.destinationLocationSelected.id,
    flightNumber: this.scheduleSearchRequest.flightNumber,
    instrumentUsed: this.instrumentTypeSelected.id,
    sourceLocationId: this.sourceLocationSelected.id,
    scheduleDate: this.scheduleSearchRequest.scheduleDate == "" ? null : this.scheduleSearchRequest.scheduleDate
  }
  this.ShowSpinner(); 
  this._scheduleService.SearchSchedule(searchRequest).subscribe(res=> {this.HideSpinner(), this.BindResultToModel(res)}, err=>{this.HideSpinner()});
}

BindResultToModel(result:any)
{
  this.scheduleResults = result;
  this.showNoResultsFound = this.scheduleResults.length == 0 ? true : false;

}

DisplayScheduleDetails(schedule:any)
{
  let textToDisplay = "Airline Name: " + schedule.airlineName + "\nFlight Number: " + schedule.flightNumber
  + "\nSource: " + schedule.sourceLocation + "\nDestination: " + schedule.destinationLocation
  + "\nInstrument Type: " + schedule.instrumentType 
  + "\nTotal Business class seats: " + schedule.businessSeatsNo + "\nTotal Regular seats: " + schedule.regularSeatsNo
  + "\nNo of rows: " + schedule.noOfRows + "\nDeparture time: " + (new Date(schedule.startDateTime)).toLocaleString()
  + "\nArrival time: " + (new Date(schedule.endDateTime)).toLocaleString()
  + "\nMeal plan type: " + schedule.mealPlanType + "\nTicket Cost:Rs " + schedule.ticketCost;
  this.DisplayModalPopup("Schedule Details", textToDisplay);
  debugger;
}
}
