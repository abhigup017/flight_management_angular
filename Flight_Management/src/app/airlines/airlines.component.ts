import { Component, OnInit } from '@angular/core';
import { AddAirlineModel } from './airlineModels/AddAirlineModel';
import { HttpClient } from '@angular/common/http';
import { AirlineModel } from './airlineModels/airlineModel';
import { Router } from '@angular/router';
import { AirlineService } from '../services/airline.service';
import { BlobService } from '../services/blob.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['../../styles.css']
})
export class AirlinesComponent implements OnInit {

  constructor(private _airline:AirlineService, private _router:Router, private _blob:BlobService) 
  { 

  }

  ngOnInit(): void {
  }
showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
AddAirlineRequest:AddAirlineModel = new AddAirlineModel();
fileToUpload: File | null = null; 

ToggleDisplay(page:string)
{
  switch(page)
  {
      case 'ManageAirline':
        {
          this._router.navigate(['Airlines/manageairlines'])
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

AddAirline()
{
  if(this.AddAirlineRequest.airlineName == "")
  {
    this.DisplayModalPopup("Error","Please enter the Airline name");
    return;
  }
  if(this.AddAirlineRequest.airlineContact == "")
  {
    this.DisplayModalPopup("Error","Please enter the Airline contact");
    return;
  }
  if(this.AddAirlineRequest.airlineAddress == "")
  {
    this.DisplayModalPopup("Error","Please enter the Airline address");
    return;
  }
  if(this.fileToUpload == null || this.fileToUpload == undefined)
  {
    this.DisplayModalPopup("Error", "Please select a valid Airline logo")
    return;
  }
  this.ShowSpinner();
  let airlineAddRequest = {
    airlineName:this.AddAirlineRequest.airlineName,
    airlineLogo:this.AddAirlineRequest.airlineLogo,
    airlineContact:this.AddAirlineRequest.airlineContact,
    airlineDescription:this.AddAirlineRequest.airlineDescription,
    airlineAddress:this.AddAirlineRequest.airlineAddress
  }
  this._airline.AddAirline(airlineAddRequest).subscribe(res=> { this.DisplayModalPopup("Success", "Airline Added Successfully"), this.HideSpinner()},res=> { this.HideSpinner(), this.DisplayModalPopup("Error", "An Error occurred while adding the airline")});
  this.AddAirlineRequest = new AddAirlineModel();
}

ShowSpinner()
{
  this.showSpinner = true;
}

HideSpinner()
{
  this.showSpinner = false;
}

hasError(typeofvalidator:string,controlname:string):Boolean{
  return this.AddAirlineRequest.formAirlineAddGroup.controls[controlname].hasError(typeofvalidator);
}

HandleFileInput(target: any)
{
  this.fileToUpload = target.files.item(0);
  //Check if file is of image type
  let parts = this.fileToUpload?.name.split('.');
  let extension = parts?.[parts?.length - 1];

  switch(extension?.toLowerCase())
  {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'jpeg':
      case 'tif':
      {
        break;
      }
      default:
      {
        this.DisplayModalPopup("Error", "Please select a image file for the airline logo");
        this.fileToUpload = null;
        return;
      }
  }
  this.ShowSpinner();
  this._blob.UploadFile(this.fileToUpload!).subscribe(res => {this.HideSpinner(), this.BindResultToLogoPath(res)},
  err => {this.HideSpinner(), this.DisplayModalPopup("Error", "An error occurred while adding the image"), console.log(err)})
}

BindResultToLogoPath(result:any)
{
  this.AddAirlineRequest.airlineLogo = result.url;
}

}
