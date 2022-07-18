import { Component, OnInit } from '@angular/core';
import { BlobService } from '../services/blob.service';
import { ManagebookingService } from '../services/managebooking.service';
import { BookingHistory } from './models/bookingHistoryModel';

@Component({
  selector: 'app-managebookings',
  templateUrl: './managebookings.component.html',
  styleUrls: ['../../styles.css']
})
export class ManagebookingsComponent implements OnInit {

  constructor(private _manageBooking:ManagebookingService, private _blob:BlobService) { }

  ngOnInit(): void {
  }

emailId:string="";
showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
bookingHistory:Array<BookingHistory> = new Array<BookingHistory>();
isShowNoResultFound:boolean=false;

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

GetBookingHistory()
{
  this.ShowSpinner(); 
  this._manageBooking.GetBookingHistory(this.emailId).subscribe(res => {this.HideSpinner(), this.BindBookingHistoryResult(res)},
  err => {this.HideSpinner(), this.DisplayModalPopup("Error", err.error)});
}

BindBookingHistoryResult(result:any)
{
  this.bookingHistory = result;
  this.isShowNoResultFound = this.bookingHistory.length == 0 ? true : false;
}

CancelBooking(pnrNumber:any)
{
  let isCancellationConfirmed = window.confirm("Are you sure that you want to cancel this ticket? Once cancelled the action cannot be reverted back.")
  
  if(isCancellationConfirmed)
  {
    this.ShowSpinner();
    this._manageBooking.CancelTicket(pnrNumber).subscribe(res => {this.HideSpinner(),this.DisplayModalPopup("Success","Ticket cancelled successfully"), this.GetBookingHistory()},
    err => {this.HideSpinner(), console.log(err)})
  }
}

GenerateBookingPdf(request:any)
{
  this.ShowSpinner();
  this._blob.GenerateBookingPdf(request).subscribe(res => {this.HideSpinner(), this.OpenPdf(res)},
  err => {this.HideSpinner(), this.DisplayModalPopup("Error", "An error occurred on generating the pdf document"), console.log(err)});
}

OpenPdf(response:any)
{
  window.open(response.url, '_blank');
}

}
