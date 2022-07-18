import { Component, OnInit } from '@angular/core';
import { AddAirlineModel } from './airlineModels/AddAirlineModel';
import { HttpClient } from '@angular/common/http';
import { AirlineModel } from './airlineModels/airlineModel';
import { Router } from '@angular/router';
import { AirlineService } from '../services/airline.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlinesList.component.html',
  styleUrls: ['../../styles.css']
})
export class AirlinesListComponent implements OnInit {

  constructor(private _router:Router, private _airline:AirlineService) 
  { 

  }

  ngOnInit(): void {
    this.GetAllAirlines();
  }
showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
AddAirlineRequest:AddAirlineModel = new AddAirlineModel();
AirlinesList:Array<AirlineModel> = new Array<AirlineModel>();

ToggleDisplay(page:string)
{
  switch(page)
  {
    case 'AddAirline':
      {
        this._router.navigate(['Airlines/Add'])
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

GetAllAirlines()
{
  this.ShowSpinner();
  this._airline.GetAllAirlines().subscribe(res =>{ this.BindAirlineDataToModel(res), this.HideSpinner()}, res => {this.DisplayModalPopup("Error", "An Error occurred while fetching airlines"), this.HideSpinner()});
}

BindAirlineDataToModel(airlines:any)
{
  this.AirlinesList = airlines;
}

BlockAirline(airline:AirlineModel)
{
  this.ShowSpinner();
  this._airline.BlockAirline(String(airline.airlineId)).subscribe(res=> {this.DisplayModalPopup("Success", "Airline Blocked Successfully"), this.HideSpinner(), this.GetAllAirlines()}, res=> {this.DisplayModalPopup("Error", "An error occurred")});
}

UnBlockAirline(airline:AirlineModel)
{
  this.ShowSpinner();
  this._airline.UnBlockAirline(String(airline.airlineId)).subscribe(res=> {this.DisplayModalPopup("Success", "Airline Unblocked Successfully"), this.HideSpinner(), this.GetAllAirlines()}, res=> {this.DisplayModalPopup("Error", "An error occurred")});
}

RemoveAirline(airline:AirlineModel)
{
  this.ShowSpinner();
  this._airline.RemoveAirline(airline.airlineId).subscribe(res => {this.DisplayModalPopup("Success", "Airline Deleted Successfully"), this.HideSpinner(), this.GetAllAirlines()}, res=> {this.DisplayModalPopup("Error", "An error occurred")});
}
}
